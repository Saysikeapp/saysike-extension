import { GETStoreDetailsResponse } from "@saysike/schemas";

export const setIconBadge = (
  result: GETStoreDetailsResponse,
  tabId: number,
): void => {
  // Code or deals = number displayed
  if (result.codes?.length || result.deals?.length) {
    void chrome.action.setBadgeBackgroundColor({
      color: "#6a0dad",
      tabId,
    });

    void chrome.action.setBadgeText({
      text: (result.codes.length + result.deals.length).toString(),
      tabId,
    });
  }

  // If still store, highlight to consumer
  else if (result.store) {
    void chrome.action.setBadgeBackgroundColor({
      color: "#6a0dad",
      tabId,
    });

    void chrome.action.setBadgeText({
      text: "!",
      tabId,
    });
  }
};
