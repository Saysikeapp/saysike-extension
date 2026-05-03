import { Button, Icon, cn } from "@saysike/ui";
import { ReactNode } from "react";
import { Product } from "@/lib/schemas";

const FallbackImage = (): ReactNode => (
  <div className="flex items-center justify-center w-16 h-16 shrink-0 rounded-lg bg-surface-secondary border border-border">
    <Icon src="store-sale.svg" className="w-7 h-7 opacity-40" />
  </div>
);

const PriceDisplay = ({
  price,
  finalPrice,
  onSale,
  currency,
}: {
  price: number;
  finalPrice: number;
  onSale: boolean;
  currency: string;
}): ReactNode => {
  if (onSale) {
    return (
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-sm font-semibold text-text-primary">
          {currency}
          {finalPrice.toFixed(2)}
        </span>
        <span className="text-xs text-text-tertiary line-through">
          {currency}
          {price.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <span className="text-sm font-semibold text-text-primary">
      {currency}
      {finalPrice.toFixed(2)}
    </span>
  );
};

const ComparisonItemCard = ({ item }: { item: Product }): ReactNode => {
  const handleView = (): void => {
    window.open(item.affiliateUrl, "_blank");
  };

  const imageUrl = item.image ?? item.thumbnail ?? null;

  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-surface-primary border border-border">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-16 h-16 shrink-0 rounded-lg object-contain bg-white border border-border"
        />
      ) : (
        <FallbackImage />
      )}

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p
          className={cn(
            "text-xs font-medium text-text-primary leading-snug m-0",
            "overflow-hidden",
            "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          )}
        >
          {item.name}
        </p>
        <p className="text-[10px] text-text-tertiary m-0">{item.merchant}</p>
        <PriceDisplay
          price={item.price}
          finalPrice={item.finalPrice}
          onSale={item.onSale}
          currency={item.currency}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="shrink-0 text-xs rounded-lg h-8 px-3"
        onClick={handleView}
        type="button"
      >
        View
      </Button>
    </div>
  );
};

export const ProductComparison = ({
  products,
}: {
  products: Product[];
}): ReactNode => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="px-3 pt-3 pb-2">
        <h2 className="text-sm font-semibold text-text-primary m-0">
          Price Comparison
        </h2>
        <p className="text-xs text-text-secondary m-0">
          {products.length} {products.length === 1 ? "result" : "results"} found
        </p>
      </div>

      <div className="flex flex-col gap-2 px-3 pb-3 overflow-y-auto">
        {products.map((product) => (
          <ComparisonItemCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};
