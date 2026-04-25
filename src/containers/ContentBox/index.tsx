import { Home, Compare, UserArea } from "../index";
import { useNavigation } from "../../contexts/NavigationContext";
import { ReactNode } from "react";

export const ContentBox = (): ReactNode => {
  const { page } = useNavigation();

  return (
    <main className="relative flex-1 overflow-auto w-full">
      <Home show={page === "home"} />
      <Compare show={page === "compare"} />
      <UserArea show={page === "account"} />
    </main>
  );
};
