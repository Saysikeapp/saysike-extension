import {
  BackgroundEventMethods,
  BrowserMessageRequest,
} from "@/lib/utils/browserAPI";
import { getOrCacheStoreDetails } from "./cache/cache";
import {
  closeReferralTab,
  fireCouponReferral,
  forgetPendingReferralTab,
  isPendingReferralTab,
} from "./referral/referral";

/** Runs an async message handler and reports its outcome through
 * sendResponse, matching the { result } shape every case here uses. */
function respondAsync<T>(
  promise: Promise<T>,
  sendResponse: (response: { result: T | null }) => void,
  errorMessage: string,
): void {
  promise
    .then((result) => sendResponse({ result }))
    .catch((err: unknown) => {
      sendResponse({ result: null });
      console.error(errorMessage, err);
    });
}

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
      try {
        // Inactive tabs opened to record affiliate referrals get closed
        // here once their redirect chain settles, rather than treated as
        // a normal page visit.
        if (await isPendingReferralTab(tabId)) {
          await closeReferralTab(tabId);
          return;
        }

        await getOrCacheStoreDetails({ url, tabId });
      } catch (err) {
        console.error("Error handling tab update:", err);
      }
    })();
  });

  // Reconciles referral pending-tab bookkeeping however the tab actually
  // closed — whether we closed it, the redirect closed it, or the user did.
  browser.tabs.onRemoved.addListener((tabId) => {
    forgetPendingReferralTab(tabId).catch((err: unknown) => {
      console.error("Error reconciling referral tab state:", err);
    });
  });

  // Chrome runtimes are weird and don't like async/await, and need to return true if Promise.
  // I hate this.
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const req = message as unknown as BrowserMessageRequest;
    switch (req.method) {
      case BackgroundEventMethods.GET_STORE_DETAILS:
        respondAsync(
          getOrCacheStoreDetails(req.data),
          sendResponse,
          "Error fetching store details:",
        );

        // MANDATORY: Indicates async response, which Chrome API requires. This keeps the line open.
        return true;

      case BackgroundEventMethods.FIRE_COUPON_REFERRAL:
        respondAsync(
          fireCouponReferral(req.data).then(() => null),
          sendResponse,
          "Error firing coupon referral:",
        );

        return true;

      default:
        throw new Error(
          `Unknown Method: ${(req as BrowserMessageRequest).method as string}`,
        );
    }
  });
});
