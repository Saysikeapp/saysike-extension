import { JSX } from "react";
import { Icon } from "@saysike/ui";
import { BLUE_ICON_FILTER } from "@/components/common/styles";

const STEPS = [
  {
    icon: "store.svg",
    title: "Browse normally",
    description:
      "Shop on any of your favourite websites, just as you always do.",
  },
  {
    icon: "label-tag.svg",
    title: "Watch for the badge",
    description:
      "When deals are available, the Saysike icon lights up with a badge.",
  },
  {
    icon: "check.svg",
    title: "Save money",
    description:
      "Click the icon to view and apply codes or deals instantly at checkout.",
  },
] as const;

export const HowItWorks = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold text-text-primary m-0">
          Here&apos;s how it works
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <div style={{ filter: BLUE_ICON_FILTER }}>
                <Icon src={step.icon} size={5} />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-sm font-semibold text-text-primary m-0">
                {step.title}
              </h4>
              <p className="text-xs text-text-secondary leading-snug m-0">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
