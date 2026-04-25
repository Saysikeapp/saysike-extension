import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const Price = memo<React.PropsWithChildren<ComponentProps<"span">>>((props) => {
  return (
    <span
      {...props}
      className={cn("text-xl tracking-2xl text-dark-blue", props.className)}
    />
  );
});

Price.displayName = "Price";

export { Price };
