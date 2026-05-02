import { z } from "zod";

export const CompareProductRequestSchema = z.object({
  asin: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional(),
});

export type CompareProductRequest = z.infer<typeof CompareProductRequestSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string().optional(),
  price: z.number(),
  finalPrice: z.number(),
  salePrice: z.number().optional(),
  saleDiscount: z.number(),
  currency: z.string(),
  affiliateUrl: z.string(),
  directUrl: z.string().optional(),
  image: z.string().optional(),
  thumbnail: z.string().optional(),
  merchant: z.string(),
  merchantId: z.number(),
  source: z.string(),
  sourceId: z.number(),
  onSale: z.boolean(),
  sku: z.string().optional(),
  description: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const POSTCompareProductResponse = z.object({
  products: z.array(ProductSchema),
});

export type POSTCompareProductResponse = z.infer<
  typeof POSTCompareProductResponse
>;
