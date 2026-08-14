import { JSX } from "react";

const STEPS = [
  "Click the puzzle piece icon in your browser toolbar",
  'Find "Saysike" in the extensions list',
  "Click the pin icon to keep it always visible",
];

export const PinToolbar = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold text-text-primary m-0">
          Pin Saysike to your toolbar (Recommended)
        </h1>
        <p className="text-sm text-text-secondary m-0">
          Keep Saysike one click away so you never miss a deal.
        </p>
      </div>

      <div className="w-full h-75 border-2 border-border rounded-xl flex items-center justify-center bg-surface-secondary overflow-hidden">
        <img
          alt="Pin Saysike to your toolbar"
          src="/demo/pin-to-toolbar.png"
          className="object-fill"
        />
      </div>

      <ol className="flex flex-col gap-3 list-none m-0 p-0">
        {STEPS.map((step, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm text-text-primary">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
