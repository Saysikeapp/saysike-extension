import { ReactNode, useState } from "react";
import {
  Typography,
  Modal,
  Icon,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@saysike/ui";

import { CodeDealButton } from "./CodeDealButton";
import dayjs from "dayjs";
import { GETStoreDetailsResponse } from "@/lib/schemas";

export const MoreDetailsModal = ({
  showModal,
  setShowModal,
  item,
  endsSoonWarningState,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: GETStoreDetailsResponse["codes"][number];
  endsSoonWarningState: "error" | "warning" | null;
}): ReactNode => {
  const [copied, setCopied] = useState(false);

  const formatDate = (date: Date): string =>
    dayjs(date).format("dddd D MMMM YYYY");

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

  return (
    <Modal.Overlay showModal={showModal} className="p-0 m-0">
      <Modal.Panel onClose={() => setShowModal(false)} className="h-full">
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body className="overflow-x-hidden">
          {
            <>
              {exclusive && (
                <Typography.HelperText state="success">
                  <Icon src="giftbox.svg" className="mr-2" />
                  Saysike Exclusive!
                </Typography.HelperText>
              )}

              <div className="w-full flex flex-row items-stretch">
                <div className="flex-1 w-1/2">
                  <h4>Starts</h4>

                  <Typography.HelperText>
                    <Icon src="time.svg" className="mr-2" />
                    {starts ? formatDate(starts) : "Unknown"}
                  </Typography.HelperText>

                  <h4>Active Since</h4>

                  <Typography.HelperText>
                    <Icon src="time.svg" className="mr-2" />
                    {created_at ? formatDate(created_at) : "Unknown"}
                  </Typography.HelperText>
                </div>

                <div className="flex-1 w-1/2">
                  <h4>Ends</h4>

                  <Typography.HelperText
                    // @todo could do some yellow text warning too based on time
                    state={`${endsSoonWarningState || "normal"}`}
                  >
                    <Icon src="time.svg" className="mr-2" />
                    {ends ? formatDate(ends) : "Unknown"}
                  </Typography.HelperText>

                  <h4>Last Updated</h4>

                  <Typography.HelperText>
                    <Icon src="time.svg" className="mr-2" />
                    {updated_at ? formatDate(updated_at) : "Unknown"}
                  </Typography.HelperText>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {description?.length
                      ? description
                      : "No description available"}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="terms">
                  <AccordionTrigger>Terms And Conditions</AccordionTrigger>
                  <AccordionContent>
                    {terms?.length ? terms : "No info"}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row justify-between items-center">
            {/* <Button
              onClick={() => {
                setShowModal(false);
              }}
              variant="ghost"
              size="sm"
            >
              <Icon src="arrow-left.svg" className="mr-2" /> Back
            </Button> */}

            <CodeDealButton item={item} copied={copied} setCopied={setCopied} />
            <div className="w-max m-auto">
              {copied && (
                <Typography.HelperText state="success">
                  <Icon src="line/copy.svg" className="mr-1" />
                  Copied!
                </Typography.HelperText>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal.Panel>
    </Modal.Overlay>
  );
};
