import { Button, Icon, cn } from "@saysike/ui";
import { ReactNode } from "react";
import { BLUE_ICON_FILTER } from "@/components/common/styles";
import { useProductComparison } from "@/hooks/useProductComparison";
import { ProductComparison } from "@/pages/ProductComparison";

const ComparisonLoader = (): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-5 px-6 text-center">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-4 border-primary/40 animate-spin [animation-duration:2s]" />
        <div className="absolute inset-4 rounded-full border-4 border-primary/60 animate-spin [animation-duration:1.2s] [animation-direction:reverse]" />
        <div className="w-8 h-8 rounded-full bg-primary/80 animate-pulse" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-text-primary m-0">
          Scanning stores for the best price&hellip;
        </h2>
        <p className="text-xs text-text-secondary leading-snug m-0">
          Please keep this popup open &mdash; closing it will require you to
          start again.
        </p>
      </div>
    </div>
  );
};

const NotOnAmazon = (): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-3 px-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="store-sale.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Amazon Only (for now)
        </h2>
        <p className="text-xs text-text-secondary leading-snug m-0">
          Price comparison is currently only available on supported Amazon
          product pages. Head to Amazon and open a product to get started.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 w-full mt-1">
        {(
          [
            { icon: "pie-chart.svg", text: "US & UK Amazon supported" },
            { icon: "price-tag.svg", text: "More regions coming soon" },
            {
              icon: "sales-performance-up.svg",
              text: "Other stores coming in the future",
            },
          ] as const
        ).map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-primary border border-border"
          >
            <Icon src={icon} className="w-4 h-4 shrink-0 opacity-75" />
            <span className="text-xs text-left leading-none text-text-primary">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReadyToSearch = ({
  asin,
  onSearch,
}: {
  asin: string;
  onSearch: () => void;
}): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 px-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="pie-chart.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Find the Best Price
        </h2>
        <p className="text-xs text-text-secondary leading-snug m-0">
          We&apos;ll search across stores to find you the lowest price for this
          product.
        </p>
        <p className="text-[10px] text-text-tertiary font-mono mt-0.5">
          ASIN: {asin}
        </p>
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full rounded-lg text-sm font-medium"
        onClick={onSearch}
      >
        Search for Prices
      </Button>
    </div>
  );
};

const CompareError = ({ onRetry }: { onRetry: () => void }): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-3 px-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-danger/10">
        <Icon src="priority-warning.svg" className="w-8 h-8 opacity-70" />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-text-primary m-0">
          Something went wrong
        </h2>
        <p className="text-xs text-text-secondary leading-snug m-0">
          We couldn&apos;t fetch comparison results. Please try again.
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="rounded-lg text-xs"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </div>
  );
};

export const Compare = ({ show }: { show: boolean }): ReactNode => {
  const { isSupported, asin, data, isPending, isSuccess, isError, search } =
    useProductComparison();

  const hasResults = isSuccess && data?.products && data.products.length > 0;
  const isCentered = !hasResults;

  const renderContent = (): ReactNode => {
    if (isPending) {
      return <ComparisonLoader />;
    }

    if (!isSupported || !asin) {
      return <NotOnAmazon />;
    }

    if (isError) {
      return <CompareError onRetry={search} />;
    }

    if (hasResults) {
      return <ProductComparison products={data.products} />;
    }

    return <ReadyToSearch asin={asin} onSearch={search} />;
  };

  return (
    <section
      style={{ display: show ? "flex" : "none" }}
      className={cn(
        "h-full w-full flex-col",
        isCentered ? "justify-center items-center" : "",
      )}
    >
      {renderContent()}
    </section>
  );
};
