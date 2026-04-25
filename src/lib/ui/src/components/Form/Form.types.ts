"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";
import { PropsWithChildren } from "react";

export type TForm<T extends FieldValues> = PropsWithChildren<unknown> & {
  form: UseFormReturn<T>;
  onSubmit: (formData: T) => void;
  className?: string;
  formContextProps?: TFormContextExtended;
};

export type TFormContextExtended = {
  isDisabled?: boolean;
};
