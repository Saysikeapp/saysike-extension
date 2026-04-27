import { ReactNode } from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { cn, Icon } from "@saysike/ui";
import type { TIconSrc } from "@saysike/ui";
import type { TContainer } from "@/types/navigation.types";

const NAV_ITEMS: { id: TContainer; icon: TIconSrc }[] = [
  { id: "home", icon: "label-tag.svg" },
  { id: "compare", icon: "store-sale.svg" },
  { id: "account", icon: "avatar.svg" },
];

export const Navbar = (): ReactNode => {
  const { page, setPage } = useNavigation();

  return (
    <nav className="flex flex-row bg-surface-primary border-t-2 border-border w-full h-15 shrink-0">
      {NAV_ITEMS.map(({ id, icon }) => {
        const isActive = page === id;
        return (
          <div
            key={id}
            className={cn(
              "flex-1 h-full flex justify-center items-center cursor-pointer border-t-2 -mt-0.5 transition-colors select-none",
              isActive ? "border-t-primary" : "border-t-transparent",
            )}
            onClick={() => {
              if (!isActive) setPage(id);
            }}
          >
            <Icon
              src={icon}
              size={9}
              className={cn(
                "transition-all",
                isActive
                  ? "filter-[brightness(0)_saturate(100%)_invert(40%)_sepia(90%)_saturate(2000%)_hue-rotate(196deg)_brightness(105%)]"
                  : "opacity-40",
              )}
            />
          </div>
        );
      })}
    </nav>
  );
};
