import { httpRequest } from "@saysike/http";
import { GETStoreDetailsResponse } from "@saysike/schemas";

const BASE_URL = import.meta.env.WXT_BASE_SERVER_URI as string;

export async function makeAIStoreDetailsGETRequest(
  storeUrl: string,
): Promise<GETStoreDetailsResponse> {
  return await httpRequest({
    url: `${BASE_URL}/v1/stores/details/${storeUrl}`,
    method: "GET",
    responseSchema: GETStoreDetailsResponse,
  });
}
