import { useNonNullableContext } from "@saysike/ui";
import { TContainer } from "@/types/navigation";
import { PropsWithChildren, ReactNode, createContext, useState } from "react";

type TNavigationContext = {
  page: TContainer;
  setPage: React.Dispatch<React.SetStateAction<TContainer>>;
};

export const NavigationContext = createContext<TNavigationContext | null>(null);

export const useNavigation = (): TNavigationContext => {
  return useNonNullableContext(NavigationContext);
};

export const NavigationProvider = (props: PropsWithChildren): ReactNode => {
  const [page, setPage] = useState<TContainer>("home");

  return (
    <NavigationContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};
