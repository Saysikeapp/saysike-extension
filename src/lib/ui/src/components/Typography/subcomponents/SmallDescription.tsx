import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const SmallDescription = memo<React.PropsWithChildren<ComponentProps<"p">>>(
  (props) => {
    return (
      <p
        {...props}
        className={cn("text-2xs leading-3 text-dark-blue", props.className)}
      />
    );
  },
);

SmallDescription.displayName = "SmallDescription";

export { SmallDescription };
