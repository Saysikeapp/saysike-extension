"use client";

import { RefObject, useEffect } from "react";

export function useOutsideAlerter<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      const el = ref.current;
      if (!el) return;

      if (!el.contains(event.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutside]);
}
