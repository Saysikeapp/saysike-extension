"use client";

import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../utils/classnames";
import { setForwardedRef } from "../../utils/setForwardRef";
import { useFormContextExtended } from "../Form";
import {
  ManualValidationStateText,
  ValidationStateText,
} from "../Shared/ValidationStateText";
import { useInputValidationState } from "../../hooks/useInputValidationState";
import { TInputProps, TFormInputProps } from "./TextInput.types";
// import { Spinner } from "../../components/ui/Shared/Spinner";
import { InputRenderer } from "./Renderer";
import "./textInput.css";

export const FormInput = forwardRef<
  React.ElementRef<typeof _Input>,
  TFormInputProps
>(
  (
    {
      type,
      name,
      className,
      onValueChange,
      onBlur,
      validationStateTextProps,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const { control } = useFormContext();
    const formContextExtended = useFormContextExtended();

    const isDisabled = !!formContextExtended?.isDisabled || !!disabled;

    const { isSuccess, isError, isWarning } = useInputValidationState({
      name,
      isDisabled,
      validationStateTextProps,
    });

    return (
      <div className={"flex-1"}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <_Input
                {...rest}
                {...(type === "number"
                  ? {
                      type,
                      onValueChange: (value: number): void => {
                        field.onChange(value);
                        onValueChange?.(value);
                      },
                    }
                  : {
                      type,
                      onValueChange: (value: string): void => {
                        field.onChange(value);
                        onValueChange?.(value);
                      },
                    })}
                {...field}
                isFormControlled
                onBlur={(e) => {
                  field.onBlur();
                  onBlur?.(e);
                }}
                className={cn(
                  {
                    "border-warning": isWarning,
                    "border-success": isSuccess,
                    "border-danger": isError,
                    "focus:outline-primary":
                      !isWarning && !isSuccess && !isError,
                  },
                  className,
                )}
                ref={(e) => {
                  if (e) setForwardedRef(ref, e);
                  field.ref(e);
                }}
                disabled={isDisabled}
              />
            );
          }}
        />
        <ValidationStateText
          name={name}
          validationStateTextProps={validationStateTextProps}
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export const _Input = forwardRef<React.ElementRef<"input">, TInputProps>(
  (
    {
      className,
      iconLeft,
      iconRight,
      size = "md",
      type,
      value,
      isFormControlled,
      validationStateTextProps,
      onValueChange,
      onChange,
      isLoading,
      disabled,
      loadingDisplayType = "border",
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <InputRenderer
          isLoading={!!isLoading}
          loadingDisplayType={loadingDisplayType}
          disabled={!!disabled}
          iconLeft={iconLeft}
          iconRight={iconRight}
          size={size}
        >
          {(props) => {
            return (
              <input
                {...rest}
                {...props}
                type={type}
                value={
                  value === null || value === undefined
                    ? ""
                    : type === "number"
                      ? `${value}`
                      : value
                }
                disabled={!!disabled}
                onChange={(e) => {
                  onChange?.(e);

                  const { value } = e.currentTarget;

                  if (type === "number") {
                    // @note: parseFloat handles both integer and float.
                    onValueChange?.(parseFloat(value));
                    return;
                  }

                  onValueChange?.(value);
                }}
                className={cn(props.className, className)}
                ref={ref}
              />
            );
          }}
        </InputRenderer>
        {!isFormControlled && (
          <ManualValidationStateText {...validationStateTextProps} />
        )}
      </>
    );
  },
);

_Input.displayName = "Input";

export const Input = Object.assign(_Input, {
  Form: FormInput,
});
