import { Icon, Typography } from "@saysike/ui"; // Typography used for HelperText
import type { TIconSrc } from "@saysike/ui";
import { ReactNode } from "react";
import { BLUE_ICON_FILTER } from "@/utils/styles";

const COMING_SOON_FEATURES: { icon: TIconSrc; text: string }[] = [
  { icon: "pie-chart.svg", text: "Compare prices across multiple stores" },
  { icon: "price-tag.svg", text: "Track price history over time" },
  { icon: "sales-performance-up.svg", text: "Get alerts when prices drop" },
];

export const Compare = ({ show }: { show: boolean }): ReactNode => {
  return (
    <section
      style={{ display: show ? "flex" : "none" }}
      className="h-full w-full flex-col justify-center items-center gap-3 px-6 text-center"
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="store-sale.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Coming Soon
        </h2>
        <p className="text-xs text-text-primary leading-snug m-0">
          Price comparison is on its way. We&apos;re working hard to bring you
          the best deals across the web.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 w-full mt-1">
        {COMING_SOON_FEATURES.map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-primary border border-border"
          >
            <Icon src={icon} className="w-4 h-4 shrink-0 opacity-75" />
            <Typography.HelperText className="text-left leading-none text-text-primary mt-0">
              {text}
            </Typography.HelperText>
          </div>
        ))}
      </div>
    </section>
  );
};
