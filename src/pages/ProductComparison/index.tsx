import { Icon, Typography } from "@saysike/ui";
import type { TIconSrc } from "@saysike/ui";
import { ReactNode } from "react";

const COMING_SOON_FEATURES: { icon: TIconSrc; text: string }[] = [
  { icon: "pie-chart.svg", text: "Compare prices across multiple stores" },
  { icon: "price-tag.svg", text: "Track price history over time" },
  { icon: "sales-performance-up.svg", text: "Get alerts when prices drop" },
];

export const ProductComparison = (): ReactNode => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-3 px-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-secondary">
        <Icon src="store-sale.svg" className="w-8 h-8 opacity-50" />
      </div>

      <div className="flex flex-col gap-1">
        <Typography.RowTitle className="text-lg font-semibold normal-case tracking-normal">
          Coming Soon
        </Typography.RowTitle>
        <Typography.Description className="text-text-secondary leading-snug">
          Price comparison is on its way. We&apos;re working hard to bring you
          the best deals across the web.
        </Typography.Description>
      </div>

      <div className="flex flex-col gap-1.5 w-full mt-1">
        {COMING_SOON_FEATURES.map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-secondary"
          >
            <Icon src={icon} className="w-4 h-4 shrink-0 opacity-60" />
            <Typography.HelperText className="text-left leading-none">
              {text}
            </Typography.HelperText>
          </div>
        ))}
      </div>
    </section>
  );
};
