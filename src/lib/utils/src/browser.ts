// Supported browsers
export type Browser =
  | "Opera"
  | "Edge"
  | "Chrome"
  | "Brave"
  | "Safari"
  | "Firefox"
  | "unknown";

export const browserExtensionDownloadLinkMap: Record<Browser, string> = {
  Opera: `/download`,
  Edge: `/download`,
  Chrome: `https://chromewebstore.google.com/detail/pgokhihamcfcdlfamkdcjbfmipgaddlf`,
  Brave: `https://chromewebstore.google.com/detail/pgokhihamcfcdlfamkdcjbfmipgaddlf`,
  Safari: `/download`,
  Firefox: `/download`,
  unknown: `/download`,
};

/** Browsers that have a published extension listing. All others are coming soon. */
export const publishedBrowsers: ReadonlySet<Browser> = new Set<Browser>([
  "Chrome",
  "Brave",
]);

/** Resolves true if the current browser is Brave, false otherwise (never rejects). */
export const detectBraveClient = async (): Promise<boolean> => {
  try {
    const brave = (
      navigator as Navigator & { brave?: { isBrave: () => Promise<boolean> } }
    ).brave;
    return brave?.isBrave ? await brave.isBrave() : false;
  } catch {
    return false;
  }
};

export const getBrowserUserAgentClient = async (): Promise<Browser> => {
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

export const getBrowserFromUserAgentServer = (ua: string | null): Browser => {
  if (!ua) return "unknown";

  if (/OPR\//i.test(ua) || /Opera/i.test(ua)) return "Opera";

  if (/Edg\//i.test(ua)) return "Edge";

  if (/Firefox\//i.test(ua)) return "Firefox";

  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua) && !/Chromium\//i.test(ua))
    return "Safari";

  if (/Chrome\//i.test(ua) || /Chromium\//i.test(ua)) return "Chrome";

  return "unknown";
};
