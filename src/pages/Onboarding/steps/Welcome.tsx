import { JSX } from "react";

export const Welcome = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <img
        src="/saysike-logo.png"
        alt="Saysike"
        className="h-12 object-contain select-none"
        draggable={false}
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-text-primary m-0">
          Welcome to Saysike!
        </h1>
        <p className="text-base text-text-secondary leading-relaxed m-0">
          The free browser extension that automatically surfaces discount codes
          and deals while you shop — no searching required.
        </p>
      </div>
    </div>
  );
};
