import { GETStoreDetailsResponse } from "./storeDetails";

const validStore = {
  store_id: 1,
  store_name: "Test Store",
  store_url: "test-store.com",
  store_tracking_url: null,
  logo_url: null,
  currency: "GBP",
};

const validPromotion = {
  promotion_id: 1,
  code: "SAVE10",
  title: "10% off",
  tracking_url: null,
  exclusive: false,
  starts: "2026-01-01T00:00:00.000Z",
  ends: null,
  description: null,
  terms: null,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  promotion_type: "code" as const,
};

describe("GETStoreDetailsResponse schema", () => {
  describe("valid responses", () => {
    it("parses a full valid response", () => {
      const raw = {
        store: validStore,
        codes: [validPromotion],
        deals: [],
      };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(true);
    });

    it("parses an empty response (null store, empty arrays)", () => {
      const raw = { store: null, codes: [], deals: [] };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(true);
    });

    it("coerces date strings to Date objects", () => {
      const raw = { store: validStore, codes: [validPromotion], deals: [] };
      const result = GETStoreDetailsResponse.parse(raw);
      expect(result.codes[0]?.created_at).toBeInstanceOf(Date);
    });

    it("accepts null for nullable date fields", () => {
      const raw = {
        store: validStore,
        codes: [{ ...validPromotion, ends: null }],
        deals: [],
      };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(true);
    });

    it("accepts 'deal' as a valid promotion_type", () => {
      const raw = {
        store: validStore,
        codes: [],
        deals: [{ ...validPromotion, promotion_type: "deal", code: null }],
      };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid responses", () => {
    it("fails when store_id is not a number", () => {
      const raw = {
        store: { ...validStore, store_id: "not-a-number" },
        codes: [],
        deals: [],
      };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(false);
    });

    it("fails when promotion_type is an invalid enum value", () => {
      const raw = {
        store: null,
        codes: [{ ...validPromotion, promotion_type: "voucher" }],
        deals: [],
      };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(false);
    });

    it("fails when a required promotion field is missing", () => {
      const { title: _title, ...withoutTitle } = validPromotion;
      const raw = { store: null, codes: [withoutTitle], deals: [] };
      const result = GETStoreDetailsResponse.safeParse(raw);
      expect(result.success).toBe(false);
    });
  });
});
