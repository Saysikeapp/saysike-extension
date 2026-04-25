import React, { memo } from "react";

import { LoadingSpinner } from "../Loading";
import { cn } from "../../utils/classnames";
import { DEFAULT_INPUT_CLASSNAME } from "../constants";

export const InputRenderer = memo<
  Omit<React.ComponentProps<"input">, "children" | "size"> & {
    isLoading: boolean;
    loadingDisplayType?: "border" | "spinner";
    disabled: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    children: (props: { className: string }) => React.ReactNode;
  }
>((props) => {
  const {
    isLoading,
    loadingDisplayType,
    disabled,
    iconLeft,
    iconRight,
    size = "md",
    className,
    children,
  } = props;

  return (
    <div
      className={cn("text-md rounded-md relative w-full", {
        "loading-state": isLoading && loadingDisplayType === "border",
      })}
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
        {iconLeft ? iconLeft : null}
      </div>
      {children({
        className: cn(
          DEFAULT_INPUT_CLASSNAME,
          {
            "h-9": size === "sm",
            "h-10": size === "md",
            "h-12": size === "lg",
            "bg-light-grey": disabled,
            "focus:outline-primary": !isLoading,
            "focus:outline-hidden border-0": isLoading,
            "pl-9!": iconLeft,
            "pr-9!":
              (isLoading && loadingDisplayType === "spinner") || iconRight,
          },
          className,
        ),
      })}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-20">
        {isLoading && loadingDisplayType === "spinner" ? (
          <LoadingSpinner className="w-8 h-8 border-[6px]" />
        ) : iconRight ? (
          iconRight
        ) : null}
      </div>
    </div>
  );
});

InputRenderer.displayName = "InputRenderer";
