import { z } from "zod";

const dateField = z
  .union([z.string(), z.date()])
  .transform((val) => (typeof val === "string" ? new Date(val) : val))
  .nullable();

const MerchantRow = z.object({
  merchant_id: z.number(),
  store_name: z.string(),
  network_name: z.string(),
  primary_domain: z.string(),
  store_tracking_url: z.string().nullable(),
  logo_url: z.string().nullable(),
  currency: z.string().nullable(),
});

const PromotionRow = z.object({
  promotion_id: z.number(),
  code: z.string().nullable(),
  title: z.string(),
  tracking_url: z.string().nullable(),
  exclusive: z.boolean(),
  starts: dateField,
  ends: dateField,
  description: z.string().nullable(),
  terms: z.string().nullable(),
  created_at: dateField,
  updated_at: dateField,
  promotion_type: z.enum(["code", "deal"]),
});

const MerchantWithPromotions = z.object({
  merchant: MerchantRow,
  codes: z.array(PromotionRow),
  deals: z.array(PromotionRow),
});

export const GETStoreDetailsResponse = z.object({
  merchants: z.array(MerchantWithPromotions),
});
export type GETStoreDetailsResponse = z.infer<typeof GETStoreDetailsResponse>;
