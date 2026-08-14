import { browserMock } from "@/test/mocks/browser";
import {
  closeReferralTab,
  fireCouponReferral,
  forgetPendingReferralTab,
  isPendingReferralTab,
} from "./referral";

const sessionStore: Record<string, unknown> = {};

beforeEach(() => {
  for (const key of Object.keys(sessionStore)) delete sessionStore[key];

  browserMock.storage.session.get.mockImplementation((key: string) =>
    Promise.resolve({ [key]: sessionStore[key] }),
  );
  browserMock.storage.session.set.mockImplementation(
    (items: Record<string, unknown>) => {
      Object.assign(sessionStore, items);
      return Promise.resolve();
    },
  );
});

describe("fireCouponReferral", () => {
  it("opens the referral URL in an inactive tab", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    expect(browserMock.tabs.create).toHaveBeenCalledWith({
      url: "https://refer.example.com/go",
      active: false,
    });
  });

  it("does not reopen a tab for a promotion already attributed this session", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });
    browserMock.tabs.create.mockClear();

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    expect(browserMock.tabs.create).not.toHaveBeenCalled();
  });

  it("does not reopen a tab for a different promotion on an already-attributed merchant", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go?code=A",
      promotionId: 1,
      merchantId: 100,
    });
    browserMock.tabs.create.mockClear();

    // Different promotion, same merchant — the affiliate cookie is already set.
    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go?code=B",
      promotionId: 2,
      merchantId: 100,
    });

    expect(browserMock.tabs.create).not.toHaveBeenCalled();
  });

  it("fires independently for the same promotion on different merchants", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });
    browserMock.tabs.create.mockClear();

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 200,
    });

    expect(browserMock.tabs.create).toHaveBeenCalledTimes(1);
  });

  it("marks the opened tab as pending so it can be closed later", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    await expect(isPendingReferralTab(7)).resolves.toBe(true);
  });

  it("does not mark a merchant attributed when tabs.create fails, so a retry can still fire", async () => {
    browserMock.tabs.create.mockRejectedValueOnce(new Error("blocked"));

    await expect(
      fireCouponReferral({
        referralUrl: "https://refer.example.com/go",
        promotionId: 1,
        merchantId: 100,
      }),
    ).rejects.toThrow("blocked");

    browserMock.tabs.create.mockResolvedValue({ id: 7 });
    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    expect(browserMock.tabs.create).toHaveBeenCalledTimes(2);
  });

  it("does not mark a merchant attributed when tabs.create returns no tab id", async () => {
    browserMock.tabs.create.mockResolvedValueOnce({ id: undefined });

    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    browserMock.tabs.create.mockResolvedValue({ id: 7 });
    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    expect(browserMock.tabs.create).toHaveBeenCalledTimes(2);
  });

  it("serializes concurrent calls for the same merchant so only one tab opens", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });

    await Promise.all([
      fireCouponReferral({
        referralUrl: "https://refer.example.com/go",
        promotionId: 1,
        merchantId: 100,
      }),
      fireCouponReferral({
        referralUrl: "https://refer.example.com/go",
        promotionId: 1,
        merchantId: 100,
      }),
    ]);

    expect(browserMock.tabs.create).toHaveBeenCalledTimes(1);
  });
});

describe("closeReferralTab", () => {
  it("removes the tab", async () => {
    await closeReferralTab(7);

    expect(browserMock.tabs.remove).toHaveBeenCalledWith(7);
  });

  it("does not throw if the tab is already gone", async () => {
    browserMock.tabs.remove.mockRejectedValueOnce(new Error("No tab"));

    await expect(closeReferralTab(7)).resolves.toBeUndefined();
  });
});

describe("forgetPendingReferralTab", () => {
  it("clears a pending tab id from bookkeeping", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });
    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    await forgetPendingReferralTab(7);

    await expect(isPendingReferralTab(7)).resolves.toBe(false);
  });

  it("is a no-op for a tab id that isn't pending", async () => {
    await expect(forgetPendingReferralTab(999)).resolves.toBeUndefined();
  });
});
