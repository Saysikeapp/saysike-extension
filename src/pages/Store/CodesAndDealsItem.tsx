import { JSX, useEffect, useState } from "react";
import { Button, Icon, Typography } from "@saysike/ui";

import { MoreDetailsModal } from "./MoreDetailsModal";
import { CodeDealButton } from "./CodeDealButton";
import dayjs from "dayjs";
import { highlightText } from "@/utils/highlightText";
import { percentInStringRegex } from "@saysike/utils";
import { GETStoreDetailsResponse } from "@saysike/schemas";

const checkIsToday = (dateToCheck: Date): boolean => {
  const today = new Date();
  dateToCheck = new Date(dateToCheck);

  return (
    dateToCheck.getFullYear() === today.getFullYear() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getDate() === today.getDate()
  );
};

export const CodesAndDealsItem = ({
  item,
}: {
  item: GETStoreDetailsResponse["codes"][number];
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  // This can be refined to not show copy when many clicked, later ticket
  const [copied, setCopied] = useState(false);

  const { ends, title } = item;

  const endsSoonWarningState =
    ends && new Date(ends).getTime() - 172800000 < new Date().getTime()
      ? "error"
      : ends && new Date(ends).getTime() - 604800000 < new Date().getTime()
        ? "warning"
        : null; // Expires in next 7 days?

  const formatDate = (date: Date): string =>
    dayjs(date).format("ddd D MMMM YYYY");

  const formattedTitle = highlightText(
    title,
    percentInStringRegex,
    "font-bold text-lg text-secondary",
  );

  useEffect(() => {
    if (!copied) return;

    setTimeout(() => setCopied(false), 5000);

    return (): void => {};
  }, [copied]);

  return (
    <div className="px-3 py-2.5 border-b border-border">
      <div className="flex flex-row justify-between items-center content-center">
        <CodeDealButton item={item} copied={copied} setCopied={setCopied} />

        {copied && (
          <Typography.HelperText state="success" className="mt-0 pl-1">
            <Icon src="line/copy.svg" className="mr-1" />
            Copied!
          </Typography.HelperText>
        )}
      </div>
      <p className="mt-2">{formattedTitle}</p>

      <div className="w-full flex flex-row justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Icon src="adjust-diagonal.svg" className="mr-2" />
          See Details
        </Button>

        <Typography.HelperText state={endsSoonWarningState || "normal"}>
          {ends ? (
            <>
              {endsSoonWarningState && <Icon src="hour.svg" className="mr-1" />}
              {checkIsToday(ends)
                ? "Last Chance! Ends Today!"
                : `Expires: ${formatDate(ends)}`}
            </>
          ) : (
            "Unknown"
          )}
        </Typography.HelperText>

        <MoreDetailsModal
          showModal={openModal}
          setShowModal={setOpenModal}
          item={item}
          endsSoonWarningState={endsSoonWarningState}
        />
      </div>
    </div>
  );
};
