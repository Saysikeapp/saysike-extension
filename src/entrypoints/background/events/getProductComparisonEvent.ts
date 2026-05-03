import { POSTCompareProductResponse } from "@/lib/schemas";
import { makeCompareProductPOSTRequest } from "../requests/makeCompareProductPOSTRequest";

export const getProductComparisonEvent = async (data: {
  url: string;
  asin: string;
  name: string;
}): Promise<POSTCompareProductResponse | null> => {
  const protocol = data.url.split(":")[0];
  if (protocol !== "https" && protocol !== "http") return null;

  return await makeCompareProductPOSTRequest({
    asin: data.asin,
    name: data.name,
  });
};
