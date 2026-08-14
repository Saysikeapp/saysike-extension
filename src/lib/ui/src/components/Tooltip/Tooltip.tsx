import {
  Content as ContentRadix,
  Portal,
  Provider as ProviderRadix,
  Root as RootRadix,
  TooltipProviderProps,
  Trigger as TriggerRadix,
} from "@radix-ui/react-tooltip";
import React, { PropsWithChildren } from "react";
import { cn } from "../../utils/classnames";

import {
  TTooltipContentProps,
  TTooltipRootProps,
  TTooltipTriggerProps,
} from "./Tooltip.types";

const Provider = ({
  children,
  ...rest
}: PropsWithChildren<TooltipProviderProps>) => {
  return (
    <ProviderRadix delayDuration={200} {...rest}>
      {children}
    </ProviderRadix>
  );
};

const Root = ({ children, ...rest }: PropsWithChildren<TTooltipRootProps>) => {
  return <RootRadix {...rest}>{children}</RootRadix>;
};

const Trigger = ({
  children,
  ...rest
}: PropsWithChildren<TTooltipTriggerProps>) => {
  return (
    <TriggerRadix asChild {...rest}>
      {children}
    </TriggerRadix>
  );
};

const Content = ({
  children,
  ...rest
}: PropsWithChildren<TTooltipContentProps>) => {
  return (
    <Portal>
      <ContentRadix
        side={"top"}
        align={"center"}
        sideOffset={6}
        {...rest}
        className={cn(
          "shadow-md bg-surface-elevated p-2 rounded-sm text-text-primary text-xs",
          rest.className,
        )}
        style={{
          zIndex: 50,
          ...rest?.style,
        }}
      >
        {children}
      </ContentRadix>
    </Portal>
  );
};

const Tooltip = Object.assign({}, { Provider, Root, Trigger, Content });

export default Tooltip;
