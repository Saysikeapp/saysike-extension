"use client";

import { ReactNode, ReactElement } from "react";
import { cn } from "../../utils/classnames";
import { ErrorMessage } from "@hookform/error-message";
import { useFormState } from "react-hook-form";
import { getError, getTouchedField } from "../../utils/rhf";

export type TValidationState = "error" | "success" | "warning";

export type TValidationStateTextProps = {
  state?: TValidationState;
  formMessage?: string;
  customMessage?: string | ((state?: TValidationState) => ReactNode) | null;
  className?: string;
  showSuccessOnFormValidation?: boolean;
  emptyMessageSpace?: boolean | string;
  hideErrorMessage?: boolean;
};

export type TValidationStateTextPropsShared = {
  validationStateTextProps?: TValidationStateTextProps;
};

export const ERROR_MESSAGE_IGNORE = "IGNORE_THIS_ERROR_MESSAGE";

export const ManualValidationStateText = ({
  state,
  customMessage,
  formMessage,
  className,
}: TValidationStateTextProps): ReactElement | null => {
  if (
    customMessage === ERROR_MESSAGE_IGNORE ||
    formMessage === ERROR_MESSAGE_IGNORE
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        "text-sm flex-0",
        {
          "text-warning": state === "warning",
          "text-success": state === "success",
          "text-danger": state === "error",
        },
        className,
      )}
    >
      {typeof customMessage === "string" ? (
        <p>{customMessage}</p>
      ) : customMessage?.(state) ? (
        customMessage(state)
      ) : (
        <p>{formMessage}</p>
      )}
    </div>
  );
};

export const ValidationStateText = ({
  name,
  validationStateTextProps,
}: {
  name: string;
  validationStateTextProps: TValidationStateTextProps | undefined;
}): React.ReactElement => {
  const { errors, touchedFields } = useFormState({ name });

  const isTouched: boolean = getTouchedField(touchedFields, name) as boolean;
  const error = getError(errors, name);

  return (
    <>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
          return (
            <ManualValidationStateText
              formMessage={message}
              state={!error ? "success" : "error"}
              {...validationStateTextProps}
            />
          );
        }}
      />

      {!error?.message &&
        validationStateTextProps?.showSuccessOnFormValidation &&
        isTouched && (
          <ManualValidationStateText
            state="success"
            {...validationStateTextProps}
          />
        )}

      {/* TODO <><><><><> FIX THIS STUPID THING */}
      {/* cant check whether custom message returns element or null, leading to issues */}
      {/* around empty message thing, need to find a solution in future... for now im just */}
      {/* not usinbg success + custom message + empty for function together, which */}
      {/* limits functionality in some forms... */}
      {!error?.message &&
        (typeof validationStateTextProps?.customMessage === "string"
          ? !validationStateTextProps?.customMessage
          : !validationStateTextProps?.customMessage?.(
              validationStateTextProps.state,
            )) &&
        validationStateTextProps?.emptyMessageSpace && (
          <div
            className={
              validationStateTextProps.emptyMessageSpace === true
                ? "h-4 select-none"
                : validationStateTextProps.emptyMessageSpace
            }
          >
            &nbsp;
          </div>
        )}
    </>
  );
};
