import { CodesAndDealsItem } from "./CodesAndDealsItem";
import { useStoreDetails } from "@/hooks/useStoreDetails";
import { Icon } from "@saysike/ui";
import { BLUE_ICON_FILTER } from "@/lib/styles";

const CodesAndDealsList = ({
  searchTerm,
  filteredOffersCount,
}: {
  searchTerm: string;
  filteredOffersCount: number;
}) => {
  const storeDetails = useStoreDetails().data;
  const codes = storeDetails?.codes ?? [];
  const deals = storeDetails?.deals ?? [];

  return (
    <>
      {!codes.length && !deals.length ? (
        <div className="w-full flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <div style={{ filter: BLUE_ICON_FILTER }}>
              <Icon src="store.svg" size={10} />
            </div>
          </div>
          <h2 className="text-sm font-semibold text-text-primary m-0">
            No promotions found
          </h2>
          <p className="text-xs text-text-primary leading-snug m-0">
            We couldn&apos;t find any active codes or deals for{" "}
            {storeDetails?.store?.store_name}. We may still be able to offer
            price history on some products.
          </p>
        </div>
      ) : null}

      <div>
        {codes
          .filter((code) => {
            if (
              (code.title + code.description + code.terms)
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
            )
              return true;
          })
          .map((code) => {
            return <CodesAndDealsItem key={code.promotion_id} item={code} />;
          })}
      </div>

      {filteredOffersCount !== 0 && (
        <div className="px-3 py-3 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-tertiary m-0 text-center">
            Active Deals & Offers
          </p>
        </div>
      )}

      <div>
        {deals
          .filter((deal) => {
            if (
              (deal.title + deal.description + deal.terms)
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
              return true;
          })
          .map((deal) => {
            return <CodesAndDealsItem key={deal.promotion_id} item={deal} />;
          })}
      </div>
    </>
  );
};

export default CodesAndDealsList;
