import { makeAIStoreDetailsGETRequest } from "../requests/makeAIStoreDetailsGETRequest";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import { filterAndFormatDomain } from "@/lib/utils";
import { setIconBadge } from "../utils/setIconBadge";

export const getStoreDetailsEvent = async (data: {
  url: string;
  tabId: number;
}): Promise<GETStoreDetailsResponse | null> => {
  // case to stop crashing on chrome-extensions:// and other chrome pages...
  const protocol = data.url.split(":")[0];
  if (protocol !== "https" && protocol !== "http") return null;

  const domain = filterAndFormatDomain(data.url);

  const result = await makeAIStoreDetailsGETRequest(domain);

  setIconBadge(result, data.tabId);

  return result;
};
