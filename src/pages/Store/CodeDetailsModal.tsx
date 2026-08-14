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

export const CodeDetailsModal = ({
  showModal,
  setShowModal,
  item,
  endsSoonWarningState,
  merchantId,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: GETStoreDetailsResponse["merchants"][number]["codes"][number];
  endsSoonWarningState: "error" | "warning" | null;
  merchantId?: number;
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
        <Modal.Body className="overflow-x-hidden pr-2">
          <p className="text-2xs uppercase tracking-widest text-text-tertiary mb-1">
            Code
          </p>
          <h1 className="text-lg font-bold leading-snug pr-4 mb-3">{title}</h1>

          <div className="flex flex-row items-center gap-4 flex-wrap mb-4">
            {exclusive && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                <Icon src="giftbox.svg" size={3.5} /> Exclusive
              </span>
            )}
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
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

          <div className="h-px bg-border mb-4" />

          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {description?.length ? description : "No description available"}
          </p>

          <Accordion type="single" collapsible>
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
        </Modal.Body>

        <Modal.Footer>
          <div className="flex flex-row justify-between items-center pt-4 border-t border-border">
            <CodeDealButton
              item={item}
              copied={copied}
              setCopied={setCopied}
              merchantId={merchantId}
            />
            {copied && (
              <Typography.HelperText state="success" className="mt-0">
                <Icon src="line/copy.svg" className="mr-1" />
                Copied!
              </Typography.HelperText>
            )}
          </div>
        </Modal.Footer>
      </Modal.Panel>
    </Modal.Overlay>
  );
};
