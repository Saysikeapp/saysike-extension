import { Store } from "@/pages/Store";
import { Browse } from "@/pages/Browse";
import { useStoreDetails } from "@/hooks/useStoreDetails";
import { LoadingSpinner } from "@saysike/ui";
import { cn } from "@saysike/ui";
import { JSX } from "react";

export const Home = ({ show }: { show: boolean }): JSX.Element => {
  const storeDetails = useStoreDetails();

  return (
    <div
      className="w-full h-full overflow-x-hidden relative"
      style={{ display: show ? "block" : "none" }}
    >
      <div
        className={cn(
          "absolute inset-0 flex flex-col align-middle justify-center items-center transition-opacity duration-300",
          storeDetails.isPending
            ? "opacity-100"
            : "opacity-0 pointer-events-none",
        )}
      >
        <LoadingSpinner />
      </div>

      <div
        className={cn(
          "h-full transition-opacity duration-300",
          storeDetails.isPending
            ? "opacity-0 pointer-events-none"
            : "opacity-100",
        )}
      >
        {storeDetails?.data?.merchants?.length ? <Store /> : <Browse />}
      </div>
    </div>
  );
};
