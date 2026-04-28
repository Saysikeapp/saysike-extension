import { assertNonNullable } from "./assert";

describe("assertNonNullable", () => {
  it("returns the value when it is not null or undefined", () => {
    expect(assertNonNullable("hello")).toBe("hello");
    expect(assertNonNullable(0)).toBe(0);
    expect(assertNonNullable(false)).toBe(false);
    expect(assertNonNullable({ key: "value" })).toEqual({ key: "value" });
  });

  it("throws with a custom message when value is null", () => {
    expect(() => assertNonNullable(null, "custom error")).toThrow(
      "custom error",
    );
  });

  it("throws with a custom message when value is undefined", () => {
    expect(() => assertNonNullable(undefined, "custom error")).toThrow(
      "custom error",
    );
  });

  it("throws with the default message when no custom message is provided", () => {
    expect(() => assertNonNullable(null)).toThrow("Assertion failed");
  });

  it("narrows the return type to NonNullable<T>", () => {
    const value: string | null = "test";
    const result = assertNonNullable(value);
    // TypeScript would error here if result were still string | null
    expect(result.toUpperCase()).toBe("TEST");
  });
});
