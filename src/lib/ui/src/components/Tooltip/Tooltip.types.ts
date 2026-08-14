import {
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";

export type TTooltipRootProps = TooltipProps;

export type TTooltipTriggerProps = TooltipTriggerProps &
  React.RefAttributes<HTMLButtonElement>;

export type TTooltipContentProps = TooltipContentProps &
  React.RefAttributes<HTMLDivElement>;
