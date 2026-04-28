"use client";

import { useFormState } from "react-hook-form";
import { TValidationStateTextProps } from "../components/Shared/ValidationStateText";
import { getDirtyField, getError } from "../utils/rhf";

export const useInputValidationState = (opts: {
  name: string;
  isDisabled: boolean;
  validationStateTextProps: TValidationStateTextProps | undefined;
}): { isSuccess: boolean; isError: boolean; isWarning: boolean } => {
  const { name, isDisabled, validationStateTextProps } = opts;

  const { errors, dirtyFields } = useFormState({ name });

  const error = getError(errors, name);
  const hasError = !!error;

  // const isTouched = getTouchedField(touchedFields, name)
  const isDirty: boolean = getDirtyField(dirtyFields, name) as boolean;

  const isSuccess =
    validationStateTextProps?.state === "success" ||
    (!hasError &&
      !!validationStateTextProps?.showSuccessOnFormValidation &&
      isDirty &&
      !isDisabled);
  const isWarning = validationStateTextProps?.state === "warning";
  const isError =
    !isSuccess &&
    (validationStateTextProps?.state === "error" || (hasError && !isDisabled));

  return { isSuccess, isError, isWarning };
};
