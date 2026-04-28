"use client";

import type {
  FieldError,
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldPath,
  FieldValues,
} from "react-hook-form";

// Small alternative to lodash/get (supports "a.b.c" and "a[0].b" paths)
const getByPath = (obj: unknown, path: string): unknown => {
  if (obj == null) return undefined;

  // convert brackets to dots: a[0].b -> a.0.b
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let cur: unknown = obj;
  for (const key of parts) {
    if (cur == null) return undefined;
    if (typeof cur !== "object") return undefined;
    if (!Object.prototype.hasOwnProperty.call(cur, key)) return undefined;
    const descriptor = Object.getOwnPropertyDescriptor(cur, key);
    cur = descriptor && descriptor.enumerable ? descriptor.value : undefined;
  }

  return cur;
};

/**
 * Retrieve an error within `react-hook-form` `errors` object by a field path.
 * Mirrors the behavior of @hookform/error-message's internal getter.
 * @see: https://github.com/react-hook-form/error-message/blob/master/src/ErrorMessage.tsx
 */
export const getError = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  errors: FieldErrors<TFieldValues>,
  name: TName,
): FieldError | undefined => {
  return getByPath(errors, name) as FieldError | undefined;
};

/**
 * Retrieve whether a field path is touched.
 * Note: touchedFields/dirtyFields are boolean "marks" at the leaves, so the return type is boolean.
 */
export const getTouchedField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>,
  name: TName,
): boolean | undefined => {
  return getByPath(touchedFields, name) as boolean | undefined;
};

export const getDirtyField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>,
  name: TName,
): boolean | undefined => {
  return getByPath(dirtyFields, name) as boolean | undefined;
};
