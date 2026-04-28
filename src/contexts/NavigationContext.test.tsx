import { act, render, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import {
  NavigationContext,
  NavigationProvider,
  useNavigation,
} from "@/contexts/NavigationContext";

describe("NavigationContext", () => {
  describe("NavigationProvider", () => {
    it('initialises page to "home"', () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <NavigationProvider>{children}</NavigationProvider>
        ),
      });

      expect(result.current.page).toBe("home");
    });

    it("setPage updates the current page", () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <NavigationProvider>{children}</NavigationProvider>
        ),
      });

      act(() => {
        result.current.setPage("compare");
      });

      expect(result.current.page).toBe("compare");
    });

    it("setPage to account updates the current page", () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <NavigationProvider>{children}</NavigationProvider>
        ),
      });

      act(() => {
        result.current.setPage("account");
      });

      expect(result.current.page).toBe("account");
    });

    it("provides page and setPage to consumers", () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <NavigationProvider>{children}</NavigationProvider>
        ),
      });

      expect(result.current).toHaveProperty("page");
      expect(result.current).toHaveProperty("setPage");
      expect(typeof result.current.setPage).toBe("function");
    });
  });

  describe("useNavigation", () => {
    it("throws when used outside NavigationProvider", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() =>
        render(
          <NavigationContext.Provider value={null}>
            <TestConsumer />
          </NavigationContext.Provider>,
        ),
      ).toThrow();

      consoleError.mockRestore();
    });
  });
});

function TestConsumer(): ReactNode {
  const { page } = useNavigation();
  return <div>{page}</div>;
}
