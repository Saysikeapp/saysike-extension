import {
  BackgroundEventMethods,
  BrowserMessageRequest,
} from "@/lib/utils/browerAPI";
import { getOrCacheStoreDetails } from "./cache/cache";

export default defineBackground(() => {
  console.log("Saysike Background is running...");

  // Load store details when a tab is updated (e.g., URL change)
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only trigger when the URL has changed and is fully loaded
    if (changeInfo.status !== "complete" || !tab.url) return;

    void getOrCacheStoreDetails({ url: tab.url, tabId });
  });

  // Chrome runtimes are weird and don't like async/await, and need to return true if Promise.
  // I hate this.
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const req = message as unknown as BrowserMessageRequest;
    switch (req.method) {
      case BackgroundEventMethods.GET_STORE_DETAILS:
        getOrCacheStoreDetails(req.data)
          .then((result) => {
            sendResponse({ result });
            return true;
          })
          .catch((err) => {
            sendResponse({ result: null });
            console.error("Error fetching store details:", err);
            return true;
          });

        // MANDATORY: Indicates async response, which Chrome API requires. This keeps the line open.
        return true;

      default:
        throw new Error(`Unknown Method: ${req.method as string}`);
    }
  });
});
