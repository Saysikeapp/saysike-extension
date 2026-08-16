import { ReactNode, useState } from "react";
import {
  Typography,
  Modal,
  Icon,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  cn,
} from "@saysike/ui";

import { CodeDealButton } from "./CodeDealButton";
import { DetailsTooltip, urgencyTextClass } from "./DetailsTooltip";
import { GETStoreDetailsResponse } from "@/lib/schemas";
import { getExpiryLabel } from "@/lib/utils";

export const DealDetailsModal = ({
  showModal,
  setShowModal,
  item,
  endsSoonWarningState,
  merchantId,
  merchantName,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: GETStoreDetailsResponse["merchants"][number]["codes"][number];
  endsSoonWarningState: "error" | "warning" | null;
  merchantId?: number;
  merchantName?: string;
}): ReactNode => {
  const [copied, setCopied] = useState(false);

  const {
    description,
    ends,
    exclusive,
    starts,
    terms,
    title,
    created_at,
    updated_at,
  } = item;

  const expiryLabel = getExpiryLabel(ends);
  const expiryIcon = endsSoonWarningState ? "priority-warning.svg" : "time.svg";

  return (
    <Modal.Overlay showModal={showModal} className="p-0 m-0">
      <Modal.Panel
        onClose={() => setShowModal(false)}
        className="w-[350px] !p-5"
      >
        <div className="pb-4 flex items-center gap-2 shrink-0">
          <Icon src="store.svg" size={4} />
          <Typography.RowHeader className="text-sm text-text-primary pr-6">
            {merchantName ?? "Store"}
          </Typography.RowHeader>
        </div>

        <div className="border-t-2 border-dashed border-border shrink-0" />

        <Modal.Body className="overflow-x-hidden pr-2">
          <div className="py-5 flex flex-col items-center text-center">
            <h1 className="text-base font-semibold leading-snug mb-4">
              {title}
            </h1>

            <CodeDealButton
              item={item}
              copied={copied}
              setCopied={setCopied}
              merchantId={merchantId}
              variant="secondary"
              className="mb-4"
            />

            <div className="flex flex-col gap-1.5 items-center">
              {exclusive && (
                <span className="text-xs text-success flex items-center gap-1">
                  <Icon src="giftbox.svg" size={3.5} /> Exclusive to Saysike
                </span>
              )}
              <span
                className={cn(
                  "text-xs flex items-center gap-1",
                  urgencyTextClass(endsSoonWarningState),
                )}
              >
                <DetailsTooltip
                  starts={starts}
                  ends={ends}
                  created_at={created_at}
                  updated_at={updated_at}
                >
                  <Icon src={expiryIcon} size={3.5} />
                </DetailsTooltip>
                {expiryLabel}
              </span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-border" />

          <div className="pt-2">
            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-xs text-text-secondary">
                  {description?.length
                    ? description
                    : "No description available"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="terms">
                <AccordionTrigger className="text-sm">
                  <span className="flex items-center gap-2">
                    <Icon src="law.svg" size={3.5} /> Terms &amp; Conditions
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-text-secondary">
                  {terms?.length ? terms : "No info"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Modal.Body>
      </Modal.Panel>
    </Modal.Overlay>
  );
};
