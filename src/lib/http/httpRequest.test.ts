import { z } from "zod";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { httpRequest } from "./httpRequest";

const MOCK_URL = "https://api.example.com/data";

/** Helper: register a one-off handler that returns `{ ok: true }` for any method. */
function useOkHandler(method: "get" | "post" | "put" | "delete" | "patch") {
  let captured: Request;
  server.use(
    http[method](MOCK_URL, ({ request }) => {
      captured = request;
      return HttpResponse.json({ ok: true });
    }),
  );
  return { getCapture: () => captured };
}

describe("httpRequest", () => {
  describe("HTTP methods", () => {
    it("can make a GET request", async () => {
      const { getCapture } = useOkHandler("get");

      const response = await httpRequest({ url: MOCK_URL, method: "GET" });

      expect(response).toEqual({ ok: true });
      expect(getCapture().method).toBe("GET");
    });

    it("can make a POST request with a body", async () => {
      const { getCapture } = useOkHandler("post");
      const requestBody = { key: "value" };

      const response = await httpRequest({
        url: MOCK_URL,
        method: "POST",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });
      expect(getCapture().method).toBe("POST");
      expect(await getCapture().json()).toEqual(requestBody);
    });

    it("can make a PUT request with a body", async () => {
      const { getCapture } = useOkHandler("put");
      const requestBody = { key: "value" };

      const response = await httpRequest({
        url: MOCK_URL,
        method: "PUT",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });
      expect(getCapture().method).toBe("PUT");
      expect(await getCapture().json()).toEqual(requestBody);
    });

    it("can make a DELETE request", async () => {
      const { getCapture } = useOkHandler("delete");

      const response = await httpRequest({ url: MOCK_URL, method: "DELETE" });

      expect(response).toEqual({ ok: true });
      expect(getCapture().method).toBe("DELETE");
    });

    it("can make a PATCH request with a body", async () => {
      const { getCapture } = useOkHandler("patch");
      const requestBody = { key: "value", hello: 123 };

      const response = await httpRequest({
        url: MOCK_URL,
        method: "PATCH",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });
      expect(getCapture().method).toBe("PATCH");
      expect(await getCapture().json()).toEqual(requestBody);
    });
  });

  describe("Search params", () => {
    it("transforms search parameters into query string", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${MOCK_URL}*`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json({ ok: true });
        }),
      );

      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        searchParams: {
          name: "test",
          status: ["open", "closed"],
          page: 2,
          active: true,
        },
      });

      expect(response).toEqual({ ok: true });
      const url = new URL(capturedUrl);
      expect(url.searchParams.get("name")).toBe("test");
      expect(url.searchParams.getAll("status")).toEqual(["open", "closed"]);
      expect(url.searchParams.get("page")).toBe("2");
      expect(url.searchParams.get("active")).toBe("true");
    });
  });

  describe("Headers", () => {
    it("applies default headers correctly", async () => {
      let capturedHeaders: Headers | undefined;
      server.use(
        http.get(MOCK_URL, ({ request }) => {
          capturedHeaders = new Headers(request.headers);
          return HttpResponse.json({ ok: true });
        }),
      );

      const response = await httpRequest({ url: MOCK_URL, method: "GET" });

      expect(response).toEqual({ ok: true });
      expect(capturedHeaders?.get("accept")).toBe("application/json");
      expect(capturedHeaders?.get("content-type")).toBe("application/json");
    });

    it("accepts an identity token and includes it in headers", async () => {
      let capturedHeaders: Headers | undefined;
      server.use(
        http.get(MOCK_URL, ({ request }) => {
          capturedHeaders = new Headers(request.headers);
          return HttpResponse.json({ ok: true });
        }),
      );

      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        identityToken: "mock-identity-token",
      });

      expect(response).toEqual({ ok: true });
      expect(capturedHeaders?.get("authorization")).toBe("mock-identity-token");
    });
  });

  describe("Error handling", () => {
    it("throws an error for non-OK responses", async () => {
      server.use(
        http.get(MOCK_URL, () =>
          HttpResponse.json("Resource not found", {
            status: 404,
            statusText: "Not Found",
          }),
        ),
      );

      await expect(
        httpRequest({ url: MOCK_URL, method: "GET" }),
      ).rejects.toThrow(
        `Error: GET ${MOCK_URL} - 404 Not Found. Error message: "Resource not found"`,
      );
    });

    it("handles empty response bodies (i.e. HTTP status 204, 205)", async () => {
      server.use(
        http.get(MOCK_URL, () => new HttpResponse(null, { status: 204 })),
      );

      const response = await httpRequest({ url: MOCK_URL, method: "GET" });

      expect(response).toBeUndefined();
    });

    it("throws an error if response JSON is invalid", async () => {
      server.use(
        http.get(
          MOCK_URL,
          () =>
            new HttpResponse("plain text", {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
        ),
      );

      await expect(
        httpRequest({ url: MOCK_URL, method: "GET" }),
      ).rejects.toThrow(SyntaxError);
    });
  });

  describe("Response schema validation", () => {
    it("validates response against provided schema and returns parsed data", async () => {
      const mockResponse = { id: 1, name: "Test Item" };
      server.use(http.get(MOCK_URL, () => HttpResponse.json(mockResponse)));

      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        responseSchema: z.object({ id: z.number(), name: z.string() }),
      });

      expect(response).toEqual(mockResponse);
    });

    it("throws an error if response does not match the provided schema", async () => {
      server.use(
        http.get(MOCK_URL, () =>
          HttpResponse.json({ id: "not-a-number", name: "Test Item" }),
        ),
      );

      await expect(
        httpRequest({
          url: MOCK_URL,
          method: "GET",
          responseSchema: z.object({ id: z.number(), name: z.string() }),
        }),
      ).rejects.toThrow(
        `Failed to parse response from GET https://api.example.com/data:`,
      );
    });
  });
});
