import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import {
  BackgroundEventMethods,
  getActiveTabId,
  getCurrentUrl,
  sendRuntimeMessage,
} from "@/lib/utils/browserAPI";

export const STORE_DETAILS_QUERY_KEY = "store-details";

const getStoreDetailsFromBackground =
  async (): Promise<GETStoreDetailsResponse | null> => {
    const [url, tabId] = await Promise.all([getCurrentUrl(), getActiveTabId()]);

    if (!url || !tabId) return null;

    const { result } = await sendRuntimeMessage<{
      result: GETStoreDetailsResponse | null;
    }>({
      method: BackgroundEventMethods.GET_STORE_DETAILS,
      data: {
        url,
        tabId,
      },
    });

    return result;
  };

export function useStoreDetails(): UseQueryResult<
  GETStoreDetailsResponse | null,
  Error
> {
  return useQuery({
    queryKey: [STORE_DETAILS_QUERY_KEY],
    queryFn: getStoreDetailsFromBackground,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
