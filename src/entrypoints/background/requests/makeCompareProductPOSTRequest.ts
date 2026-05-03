import {
  CompareProductRequest,
  POSTCompareProductResponse,
} from "@/lib/schemas";
import { assertEnv } from "@/lib/utils";
import { httpRequest } from "@/lib/http";

export async function makeCompareProductPOSTRequest(
  body: CompareProductRequest,
): Promise<POSTCompareProductResponse> {
  const BASE_URL = assertEnv("WXT_BASE_SERVER_URI");
  return await httpRequest({
    url: `${BASE_URL}/v1/compare-product`,
    method: "POST",
    body,
    responseSchema: POSTCompareProductResponse,
  });
}
