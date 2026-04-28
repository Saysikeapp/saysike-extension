import { render, renderHook } from "@testing-library/react";
import { createContext, ReactNode } from "react";
import { useNonNullableContext } from "./useNonNullableContext";

const TestContext = createContext<{ value: string } | null>(null);
TestContext.displayName = "TestContext";

describe("useNonNullableContext", () => {
  it("returns the context value when a provider is present", () => {
    const { result } = renderHook(() => useNonNullableContext(TestContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <TestContext.Provider value={{ value: "hello" }}>
          {children}
        </TestContext.Provider>
      ),
    });
    expect(result.current).toEqual({ value: "hello" });
  });

  it("throws when no provider wraps the consumer", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(
        <TestContext.Provider value={null}>
          <ThrowingConsumer />
        </TestContext.Provider>,
      ),
    ).toThrow();

    consoleError.mockRestore();
  });
});

function ThrowingConsumer(): ReactNode {
  const ctx = useNonNullableContext(TestContext);
  return <div>{ctx.value}</div>;
}
