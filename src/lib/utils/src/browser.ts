// Supported browsers
export type KnownBrowsers =
  | "Opera"
  | "Edge"
  | "Chrome"
  | "Brave"
  | "Safari"
  | "Firefox"
  | "unknown";

/** Browsers that have a published extension listing. All others are coming soon. */
export const publishedBrowsers: ReadonlySet<KnownBrowsers> =
  new Set<KnownBrowsers>(["Chrome", "Brave"]);

export const detectBraveClient = async (): Promise<boolean> => {
  try {
    const { brave } = navigator as Navigator & {
      brave?: { isBrave: () => Promise<boolean> };
    };
    return brave?.isBrave ? await brave.isBrave() : false;
  } catch {
    return false;
  }
};

export const getBrowserUserAgentClient = async (): Promise<KnownBrowsers> => {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  )
    return "Opera";

  if (navigator.userAgent.indexOf("Edg") != -1) return "Edge";

  if (navigator.userAgent.indexOf("Firefox") != -1) return "Firefox";

  if (
    navigator.userAgent.indexOf("Safari") != -1 &&
    navigator.userAgent.indexOf("Chrome") === -1
  )
    return "Safari";

  // Brave has the same UA as Chrome — use the brave-specific API instead
  if (await detectBraveClient()) return "Brave";

  if (navigator.userAgent.indexOf("Chrome") != -1) return "Chrome";

  return "unknown";
};
