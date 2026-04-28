import { assertNonNullable } from "@/lib/utils";
import { useContext, Context } from "react";

export const useNonNullableContext = <T,>(ctx: Context<T | null>): T => {
  return assertNonNullable(
    useContext(ctx),
    `Failed to find ${ctx.displayName} context. Please wrap your code with the proper provider.`,
  );
};
