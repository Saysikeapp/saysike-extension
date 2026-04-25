import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const RowTitle = memo<React.PropsWithChildren<ComponentProps<"h2">>>(
  (props) => {
    return (
      <h2
        {...props}
        className={cn(
          "text-lg uppercase font-medium tracking-widest",
          props.className,
        )}
      />
    );
  },
);

RowTitle.displayName = "RowTitle";

export { RowTitle };
