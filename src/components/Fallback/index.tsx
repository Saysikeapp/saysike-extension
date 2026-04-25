import { ReactNode } from "react";

export const Fallback = (): ReactNode => {
  return (
    <div className="w-full h-full flex flex-col justify-center align-center">
      <div className="p-5 text-center">
        <p>Hmm, something went wrong.</p>

        <p>Please try reopening the extension.</p>
      </div>
    </div>
  );
};
