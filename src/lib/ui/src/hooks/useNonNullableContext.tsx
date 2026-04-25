import { assertNonNullable } from "@saysike/utils";
import { useContext, Context } from "react";

export const useNonNullableContext = <T,>(ctx: Context<T | null>) => {
  return assertNonNullable(
    useContext(ctx),
    `Failed to find ${ctx.displayName} context. Please wrap your code with the proper provider.`,
  );
};
