import { env, assertEnv } from "./env";

describe("env", () => {
  it("returns the value when the variable is set", () => {
    expect(env("WXT_BASE_CLIENT_URI")).toBe("http://localhost:3000");
  });

  it("returns undefined when the variable is not set", () => {
    // Cast to any to test a key that isn't in the type but may be absent at runtime
    expect(env("WXT_UNKNOWN_VAR" as never)).toBeUndefined();
  });
});

describe("assertEnv", () => {
  it("returns the value when the variable is set", () => {
    expect(assertEnv("WXT_BASE_SERVER_URI")).toBe("http://localhost:3000/api");
  });

  it("throws with an informative message when the variable is missing", () => {
    expect(() => assertEnv("WXT_UNKNOWN_VAR" as never)).toThrow(
      "[assertEnv] WXT_UNKNOWN_VAR environment variable was not found or is empty.",
    );
  });
});
