import { useNonNullableContext } from "@saysike/ui";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

type TThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** The resolved theme after applying system preference */
  resolvedTheme: "light" | "dark";
};

const STORAGE_KEY = "saysike-theme";
const VALID_THEMES: Theme[] = ["light", "dark", "system"];

function isValidTheme(value: unknown): value is Theme {
  return VALID_THEMES.includes(value as Theme);
}

export const ThemeContext = createContext<TThemeContext | null>(null);

export const useTheme = (): TThemeContext => {
  return useNonNullableContext(ThemeContext);
};

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

export const ThemeProvider = (props: PropsWithChildren): ReactNode => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidTheme(stored) ? stored : "system";
  });

  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  // Apply/remove .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (): void => {
      const root = document.documentElement;
      if (mql.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mql.addEventListener("change", handler);
    return (): void => mql.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
