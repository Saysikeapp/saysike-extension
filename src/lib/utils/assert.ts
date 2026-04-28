/**
 * Asserts that a value is not null or undefined. Throws custom error message if the assertion fails.
 * @param value The value to assert exists.
 * @param throwMessage The error message to throw if the assertion fails.
 * @returns The non-nullable value.
 */
export const assertNonNullable = <T>(
  value: T | null | undefined,
  throwMessage: string = "Assertion failed",
): NonNullable<T> => {
  if (value === undefined || value === null || value === "")
    throw new Error(throwMessage);

  return value;
};
