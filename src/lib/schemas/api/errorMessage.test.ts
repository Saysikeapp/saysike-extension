import { ErrorMessageResponseSchema } from "./errorMessage";

describe("ErrorMessageResponseSchema", () => {
  it("parses a valid error message object", () => {
    const result = ErrorMessageResponseSchema.safeParse({ error: "Not found" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.error).toBe("Not found");
  });

  it("fails when the error field is missing", () => {
    const result = ErrorMessageResponseSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("fails when the error field is not a string", () => {
    const result = ErrorMessageResponseSchema.safeParse({ error: 404 });
    expect(result.success).toBe(false);
  });
});
