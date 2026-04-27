import { httpRequest } from "@saysike/http";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import { assertEnv } from "@/lib/utils";

const BASE_URL = assertEnv("WXT_BASE_SERVER_URI");

export async function makeAIStoreDetailsGETRequest(
  storeUrl: string,
): Promise<GETStoreDetailsResponse> {
  return await httpRequest({
    url: `${BASE_URL}/v1/stores/details/${storeUrl}`,
    method: "GET",
    responseSchema: GETStoreDetailsResponse,
  });
}
