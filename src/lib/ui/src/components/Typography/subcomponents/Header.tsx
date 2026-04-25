import { cn } from "../../../utils/classnames";
import React, { ComponentProps, memo } from "react";

const Header = memo<React.PropsWithChildren<ComponentProps<"h1">>>((props) => {
  return (
    <h1
      {...props}
      className={cn("text-4xl text-primary font-bold", props.className)}
    ></h1>
  );
});

Header.displayName = "Header";

export { Header };
