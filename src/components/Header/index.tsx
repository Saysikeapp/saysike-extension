import { useNavigation } from "../../contexts/NavigationContext";
import { ReactNode } from "react";
import { useStoreDetails } from "@/hooks/useStoreDetails";

export const Header = (): ReactNode => {
  const { page } = useNavigation();
  const storeDetails = useStoreDetails();

  return (
    <div className="overflow-hidden bg-surface-primary h-12 w-full border-b-2 border-b-primary shrink-0">
      <div id="header" className="h-full w-full flex justify-center">
        {storeDetails.data?.store && page === "home" ? (
          <>
            <img
              src="/icon-128.png"
              alt="Saysike"
              className="h-7 m-auto left-2.5 top-2.25 absolute select-none"
              draggable={false}
              id="side-logo"
            />
            {storeDetails.data?.store?.logo_url ? (
              <img
                src={storeDetails.data.store.logo_url}
                alt={storeDetails.data.store.store_name}
                className="relative block object-contain max-h-10 max-w-75 m-auto select-none"
                draggable={false}
                id="logo"
              />
            ) : (
              <h2 className="m-auto max-w-75 overflow-hidden text-ellipsis whitespace-nowrap">
                {storeDetails.data?.store?.store_name}
              </h2>
            )}
          </>
        ) : (
          <img
            src="/cut-logo.png"
            alt="Saysike"
            className="relative block w-[240px] h-[40px] object-contain m-auto select-none"
            draggable={false}
            id="logo"
          />
        )}
      </div>
    </div>
  );
};
