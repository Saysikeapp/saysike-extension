import { HelperTextProps } from "./HelperText.types";
import { cn } from "../../../utils/classnames";

const HelperText = ({ children, state, className }: HelperTextProps) => (
  <div
    role="alert"
    className={cn(
      "text-text-secondary mt-1 flex flex-row items-center text-xs font-normal leading-[16px] tracking-[0.75px] [word-wrap:break-word]",
      {
        "text-success": state === "success",
        "text-warning": state === "warning",
        "text-danger": state === "error",
      },
      className,
    )}
  >
    {children}
  </div>
);

export { HelperText };
