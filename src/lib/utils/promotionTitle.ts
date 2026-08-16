export const getDisplayTitle = (
  title: string,
  code: string | null,
  description: string | null,
): string => (title === code && description ? description : title);
