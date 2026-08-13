import { browserMock } from "@/test/mocks/browser";
import {
  closeReferralTab,
  fireCouponReferral,
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
});

describe("closeReferralTab", () => {
  it("removes a pending referral tab and clears it from the pending list", async () => {
    browserMock.tabs.create.mockResolvedValue({ id: 7 });
    await fireCouponReferral({
      referralUrl: "https://refer.example.com/go",
      promotionId: 1,
      merchantId: 100,
    });

    await closeReferralTab(7);

    expect(browserMock.tabs.remove).toHaveBeenCalledWith(7);
    await expect(isPendingReferralTab(7)).resolves.toBe(false);
  });

  it("is a no-op for a tab id that isn't pending", async () => {
    await closeReferralTab(999);

    expect(browserMock.tabs.remove).not.toHaveBeenCalled();
  });
});
