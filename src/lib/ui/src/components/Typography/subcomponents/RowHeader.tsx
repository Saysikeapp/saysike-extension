import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const RowHeader = memo<React.PropsWithChildren<ComponentProps<"h2">>>(
  (props) => {
    return (
      <h2
        {...props}
        className={cn("capitalize text-dark-blue leading-4", props.className)}
      />
    );
  },
);

RowHeader.displayName = "RowHeader";

export { RowHeader };
