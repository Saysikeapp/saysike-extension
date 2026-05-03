export enum BackgroundEventMethods {
  GET_STORE_DETAILS = "getStoreDetails",
  GET_PRODUCT_COMPARISON = "getProductComparison",
}

export type BrowserMessageRequest =
  | {
      method: BackgroundEventMethods.GET_STORE_DETAILS;
      data: {
        url: string;
        tabId: number;
      };
    }
  | {
      method: BackgroundEventMethods.GET_PRODUCT_COMPARISON;
      data: {
        url: string;
        asin: string;
        name: string;
      };
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
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab?.url;
};

/**
 * Returns the active tab's URL and title.
 * Only for use in Popup & Background scripts.
 */
export const getCurrentTab = async (): Promise<
  { url?: string; title?: string } | undefined
> => {
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab ? { url: tab.url, title: tab.title } : undefined;
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
