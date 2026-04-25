import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const SubProduct = memo<React.PropsWithChildren<ComponentProps<"p">>>(
  (props) => {
    return (
      <p
        {...props}
        className={cn(
          "text-sm capitalize leading-md text-light-blue",
          props.className,
        )}
      />
    );
  },
);

SubProduct.displayName = "SubProduct";

export { SubProduct };
