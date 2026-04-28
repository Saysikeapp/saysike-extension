import { GETStoreDetailsResponse } from "@/lib/schemas";
import type { z } from "zod";

type Store = NonNullable<GETStoreDetailsResponse["store"]>;
type Promotion = GETStoreDetailsResponse["codes"][number];

export const createMockStore = (overrides: Partial<Store> = {}): Store => ({
  store_id: 1,
  store_name: "Test Store",
  store_url: "test-store.com",
  store_tracking_url: "https://track.test-store.com",
  logo_url: "https://cdn.test-store.com/logo.png",
  currency: "GBP",
  ...overrides,
});

export const createMockPromotion = (
  overrides: Partial<
    z.infer<
      typeof import("@/lib/schemas").GETStoreDetailsResponse
    >["codes"][number]
  > = {},
): Promotion => ({
  promotion_id: 1,
  code: "SAVE10",
  title: "10% off everything",
  tracking_url: "https://track.test-store.com/promo1",
  exclusive: false,
  starts: new Date("2026-01-01"),
  ends: new Date("2026-12-31"),
  description: "Get 10% off your entire order.",
  terms: "Minimum spend £20.",
  created_at: new Date("2026-01-01"),
  updated_at: new Date("2026-01-01"),
  promotion_type: "code",
  ...overrides,
});

export const createMockDeal = (overrides: Partial<Promotion> = {}): Promotion =>
  createMockPromotion({
    promotion_id: 2,
    code: null,
    title: "Free shipping on orders over £30",
    promotion_type: "deal",
    ...overrides,
  });

export const createMockStoreDetailsResponse = (
  overrides: Partial<GETStoreDetailsResponse> = {},
): GETStoreDetailsResponse => ({
  store: createMockStore(),
  codes: [createMockPromotion()],
  deals: [createMockDeal()],
  ...overrides,
});

export const createEmptyStoreDetailsResponse = (): GETStoreDetailsResponse => ({
  store: null,
  codes: [],
  deals: [],
});
