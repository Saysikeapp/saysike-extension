"use client";

import { createContext, useContext } from "react";
import { TFormContextExtended } from "./Form.types";

export const FormContextExtended = createContext<TFormContextExtended | null>(
  null,
);
export const useFormContextExtended = (): TFormContextExtended | null =>
  useContext(FormContextExtended);
