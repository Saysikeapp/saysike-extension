import { vi } from "vitest";
import { getStoreDetailsEvent } from "./getStoreDetailsEvent";
import { createMockStoreDetailsResponse } from "@/test/factories/storeDetails";

vi.mock("../requests/makeAIStoreDetailsGETRequest", () => ({
  makeAIStoreDetailsGETRequest: vi.fn(),
}));
vi.mock("../utils/setIconBadge", () => ({
  setIconBadge: vi.fn(),
}));
vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return { ...actual, filterAndFormatDomain: vi.fn(() => "example.com") };
});

import { makeAIStoreDetailsGETRequest } from "../requests/makeAIStoreDetailsGETRequest";
import { setIconBadge } from "../utils/setIconBadge";
import { filterAndFormatDomain } from "@/lib/utils";

const mockRequest = vi.mocked(makeAIStoreDetailsGETRequest);
const mockBadge = vi.mocked(setIconBadge);
const mockDomain = vi.mocked(filterAndFormatDomain);

describe("getStoreDetailsEvent", () => {
  const data = { url: "https://example.com", tabId: 1 };

  it("returns null for non-http/https protocols", async () => {
    const result = await getStoreDetailsEvent({
      url: "chrome-extension://abc/popup.html",
      tabId: 1,
    });
    expect(result).toBeNull();
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it("fetches store details and returns the result", async () => {
    const mockResponse = createMockStoreDetailsResponse();
    mockRequest.mockResolvedValueOnce(mockResponse);

    const result = await getStoreDetailsEvent(data);

    expect(mockDomain).toHaveBeenCalledWith("https://example.com");
    expect(mockRequest).toHaveBeenCalledWith("example.com");
    expect(mockBadge).toHaveBeenCalledWith(mockResponse, 1);
    expect(result).toEqual(mockResponse);
  });

  it("propagates errors thrown by makeAIStoreDetailsGETRequest", async () => {
    mockRequest.mockRejectedValueOnce(new Error("Network error"));

    await expect(getStoreDetailsEvent(data)).rejects.toThrow("Network error");
  });
});
