import {
  GETStoreDetailsResponse,
  POSTCompareProductResponse,
} from "@/lib/schemas";
import { filterAndFormatDomain } from "@/lib/utils";
import { getProductComparisonEvent } from "../events/getProductComparisonEvent";
import { getStoreDetailsEvent } from "../events/getStoreDetailsEvent";
import { setIconBadge } from "../utils/setIconBadge";

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

type CacheEntry = {
  data: GETStoreDetailsResponse | null;
  timestamp: number;
};

type AsinCacheEntry = {
  data: POSTCompareProductResponse | null;
  timestamp: number;
};

const storeCache: Record<string, CacheEntry> = {};
const asinCache: Record<string, AsinCacheEntry> = {};

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

/** For use in tests only — resets the in-memory store cache. */
export function clearCacheForTesting(): void {
  for (const key of Object.keys(storeCache)) {
    delete storeCache[key];
  }
}

export const getOrCacheProductComparison = ({
  asin,
  url,
  name,
}: {
  asin: string;
  url: string;
  name: string;
}): Promise<POSTCompareProductResponse | null> => {
  const now = Date.now();
  const cached = asinCache[asin];

  // (Disable cache on dev)
  if (
    cached &&
    now - cached.timestamp < CACHE_TTL_MS &&
    process.env.NODE_ENV !== "development"
  ) {
    return Promise.resolve(cached.data);
  }

  return getProductComparisonEvent({ url, asin, name }).then((data) => {
    asinCache[asin] = { data, timestamp: now };
    return data;
  });
};

/** For use in tests only — resets the in-memory ASIN cache. */
export function clearAsinCacheForTesting(): void {
  for (const key of Object.keys(asinCache)) {
    delete asinCache[key];
  }
}
