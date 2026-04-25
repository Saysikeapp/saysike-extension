import { extendTailwindMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const tailwindTokens = {
  fontSizeKeys: ["2xs"] as const,
  letterSpacingKeys: ["l", "xl", "2xl"] as const,
} as const;

// If tailwind config vars change, update here too
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...tailwindTokens.fontSizeKeys] }],
      tracking: [{ tracking: [...tailwindTokens.letterSpacingKeys] }],
    },
  },
});

export const cn = (...args: ClassValue[]): string => {
  return customTwMerge(clsx(args));
};
