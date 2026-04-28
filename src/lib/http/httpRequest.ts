import { z } from "zod";
import { SearchParams, buildUrl } from "./utils/buildUrl";

export interface HttpRequestParams<TRequest, TResponse, TSearchParams> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TRequest;
  searchParams?: TSearchParams;
  identityToken?: string;
  responseSchema?: z.ZodType<TResponse>;
}

/**
 * Basic fetch wrapper for making HTTP requests with built-in support for:
 * - JSON request bodies
 * - Search params
 * - Identity tokens in the Authorization header
 * - Response validation with Zod schemas
 *
 * @param params - The parameters for the HTTP request
 * @returns The parsed response from the server, validated against the provided Zod schema if given
 * @throws Will throw an error if the response status is not ok, or if response validation fails
 */
export async function httpRequest<
  TResponse,
  TRequest = undefined,
  TSearchParams extends SearchParams | undefined = undefined,
>(
  params: HttpRequestParams<TRequest, TResponse, TSearchParams>,
): Promise<TResponse> {
  const { url, method, identityToken, body, searchParams, responseSchema } =
    params;

  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  if (identityToken) headers.set("Authorization", identityToken);

  const builtUrl = buildUrl<TSearchParams>(url, searchParams);

  const response = await fetch(builtUrl.href, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const errorMessage = `Error: ${method} ${builtUrl.toString()} - ${response.status} ${response.statusText}. Error message: ${errorText}`;

    throw new Error(errorMessage);
  }

  if (response.status === 204 || response.status === 205) {
    // Response body cannot be parsed as JSON if no content
    return undefined as TResponse;
  }

  if (responseSchema) {
    const parsedJSONData: unknown = await response.json();
    const schemaParseResult = responseSchema.safeParse(parsedJSONData);

    if (!schemaParseResult.success) {
      const errorMessage = `Failed to parse response from ${method} ${builtUrl.toString()}: ${schemaParseResult.error.message}`;
      throw new Error(errorMessage);
    }

    return schemaParseResult.data;
  } else {
    return response.json() as Promise<TResponse>;
  }
}
