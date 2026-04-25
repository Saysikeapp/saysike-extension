import { ComponentProps, ReactNode, Ref } from "react";
import { TValidationStateTextPropsShared } from "../Shared/ValidationStateText";
export * from "./TextInput.types";

export type TInputTypeUnion =
  | {
      type: "number";
      value?: number;
      onValueChange?: (value: number) => void;
    }
  | {
      type?: Extract<
        ComponentProps<"input">["type"],
        "text" | "password" | "email" | "search" | "url"
      >;
      value?: string;
      onValueChange?: (value: string) => void;
    };

export type TInputProps = {
  isFormControlled?: boolean;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: "sm" | "md" | "lg";
  ref?: Ref<HTMLInputElement>;
  loadingDisplayType?: "border" | "spinner";
} & Omit<ComponentProps<"input">, "value" | "size"> &
  TInputTypeUnion &
  TValidationStateTextPropsShared;

export type TFormInputProps = {
  name: string;
} & TInputProps;
