import { GETStoreDetailsResponse } from "@/lib/schemas";

export const setIconBadge = (
  result: GETStoreDetailsResponse,
  tabId: number,
): void => {
  const allCodes = result.merchants.flatMap((m) => m.codes);
  const allDeals = result.merchants.flatMap((m) => m.deals);

  // Code or deals = number displayed
  if (allCodes.length || allDeals.length) {
    void browser.action.setBadgeBackgroundColor({
      color: "#6a0dad",
      tabId,
    });

    void browser.action.setBadgeText({
      text: (allCodes.length + allDeals.length).toString(),
      tabId,
    });
  }

  // If merchant matched but no promotions, highlight to user
  else if (result.merchants.length > 0) {
    void browser.action.setBadgeBackgroundColor({
      color: "#6a0dad",
      tabId,
    });

    void browser.action.setBadgeText({
      text: "!",
      tabId,
    });
  }
};
