import { cn } from "./classnames";

describe("cn", () => {
  it("joins two class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("deduplicates conflicting Tailwind utilities (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("strips falsy values from conditional classes", () => {
    const condition = false;
    expect(cn("a", condition && "b", null, undefined)).toBe("a");
  });

  it("handles object syntax — includes truthy keys, excludes falsy keys", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe(
      "text-red-500",
    );
  });

  it("handles array input", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });

  it("deduplicates custom font-size token group (text-2xs vs text-sm)", () => {
    expect(cn("text-2xs", "text-sm")).toBe("text-sm");
  });

  it("deduplicates custom tracking token group (tracking-l vs tracking-xl)", () => {
    expect(cn("tracking-l", "tracking-xl")).toBe("tracking-xl");
  });
});
