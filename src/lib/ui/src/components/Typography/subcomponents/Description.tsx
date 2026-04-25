import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const Description = memo<React.PropsWithChildren<ComponentProps<"p">>>(
  (props) => {
    return (
      <p
        {...props}
        className={cn("text-xs leading-md text-dark-blue", props.className)}
      />
    );
  },
);

Description.displayName = "Description";

export { Description };
