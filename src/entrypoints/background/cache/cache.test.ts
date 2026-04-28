import { vi } from "vitest";
import { getOrCacheStoreDetails, clearCacheForTesting } from "./cache";
import { createMockStoreDetailsResponse } from "@/test/factories/storeDetails";

vi.mock("../events/getStoreDetailsEvent", () => ({
  getStoreDetailsEvent: vi.fn(),
}));
vi.mock("../utils/setIconBadge", () => ({
  setIconBadge: vi.fn(),
}));
vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return { ...actual, filterAndFormatDomain: vi.fn(() => "example.com") };
});

import { getStoreDetailsEvent } from "../events/getStoreDetailsEvent";
import { setIconBadge } from "../utils/setIconBadge";

const mockEvent = vi.mocked(getStoreDetailsEvent);
const mockBadge = vi.mocked(setIconBadge);

const ARGS = { url: "https://example.com", tabId: 1 };

describe("getOrCacheStoreDetails", () => {
  beforeEach(() => {
    clearCacheForTesting();
  });
  it("returns null for an empty domain", async () => {
    const { filterAndFormatDomain } = await import("@/lib/utils");
    vi.mocked(filterAndFormatDomain).mockReturnValueOnce("");

    const result = await getOrCacheStoreDetails(ARGS);
    expect(result).toBeNull();
    expect(mockEvent).not.toHaveBeenCalled();
  });

  it("fetches on a cache miss and caches the result", async () => {
    const mockResponse = createMockStoreDetailsResponse();
    mockEvent.mockResolvedValueOnce(mockResponse);

    const result = await getOrCacheStoreDetails(ARGS);

    expect(mockEvent).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  it("returns the cached result without fetching on a cache hit within TTL", async () => {
    const mockResponse = createMockStoreDetailsResponse();
    mockEvent.mockResolvedValueOnce(mockResponse);

    // First call — populates cache
    await getOrCacheStoreDetails(ARGS);
    vi.clearAllMocks();

    // Second call — should be served from cache
    const result = await getOrCacheStoreDetails(ARGS);

    expect(mockEvent).not.toHaveBeenCalled();
    expect(mockBadge).toHaveBeenCalledWith(mockResponse, 1);
    expect(result).toEqual(mockResponse);
  });

  it("re-fetches when the cache entry has expired", async () => {
    const mockResponse = createMockStoreDetailsResponse();
    mockEvent.mockResolvedValue(mockResponse);

    vi.useFakeTimers();
    try {
      const initialTime = new Date("2024-01-01T00:00:00.000Z");
      vi.setSystemTime(initialTime);

      // First call
      await getOrCacheStoreDetails(ARGS);
      vi.clearAllMocks();

      // Advance time beyond the 30-minute TTL
      vi.setSystemTime(new Date(initialTime.getTime() + 31 * 60 * 1000));

      await getOrCacheStoreDetails(ARGS);

      expect(mockEvent).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
