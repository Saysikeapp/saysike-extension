import dayjs from "dayjs";

export const isSameDayAsToday = (date: Date): boolean => {
  const today = new Date();
  const target = new Date(date);

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
};

export const formatShortDate = (date: Date): string =>
  dayjs(date).format("ddd D MMMM YYYY");

export const formatFullDate = (date: Date): string =>
  dayjs(date).format("dddd D MMMM YYYY");

export const getExpiryLabel = (ends: Date | null): string => {
  if (!ends) return "Unknown";

  return isSameDayAsToday(ends)
    ? "Last Chance! Ends Today!"
    : `Expires: ${formatShortDate(ends)}`;
};
