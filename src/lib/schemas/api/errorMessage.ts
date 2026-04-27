import { z } from "zod";

export const ErrorMessageResponseSchema = z.object({
  error: z.string(),
});
export type ErrorMessageResponseSchema = z.infer<
  typeof ErrorMessageResponseSchema
>;
