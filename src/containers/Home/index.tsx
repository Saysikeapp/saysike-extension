import { Store } from "@/pages/Store";
import { Browse } from "@/pages/Browse";
import { useStoreDetails } from "@/hooks/useStoreDetails";
import { LoadingSpinner } from "@saysike/ui";
import { JSX } from "react";

export const Home = ({ show }: { show: boolean }): JSX.Element => {
  const storeDetails = useStoreDetails();

  return (
    <div
      className="w-full h-full overflow-x-hidden"
      style={{ display: show ? "block" : "none" }}
    >
      {storeDetails.isPending && (
        <div className="w-full h-full flex flex-col align-middle justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {!storeDetails.isPending ? (
        storeDetails?.data?.store ? (
          <Store></Store>
        ) : (
          <Browse></Browse>
        )
      ) : null}
    </div>
  );
};
