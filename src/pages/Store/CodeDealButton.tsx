import { Button, Icon } from "@saysike/ui";

import { cn } from "@saysike/ui";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import { ReactNode } from "react";
import {
  BackgroundEventMethods,
  sendRuntimeMessage,
} from "@/lib/utils/browserAPI";

export const CodeDealButton = ({
  item,
  copied: _copied,
  setCopied,
  className,
  merchantId,
}: {
  item: GETStoreDetailsResponse["merchants"][number]["codes"][number];
  copied: boolean;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  merchantId?: number;
}): ReactNode => {
  const { code, tracking_url, promotion_id } = item;

  return (
    <Button
      onClick={() => {
        if (!code) {
          // TODO: Review
          if (tracking_url) window.open(tracking_url);
          return;
        }

        void navigator.clipboard.writeText(code);
        setCopied(true);

        // Record affiliate attribution for this coupon.
        if (tracking_url) {
          void sendRuntimeMessage({
            method: BackgroundEventMethods.FIRE_COUPON_REFERRAL,
            data: {
              referralUrl: tracking_url,
              promotionId: promotion_id,
              merchantId: merchantId ?? null,
            },
          }).catch(() => {
            // Best-effort — a failed referral fire shouldn't disrupt copying the code.
          });
        }
      }}
      size={"lg"}
      variant={"secondary"}
      className={cn("min-w-45 select-none rounded-xs", className)}
    >
      {code ? (
        <>
          <Icon src="label-tag.svg" className="mr-2" />
          {code}
        </>
      ) : (
        <>
          View Deal
          <Icon className="ml-2" src="open-in-window.svg" />
        </>
      )}
    </Button>
  );
};
