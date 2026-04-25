"use client";

import React from "react";
import { cn } from "../../utils/classnames";

export type Theme = "light" | "dark" | "system";

export interface ThemeToggleProps {
  /** The current active theme */
  theme: Theme;
  /** Callback when the user selects a new theme */
  setTheme: (theme: Theme) => void;
  /** Additional class names */
  className?: string;
}

const ThemeIcon = ({
  type,
}: {
  type: "light" | "dark" | "system";
}): React.ReactElement => {
  if (type === "light") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    );
  }

  if (type === "dark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    );
  }

  // System icon (monitor)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
};

const themes: Theme[] = ["light", "dark", "system"];

/**
 * A three-way theme toggle (light / dark / system).
 * Framework-agnostic — pass `theme` and `setTheme` from whatever provider you use.
 */
export const ThemeToggle = ({
  theme,
  setTheme,
  className,
}: ThemeToggleProps): React.ReactElement => {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface-secondary p-1",
        className,
      )}
    >
      {themes.map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={theme === t}
          onClick={() => setTheme(t)}
          aria-label={`Switch to ${t} theme`}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1.5 text-text-secondary transition-colors",
            "hover:text-text-primary",
            theme === t && "bg-surface-elevated text-text-primary shadow-sm",
          )}
        >
          <ThemeIcon type={t} />
        </button>
      ))}
    </div>
  );
};
