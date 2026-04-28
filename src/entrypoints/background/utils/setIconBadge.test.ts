import { browserMock } from "@/test/mocks/browser";
import { setIconBadge } from "./setIconBadge";
import {
  createMockStoreDetailsResponse,
  createEmptyStoreDetailsResponse,
} from "@/test/factories/storeDetails";

const TAB_ID = 1;

describe("setIconBadge", () => {
  it("sets badge with the total code + deal count when both exist", () => {
    const data = createMockStoreDetailsResponse({
      codes: [{ ...createMockStoreDetailsResponse().codes[0] }],
      deals: [
        {
          ...createMockStoreDetailsResponse().deals[0],
          promotion_id: 99,
        },
      ],
    });

    setIconBadge(data, TAB_ID);

    expect(browserMock.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: "#6a0dad",
      tabId: TAB_ID,
    });
    expect(browserMock.action.setBadgeText).toHaveBeenCalledWith({
      text: "2",
      tabId: TAB_ID,
    });
  });

  it("sets badge text to '!' when store exists but no codes or deals", () => {
    const data = createMockStoreDetailsResponse({ codes: [], deals: [] });

    setIconBadge(data, TAB_ID);

    expect(browserMock.action.setBadgeText).toHaveBeenCalledWith({
      text: "!",
      tabId: TAB_ID,
    });
  });

  it("does not set any badge when store is null and no promotions", () => {
    const data = createEmptyStoreDetailsResponse();

    setIconBadge(data, TAB_ID);

    expect(browserMock.action.setBadgeText).not.toHaveBeenCalled();
    expect(browserMock.action.setBadgeBackgroundColor).not.toHaveBeenCalled();
  });
});
