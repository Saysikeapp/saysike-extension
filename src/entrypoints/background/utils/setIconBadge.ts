import { GETStoreDetailsResponse } from "@/lib/schemas";

const setBadge = (text: string, tabId: number): void => {
  browser.action
    .setBadgeBackgroundColor({ color: "#6a0dad", tabId })
    .catch((err: unknown) => {
      console.error("Failed to set badge background color:", err);
    });

  browser.action.setBadgeText({ text, tabId }).catch((err: unknown) => {
    console.error("Failed to set badge text:", err);
  });
};

export const setIconBadge = (
  result: GETStoreDetailsResponse,
  tabId: number,
): void => {
  const allCodes = result.merchants.flatMap((m) => m.codes);
  const allDeals = result.merchants.flatMap((m) => m.deals);

  // Code or deals = number displayed
  if (allCodes.length || allDeals.length) {
    setBadge((allCodes.length + allDeals.length).toString(), tabId);
  }

  // If merchant matched but no promotions, highlight to user
  else if (result.merchants.length > 0) {
    setBadge("!", tabId);
  }
};
