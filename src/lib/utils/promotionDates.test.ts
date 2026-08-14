import {
  isSameDayAsToday,
  formatShortDate,
  formatFullDate,
  getExpiryLabel,
} from "./promotionDates";

describe("isSameDayAsToday", () => {
  it("returns true for the current date", () => {
    expect(isSameDayAsToday(new Date())).toBe(true);
  });

  it("returns false for a date in the past", () => {
    expect(isSameDayAsToday(new Date("2020-01-01"))).toBe(false);
  });
});

describe("formatShortDate", () => {
  it("formats as 'ddd D MMMM YYYY'", () => {
    expect(formatShortDate(new Date(2026, 7, 12))).toBe("Wed 12 August 2026");
  });
});

describe("formatFullDate", () => {
  it("formats as 'dddd D MMMM YYYY'", () => {
    expect(formatFullDate(new Date(2026, 7, 12))).toBe(
      "Wednesday 12 August 2026",
    );
  });
});

describe("getExpiryLabel", () => {
  it("returns 'Unknown' when ends is null", () => {
    expect(getExpiryLabel(null)).toBe("Unknown");
  });

  it("returns the last-chance label when ends is today", () => {
    expect(getExpiryLabel(new Date())).toBe("Last Chance! Ends Today!");
  });

  it("returns a formatted expiry label for a future date", () => {
    expect(getExpiryLabel(new Date(2026, 7, 12))).toBe(
      "Expires: Wed 12 August 2026",
    );
  });
});
