import { ForwardedRef } from "react";

export const setForwardedRef = <T>(ref: ForwardedRef<T>, value: T): void => {
  if (ref === null) {
    return;
  }

  if (ref instanceof Function) {
    ref(value);
    return;
  }

  ref.current = value;
};
