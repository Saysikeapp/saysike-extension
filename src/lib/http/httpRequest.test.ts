import { z } from "zod";
import { httpRequest } from "./httpRequest";

const MOCK_URL = "https://api.example.com/data";

const fetchSpy = jest.spyOn(global, "fetch");

describe("httpRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  describe("HTTP methods", () => {
    it("can make a GET request", async () => {
      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
      });

      expect(response).toEqual({ ok: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        MOCK_URL,
        expect.objectContaining({
          method: "GET",
          body: undefined,
        }),
      );
    });

    it("can make a POST request with a body", async () => {
      const requestBody = { key: "value" };
      const response = await httpRequest({
        url: MOCK_URL,
        method: "POST",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        MOCK_URL,
        expect.objectContaining({
          method: "POST",
          body: `{"key":"value"}`,
        }),
      );
    });

    it("can make a PUT request with a body", async () => {
      const requestBody = { key: "value" };
      const response = await httpRequest({
        url: MOCK_URL,
        method: "PUT",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        MOCK_URL,
        expect.objectContaining({
          method: "PUT",
          body: `{"key":"value"}`,
        }),
      );
    });

    it("can make a DELETE request", async () => {
      const response = await httpRequest({
        url: MOCK_URL,
        method: "DELETE",
      });

      expect(response).toEqual({ ok: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        MOCK_URL,
        expect.objectContaining({
          method: "DELETE",
          body: undefined,
        }),
      );
    });

    it("can make a PATCH request with a body", async () => {
      const requestBody = { key: "value", hello: 123 };
      const response = await httpRequest({
        url: MOCK_URL,
        method: "PATCH",
        body: requestBody,
      });

      expect(response).toEqual({ ok: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        MOCK_URL,
        expect.objectContaining({
          method: "PATCH",
          body: `{"key":"value","hello":123}`,
        }),
      );
    });
  });

  describe("Search params", () => {
    it("transforms search parameters into query string", async () => {
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

      expect(fetchSpy).toHaveBeenCalledWith(
        `${MOCK_URL}?name=test&status=open&status=closed&page=2&active=true`,
        expect.objectContaining({
          method: "GET",
        }),
      );
    });
  });

  describe("Headers", () => {
    it("applies headers correctly", async () => {
      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        identityToken: "mock-identity-token",
      });

      const [, init] = fetchSpy.mock.calls[0]!;
      const headers = new Headers(init!.headers);

      expect(response).toEqual({ ok: true });

      expect(headers.get("Accept")).toBe("application/json");
      expect(headers.get("Content-Type")).toBe("application/json");
    });

    it("accepts an identity token and includes it in headers", async () => {
      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        identityToken: "mock-identity-token",
      });

      const [, init] = fetchSpy.mock.calls[0]!;
      const headers = new Headers(init!.headers);

      expect(response).toEqual({ ok: true });

      expect(headers.get("Authorization")).toBe("mock-identity-token");
    });
  });

  describe("Error handling", () => {
    it("throws an error for non-OK responses", async () => {
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify("Resource not found"), {
          status: 404,
          statusText: "Not Found",
        }),
      );

      await expect(
        httpRequest({
          url: MOCK_URL,
          method: "GET",
        }),
      ).rejects.toThrow(
        `Error: GET ${MOCK_URL} - 404 Not Found. Error message: "Resource not found"`,
      );
    });

    it("handles empty response bodies (i.e. HTTP status 204, 205)", async () => {
      // Without handling 204 and 205 responses, calling response.json() would throw an error
      fetchSpy.mockResolvedValueOnce(
        new Response(null, {
          status: 204,
          statusText: "No Content",
        }),
      );

      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
      });

      expect(response).toBeUndefined();
    });

    it("throws an error if response JSON is invalid", async () => {
      fetchSpy.mockResolvedValueOnce(
        new Response("plain text", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      await expect(
        httpRequest({
          url: MOCK_URL,
          method: "GET",
        }),
      ).rejects.toThrow(SyntaxError);
    });
  });

  describe("Response schema validation", () => {
    it("validates response against projestded schema and returns parsed data", async () => {
      const mockResponse = { id: 1, name: "Test Item" };

      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const response = await httpRequest({
        url: MOCK_URL,
        method: "GET",
        responseSchema: z.object({
          id: z.number(),
          name: z.string(),
        }),
      });

      expect(response).toEqual(mockResponse);
    });

    it("throws an error if response does not match the projestded schema", async () => {
      const invalidResponse = { id: "not-a-number", name: "Test Item" };

      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify(invalidResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      await expect(
        httpRequest({
          url: MOCK_URL,
          method: "GET",
          responseSchema: z.object({
            id: z.number(),
            name: z.string(),
          }),
        }),
      ).rejects.toThrow(
        `Failed to parse response from GET https://api.example.com/data: [
  {
    "expected": "number",
    "code": "invalid_type",
    "path": [
      "id"
    ],
    "message": "Invalid input: expected number, received string"
  }
]`,
      );
    });
  });
});
