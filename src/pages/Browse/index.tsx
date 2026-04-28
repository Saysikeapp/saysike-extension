import { Icon, Typography } from "@saysike/ui"; // Typography used for HelperText
import type { TIconSrc } from "@saysike/ui";
import { ReactNode } from "react";
import { BLUE_ICON_FILTER } from "@/components/common/styles";

const FEATURES: { icon: TIconSrc; text: string }[] = [
  { icon: "label-tag.svg", text: "Coupon codes applied at checkout" },
  { icon: "discount.svg", text: "Deals & offers listed automatically" },
  { icon: "earth-globe.svg", text: "Works on thousands of stores" },
];

export const Browse = (): ReactNode => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-3 px-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="discount.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-text-primary m-0">
          No deals here yet
        </h2>
        <p className="text-xs text-text-primary leading-snug m-0">
          We don&apos;t have any coupons or deals for this site right now. Visit
          a supported store and we&apos;ll find savings for you automatically.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 w-full mt-1">
        {FEATURES.map(({ icon, text }) => (
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
