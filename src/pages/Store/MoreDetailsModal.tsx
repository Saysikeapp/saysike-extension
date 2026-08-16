import { ReactNode } from "react";

import { CodeDetailsModal } from "./CodeDetailsModal";
import { DealDetailsModal } from "./DealDetailsModal";
import { GETStoreDetailsResponse } from "@/lib/schemas";

export const MoreDetailsModal = ({
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
}): ReactNode =>
  item.code ? (
    <CodeDetailsModal
      showModal={showModal}
      setShowModal={setShowModal}
      item={item}
      endsSoonWarningState={endsSoonWarningState}
      merchantId={merchantId}
    />
  ) : (
    <DealDetailsModal
      showModal={showModal}
      setShowModal={setShowModal}
      item={item}
      endsSoonWarningState={endsSoonWarningState}
      merchantId={merchantId}
      merchantName={merchantName}
    />
  );
