import { JSX } from "react";
import { Icon } from "@saysike/ui";
import { BLUE_ICON_FILTER } from "@/components/common/styles";

export const AllDone = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="check.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-text-primary m-0">
          You&apos;re all set!
        </h1>
        <p className="text-base text-text-secondary leading-relaxed m-0">
          Start browsing and Saysike will automatically find deals and codes on
          the sites you visit.
        </p>
      </div>
    </div>
  );
};
