import { Typography, Input, Icon } from "@saysike/ui";
import { useEffect, useState } from "react";
import { useStoreDetails } from "@/hooks/useStoreDetails";
import CodesAndDealsList from "./CodesAndDealsList";

export const Store = () => {
  const storeDetails = useStoreDetails().data;
  const codes = storeDetails?.codes ?? [];
  const deals = storeDetails?.deals ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCodesCount, setFilteredCodesCount] = useState(0);
  const [filteredOffersCount, setFilteredOffersCount] = useState(0);

  useEffect(() => {
    setFilteredCodesCount(
      codes.filter((code) => {
        if (
          (code.title + code.description + code.terms)
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
        )
          return true;
      }).length,
    );
    setFilteredOffersCount(
      deals.filter((deal) => {
        if (
          (deal.title + deal.description + deal.terms)
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
          return true;
      }).length,
    );
  }, [searchTerm]);

  return (
    <>
      <div className="px-3 py-2 flex items-center gap-2 border-b border-border">
        {codes.length > 0 || deals.length > 0 ? (
          <Typography.HelperText state="success" className="mr-auto mt-0">
            <Icon src="check.svg" className="mr-1" />
            Deals found!
          </Typography.HelperText>
        ) : (
          <span className="text-xs text-text-tertiary mr-auto">
            No promotions yet
          </span>
        )}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <Icon src="label-tag.svg" className="w-3.5 h-3.5 opacity-70" />
            <span className="font-semibold text-text-primary">
              {codes.length}
            </span>
          </span>
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <Icon src="cart.svg" className="w-3.5 h-3.5 opacity-70" />
            <span className="font-semibold text-text-primary">
              {deals.length}
            </span>
          </span>
        </div>
      </div>

      <div className="m-1.25 w-full bg-surface-primary sticky top-0">
        <Input
          placeholder="Looking for something?"
          iconLeft={<Icon src="search.svg" />}
          iconRight={<Icon src="exit.svg" />}
          value={searchTerm}
          // onClickRightIcon={() => {
          //   setSearchTerm("");
          // }}
          onChange={(e) => setSearchTerm(e.target.value)}
          // suffix={
          //   searchTerm !== "" &&
          //   `${filteredCodesCount + filteredOffersCount} Result${
          //     filteredCodesCount + filteredOffersCount !== 1 ? "s" : ""
          //   }`
          // }
          size="sm"
        />
      </div>

      <CodesAndDealsList
        searchTerm={searchTerm}
        filteredOffersCount={filteredOffersCount}
      />
    </>
  );
};
