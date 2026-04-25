import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { TButtonProps, buttonVariants } from "./Button.types";
import { cn } from "../../utils/classnames";
import { LoadingSpinner } from "../Loading";

export const ManualButton = forwardRef<HTMLButtonElement, TButtonProps>(
  (props, ref) => {
    const {
      variant,
      isLoading,
      className = "",
      size = "md",
      active,
      asChild = false,
      ...rest
    } = props;

    const Comp = asChild ? Slot : "button";
    const type = !asChild && props.type === undefined ? "submit" : props.type;
    const disabled = props.disabled || isLoading;

    return (
      <Comp
        {...rest}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        title={props.name}
        type={type}
        disabled={disabled}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner className="w-6 h-6 border-4" />
          </div>
        ) : (
          props.children || props.name
        )}
      </Comp>
    );
  },
);

ManualButton.displayName = "ManualButton";

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (props, ref) => {
    return <ManualButton {...props} ref={ref} />;
  },
);

Button.displayName = "Button";
