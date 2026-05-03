import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { POSTCompareProductResponse } from "@/lib/schemas";
import {
  extractAsin,
  extractProductNameFromTabTitle,
  getSupportedAmazonRegion,
} from "@/lib/utils";
import {
  BackgroundEventMethods,
  getCurrentTab,
  sendRuntimeMessage,
} from "@/lib/utils/browserAPI";

export const PRODUCT_COMPARISON_QUERY_KEY = "product-comparison";

type UseProductComparisonResult = {
  isSupported: boolean;
  asin: string | null;
  search: () => void;
} & Pick<
  UseQueryResult<POSTCompareProductResponse | null, Error>,
  "data" | "isPending" | "isSuccess" | "isError" | "error"
>;

export function useProductComparison(): UseProductComparisonResult {
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [asin, setAsin] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    void getCurrentTab().then((tab) => {
      if (!tab?.url) return;
      setUrl(tab.url);
      setName(extractProductNameFromTabTitle(tab.title ?? ""));

      const region = getSupportedAmazonRegion(tab.url);
      const extractedAsin = extractAsin(tab.url);

      setIsSupported(region !== null && extractedAsin !== null);
      setAsin(extractedAsin);
    });
  }, []);

  const query = useQuery({
    queryKey: [PRODUCT_COMPARISON_QUERY_KEY, asin, url, name],
    queryFn: async (): Promise<POSTCompareProductResponse | null> => {
      if (!url || !asin) return null;

      const { result } = await sendRuntimeMessage<{
        result: POSTCompareProductResponse | null;
      }>({
        method: BackgroundEventMethods.GET_PRODUCT_COMPARISON,
        data: { url, asin, name },
      });

      return result;
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const search = (): void => {
    if (!asin) return;
    void queryClient.resetQueries({
      queryKey: [PRODUCT_COMPARISON_QUERY_KEY, asin, url, name],
    });
    void query.refetch();
  };

  return {
    isSupported,
    asin,
    data: query.data,
    isPending: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    search,
  };
}
