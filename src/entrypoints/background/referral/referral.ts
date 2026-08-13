const ATTRIBUTED_KEYS_KEY = "attributedKeys";
const PENDING_REFERRAL_TAB_IDS_KEY = "pendingReferralTabIds";
const REFERRAL_TAB_TIMEOUT_MS = 6000;

/**
 * Affiliate cookies are set per merchant, not per coupon — so dedupe on
 * merchantId where we have one (the normal case) rather than promotionId,
 * otherwise trying several codes for the same store would still fire a
 * tab per code. Falls back to promotionId only if no merchant context was
 * passed through.
 */
const getAttributionKey = ({
  promotionId,
  merchantId,
}: {
  promotionId: number;
  merchantId: number | null;
}): string =>
  merchantId !== null ? `merchant:${merchantId}` : `promotion:${promotionId}`;

const getAttributedKeys = async (): Promise<string[]> => {
  const stored = await browser.storage.session.get(ATTRIBUTED_KEYS_KEY);
  return (stored[ATTRIBUTED_KEYS_KEY] as string[] | undefined) ?? [];
};

const getPendingReferralTabIds = async (): Promise<number[]> => {
  const stored = await browser.storage.session.get(
    PENDING_REFERRAL_TAB_IDS_KEY,
  );
  return (stored[PENDING_REFERRAL_TAB_IDS_KEY] as number[] | undefined) ?? [];
};

/**
 * Opens a coupon's referral URL in an inactive tab to record affiliate
 * attribution, then lets the background's tabs.onUpdated listener (or the
 * timeout below) close it. No-ops if this merchant was already attributed
 * this browser session, so trying several codes for the same store — or
 * re-copying the same code — doesn't keep reopening tabs.
 */
export const fireCouponReferral = async ({
  referralUrl,
  promotionId,
  merchantId,
}: {
  referralUrl: string;
  promotionId: number;
  merchantId: number | null;
}): Promise<void> => {
  const key = getAttributionKey({ promotionId, merchantId });
  const attributedKeys = await getAttributedKeys();
  if (attributedKeys.includes(key)) return;

  await browser.storage.session.set({
    [ATTRIBUTED_KEYS_KEY]: [...attributedKeys, key],
  });

  const tab = await browser.tabs.create({ url: referralUrl, active: false });
  if (tab.id === undefined) return;

  const tabId = tab.id;
  const pendingIds = await getPendingReferralTabIds();
  await browser.storage.session.set({
    [PENDING_REFERRAL_TAB_IDS_KEY]: [...pendingIds, tabId],
  });

  setTimeout(() => {
    void closeReferralTab(tabId);
  }, REFERRAL_TAB_TIMEOUT_MS);
};

export const isPendingReferralTab = async (tabId: number): Promise<boolean> => {
  const pendingIds = await getPendingReferralTabIds();
  return pendingIds.includes(tabId);
};

/** Closes a pending referral tab. Safe to call twice (e.g. once the
 * redirect completes and once from the timeout)
 */
export const closeReferralTab = async (tabId: number): Promise<void> => {
  const pendingIds = await getPendingReferralTabIds();
  if (!pendingIds.includes(tabId)) return;

  await browser.storage.session.set({
    [PENDING_REFERRAL_TAB_IDS_KEY]: pendingIds.filter((id) => id !== tabId),
  });

  try {
    await browser.tabs.remove(tabId);
  } catch {
    // Tab may have already been closed by the user — nothing to do.
  }
};
