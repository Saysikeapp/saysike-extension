import { AMAZON_REGIONS, type AmazonRegion } from "@/lib/config/amazon";

const ASIN_PATTERN = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?]|$)/;

/**
 * Extracts the ASIN from an Amazon product URL.
 * Returns null if the URL does not contain a recognisable ASIN path.
 */
export function extractAsin(url: string): string | null {
  const match = ASIN_PATTERN.exec(url);
  return match?.[1] ?? null;
}

/**
 * Returns the matching live Amazon region for the given URL hostname,
 * or null if the URL is not on a supported (live) Amazon domain.
 */
export function getSupportedAmazonRegion(url: string): AmazonRegion | null {
  let hostname: string;
  try {
    hostname = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  return AMAZON_REGIONS.find((r) => r.live && r.domain === hostname) ?? null;
}

/**
 * Extracts a clean product name from an Amazon browser tab title.
 *
 * Handles both common formats:
 *   "Amazon.com: Product Name : Category"
 *   "Product Name : Amazon.co.uk: Category"
 */
export function extractProductNameFromTabTitle(title: string): string {
  let name = title.trim();
  // Strip a leading "Amazon.xxx: " or "Amazon.xxx : "
  name = name.replace(/^Amazon\.[a-z.]+\s*:\s*/i, "");
  // Strip a trailing " : Amazon.xxx..." suffix (UK-style titles)
  name = name.replace(/\s*:\s*Amazon\.[a-z.]+.*$/i, "");
  return name.trim();
}
