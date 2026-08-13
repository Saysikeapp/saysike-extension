export enum BackgroundEventMethods {
  GET_STORE_DETAILS = "getStoreDetails",
  FIRE_COUPON_REFERRAL = "fireCouponReferral",
}

export type GetStoreDetailsData = {
  url: string;
  tabId: number;
};

export type FireCouponReferralData = {
  referralUrl: string;
  promotionId: number;
  merchantId: number | null;
};

export type BrowserMessageRequest =
  | {
      method: BackgroundEventMethods.GET_STORE_DETAILS;
      data: GetStoreDetailsData;
    }
  | {
      method: BackgroundEventMethods.FIRE_COUPON_REFERRAL;
      data: FireCouponReferralData;
    };

export const getActiveTabId = (): Promise<number | undefined> => {
  return new Promise((resolve) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]?.id);
    });
  });
};

/**
 * Only for use in Popup & Background scripts.
 *
 * In Content scripts, just use window.location
 */
export const getCurrentUrl = async (): Promise<string | undefined> => {
  // Popup & Background Scripts
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab?.url;
};

export function sendRuntimeMessage<T>(
  message: BrowserMessageRequest,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    browser.runtime.sendMessage(message, (res: T) => {
      const err = browser.runtime.lastError;
      if (err) return reject(new Error(err.message));
      resolve(res);
    });
  });
}
