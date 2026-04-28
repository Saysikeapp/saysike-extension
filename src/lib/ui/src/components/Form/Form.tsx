"use client";

import { FieldValues, FormProvider } from "react-hook-form";
import { TForm } from "./Form.types";
import { FormContextExtended } from "./FormContextExtended";

export const Form = <T extends FieldValues>({
  children,
  form,
  onSubmit,
  className,
  formContextProps,
}: TForm<T>): React.ReactElement => {
  return (
    <FormContextExtended.Provider value={formContextProps ?? null}>
      <FormProvider {...form}>
        <form
          className={className}
          onSubmit={(e) => {
            // @todo: see: https://github.com/orgs/react-hook-form/discussions/3704
            e.stopPropagation();
            void form.handleSubmit(onSubmit)(e);
          }}
        >
          {children}
        </form>
      </FormProvider>
    </FormContextExtended.Provider>
  );
};
