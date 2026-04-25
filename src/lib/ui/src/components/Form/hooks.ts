"use client";

import { z } from "zod";
import {
  useForm as useReactHookForm,
  UseFormProps,
  UseFormReturn,
  Resolver,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EnsureFieldValues<T> = T extends FieldValues ? T : never;

type FormValues<S extends z.ZodType> = EnsureFieldValues<z.input<S>>;

export type TUseFormReturn<S extends z.ZodType> = {
  fieldProps: <
    const T extends Parameters<UseFormReturn<FormValues<S>>["register"]>[0],
  >(
    name: T,
  ) => {
    name: typeof name;
  };
} & UseFormReturn<FormValues<S>>;

export const useForm = <S extends z.ZodType>(
  props: Exclude<UseFormProps<FormValues<S>>, "resolver"> & {
    schema: S;
  },
): TUseFormReturn<S> => {
  const { schema, ...formProps } = props;

  type TValues = FormValues<S>;

  // Avoid resolver overload issues by typing the resolver factory instead of the schema.
  const makeResolver = zodResolver as unknown as (
    schema: S,
  ) => Resolver<TValues>;
  const resolver = makeResolver(schema);

  const form = useReactHookForm<TValues>({
    ...formProps,
    resolver,
  });

  const fieldProps: TUseFormReturn<S>["fieldProps"] = (name) => {
    return { name };
  };

  return {
    ...form,
    fieldProps,
  };
};
