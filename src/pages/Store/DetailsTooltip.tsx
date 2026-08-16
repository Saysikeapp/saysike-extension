import { ReactNode } from "react";
import { Tooltip } from "@saysike/ui";

import { formatFullDate } from "@/lib/utils";

export const urgencyTextClass = (
  endsSoonWarningState: "error" | "warning" | null,
): string =>
  endsSoonWarningState === "error"
    ? "text-danger"
    : endsSoonWarningState === "warning"
      ? "text-warning"
      : "text-text-secondary";

export const DetailsTooltip = ({
  starts,
  ends,
  created_at,
  updated_at,
  children,
}: {
  starts: Date | null;
  ends: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  children: ReactNode;
}): ReactNode => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <span className="inline-flex items-center" aria-label="More details">
          {children}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div className="flex flex-col gap-1 whitespace-nowrap">
          <span>Starts: {starts ? formatFullDate(starts) : "Unknown"}</span>
          <span>Ends: {ends ? formatFullDate(ends) : "Unknown"}</span>
          <span>
            Added: {created_at ? formatFullDate(created_at) : "Unknown"}
          </span>
          <span>
            Updated: {updated_at ? formatFullDate(updated_at) : "Unknown"}
          </span>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);
