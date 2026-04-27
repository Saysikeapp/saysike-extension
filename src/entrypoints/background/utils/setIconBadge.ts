import { GETStoreDetailsResponse } from "@/lib/schemas";

export const setIconBadge = (
  result: GETStoreDetailsResponse,
  tabId: number,
): void => {
  // Code or deals = number displayed
  if (result.codes?.length || result.deals?.length) {
    void browser.action.setBadgeBackgroundColor({
      color: "#6a0dad",
      tabId,
    });

    void browser.action.setBadgeText({
      text: (result.codes.length + result.deals.length).toString(),
      tabId,
    });
  }

  // If still store, highlight to user
  else if (result.store) {
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
