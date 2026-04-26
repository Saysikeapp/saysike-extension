import { Button, Icon } from "@saysike/ui";

import { cn } from "@saysike/ui";
import { GETStoreDetailsResponse } from "@saysike/schemas";

export const CodeDealButton = ({
  item,
  copied,
  setCopied,
  className,
}: {
  item: GETStoreDetailsResponse["codes"][number];
  copied: boolean;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) => {
  const { code, tracking_url } = item;

  return (
    <Button
      onClick={() => {
        if (!code) {
          // TODO: Review
          if (tracking_url) window.open(tracking_url);
          return;
        }

        // This is a bit annoying I guess, but works for now.
        // Better solution to be looked into TODO <><><>
        // !copied &&
        //   browser.tabs.create({
        //     url: tracking_url,
        //     active: false,
        //     // true,  - can make true to tab to it. lets see
        //   });

        void navigator.clipboard.writeText(code);
        setCopied(true);
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
