import {
  BackgroundEventMethods,
  BrowserMessageRequest,
} from "@/lib/utils/browserAPI";
import { getOrCacheStoreDetails } from "./cache/cache";
import {
  closeReferralTab,
  fireCouponReferral,
  isPendingReferralTab,
} from "./referral/referral";

export default defineBackground(() => {
  console.log("Saysike Background is running...");

  // Install/update listener
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason !== "install") return;

    // Open the onboarding page on fresh install
    void browser.tabs.create({
      url: browser.runtime.getURL("/onboarding.html"),
      active: true,
    });
  });

  // Load store details when a tab is updated (e.g., URL change)
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only trigger when the URL has changed and is fully loaded
    const { url } = tab;
    if (changeInfo.status !== "complete" || !url) return;

    void (async (): Promise<void> => {
      // Inactive tabs opened to record affiliate referrals get closed here
      // once their redirect chain settles, rather than treated as a
      // normal page visit.
      if (await isPendingReferralTab(tabId)) {
        await closeReferralTab(tabId);
        return;
      }

      await getOrCacheStoreDetails({ url, tabId });
    })();
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

      case BackgroundEventMethods.FIRE_COUPON_REFERRAL:
        fireCouponReferral(req.data)
          .then(() => {
            sendResponse({ result: null });
            return true;
          })
          .catch((err) => {
            sendResponse({ result: null });
            console.error("Error firing coupon referral:", err);
            return true;
          });

        return true;

      default:
        throw new Error(
          `Unknown Method: ${(req as BrowserMessageRequest).method as string}`,
        );
    }
  });
});
