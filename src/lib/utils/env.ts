import { assertNonNullable } from "./assert";
import { EnvironmentVariables } from "@/types/env.types";

// Prefer using one of these utils when accessing environment variables instead of directly using
// import.meta.env to get better type safety and error handling.

/**
 * Use for optional environment variables
 * @param name - The name of the environment variable to retrieve
 * @returns The value of the environment variable, or undefined
 */
export const env = (name: keyof EnvironmentVariables): string | undefined => {
  const value = Object.prototype.hasOwnProperty.call(import.meta.env, name)
    ? (import.meta.env[name as string] as string | undefined)
    : undefined;
  return value;
};

/**
 * Use for mandatory environment variables. Will throw if the variable is not found.
 * @param name - The name of the environment variable to assert
 * @returns The value of the environment variable
 */
export const assertEnv = (name: keyof EnvironmentVariables): string => {
  return assertNonNullable(
    env(name),
    `[assertEnv] ${String(name)} environment variable was not found.`,
  );
};
