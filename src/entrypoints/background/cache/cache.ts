import { GETStoreDetailsResponse } from "@saysike/schemas";
import { filterAndFormatDomain } from "@saysike/utils";
import { getStoreDetailsEvent } from "../events/getStoreDetailsEvent";
import { setIconBadge } from "../utils/setIconBadge";

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

type CacheEntry = {
  data: GETStoreDetailsResponse | null;
  timestamp: number;
};

const storeCache: Record<string, CacheEntry> = {};

export const getOrCacheStoreDetails = async ({
  url,
  tabId,
}: {
  url: string;
  tabId: number;
}): Promise<GETStoreDetailsResponse | null> => {
  const domain = filterAndFormatDomain(url);
  const now = Date.now();

  if (!domain) {
    return null;
  }

  // Check cache and TTL
  const cached = storeCache[domain];

  // (Disable cache on dev)
  if (
    cached &&
    now - cached.timestamp < CACHE_TTL_MS &&
    process.env.NODE_ENV !== "development"
  ) {
    if (cached.data) {
      setIconBadge(cached.data, tabId);
    }
    return cached.data;
  }

  // Not cached or expired, fetch and cache
  const data = await getStoreDetailsEvent({ url, tabId });
  storeCache[domain] = { data, timestamp: now };

  if (data) {
    setIconBadge(data, tabId);
  }

  return data;
};
