import { httpRequest } from "@saysike/http";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import { assertEnv } from "@/lib/utils";

export async function makeAIStoreDetailsGETRequest(
  storeUrl: string,
): Promise<GETStoreDetailsResponse> {
  const BASE_URL = assertEnv("WXT_BASE_SERVER_URI");
  return await httpRequest({
    url: `${BASE_URL}/v1/stores/details/${storeUrl}`,
    method: "GET",
    responseSchema: GETStoreDetailsResponse,
  });
}
