import { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/classnames";

export const InputLabel = ({
  className,
  ...rest
}: ComponentProps<"label">): ReactNode => {
  return (
    <label
      className={cn("text-text-secondary text-xs", className)}
      {...rest}
    ></label>
  );
};
