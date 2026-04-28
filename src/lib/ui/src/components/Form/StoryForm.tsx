/* eslint-disable no-console */
import { PropsWithChildren, ReactNode } from "react";
import { useForm } from "./hooks";
import { Form } from "./Form";
import { ZodSchema } from "zod";
import { Button } from "../Button/Button";

export const StoryForm = ({
  children,
  schema,
}: PropsWithChildren<unknown> & { schema: ZodSchema }): ReactNode => {
  const form = useForm({
    schema,
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = (): void => {
    console.log(form.getValues());
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col w-60">
      {children}
      <Button className={"mt-4 w-20"} type="submit">
        Submit
      </Button>
    </Form>
  );
};
