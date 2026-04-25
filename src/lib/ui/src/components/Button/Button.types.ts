import { ComponentPropsWithRef, MouseEventHandler } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center text-center justify-center whitespace-nowrap select-none text-md ring-offset-background transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-red text-white hover:bg-red/90",
        outline:
          "border border-input bg-surface-primary hover:bg-surface-secondary dark:hover:bg-surface-tertiary",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:bg-light-grey/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      active: {
        true: () => {
          return "bg-primary-dark!";
        },
        tab: "border-b-4 hover:pb-5",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type TButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    isDone?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    isUserError?: boolean;
    isSystemError?: boolean;
    onClickSuccess?: MouseEventHandler<HTMLButtonElement> | undefined;
    onClickError?: MouseEventHandler<HTMLButtonElement> | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    error?: string | null;
    focus?: boolean;
    dataQa?: string;
  };
