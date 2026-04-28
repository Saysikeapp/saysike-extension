import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

const STORAGE_KEY = "saysike-theme";

function wrapper({ children }: { children: ReactNode }): ReactNode {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  describe("ThemeProvider", () => {
    it('defaults to "system" when localStorage has no entry', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe("system");
    });

    it("reads a valid stored theme from localStorage", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe("dark");
    });

    it("reads light theme from localStorage", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe("light");
    });

    it('falls back to "system" when localStorage has an invalid value', () => {
      localStorage.setItem(STORAGE_KEY, "invalid-theme");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe("system");
    });
  });

  describe("setTheme", () => {
    it("updates theme state", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(result.current.theme).toBe("dark");
    });

    it("persists theme to localStorage", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("light");
      });

      expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
    });

    it("setting dark theme adds .dark class to <html>", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("setting light theme removes .dark class from <html>", () => {
      document.documentElement.classList.add("dark");
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("light");
      });

      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("resolvedTheme", () => {
    it('resolves to "light" when theme is "light"', () => {
      localStorage.setItem(STORAGE_KEY, "light");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.resolvedTheme).toBe("light");
    });

    it('resolves to "dark" when theme is "dark"', () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.resolvedTheme).toBe("dark");
    });

    it('resolves to "light" when theme is "system" and matchMedia does not match dark', () => {
      // setup.ts stubs matchMedia with matches: false
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.resolvedTheme).toBe("light");
    });

    it('resolves to "dark" when theme is "system" and matchMedia matches dark', () => {
      vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
        matches: query.includes("dark"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.resolvedTheme).toBe("dark");
    });
  });

  describe("system preference change listener", () => {
    it("registers a change listener when theme is system", () => {
      const addEventListenerSpy = vi.fn();
      vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme(), { wrapper });

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });

    it("does not register a change listener when theme is not system", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const addEventListenerSpy = vi.fn();
      vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      renderHook(() => useTheme(), { wrapper });

      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });
  });
});
