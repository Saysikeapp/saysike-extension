import { ChromeMessageRequest } from "@/lib/browerAPI";
import { makeAIStoreDetailsGETRequest } from "../requests/makeAIStoreDetailsGETRequest";
import { GETStoreDetailsResponse } from "@saysike/schemas";
import { filterAndFormatDomain } from "@saysike/utils";
import { setIconBadge } from "../utils/setIconBadge";

export const getStoreDetailsEvent = async (
  data: ChromeMessageRequest["data"],
): Promise<GETStoreDetailsResponse | null> => {
  // case to stop crashing on chrome-extensions and other chrome pages...
  const protocol = data.url.split(":")[0];
  if (protocol !== "https" && protocol !== "http") return null;

  const domain = filterAndFormatDomain(data.url);

  const result = await makeAIStoreDetailsGETRequest(domain);

  setIconBadge(result, data.tabId);

  return result;
};
