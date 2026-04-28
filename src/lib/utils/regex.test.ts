import { emailRegex, percentInStringRegex } from "./regex";

describe("emailRegex", () => {
  it.each([
    "user@example.com",
    "user.name+tag@example.co.uk",
    "user123@domain.org",
    "a@b.io",
  ])("matches valid email: %s", (email) => {
    expect(emailRegex.test(email)).toBe(true);
  });

  it.each([
    "notanemail",
    "missing@domain",
    "@nodomain.com",
    "spaces in@email.com",
    "double@@at.com",
  ])("rejects invalid email: %s", (email) => {
    expect(emailRegex.test(email)).toBe(false);
  });
});

describe("percentInStringRegex", () => {
  it("matches an integer percentage", () => {
    const matches = "Save 15%".match(percentInStringRegex);
    expect(matches).toEqual(["15%"]);
  });

  it("matches 100%", () => {
    const matches = "100% satisfaction".match(percentInStringRegex);
    expect(matches).toEqual(["100%"]);
  });

  it("matches a decimal percentage", () => {
    const matches = "Get 50.5% off".match(percentInStringRegex);
    expect(matches).toEqual(["50.5%"]);
  });

  it("matches multiple percentages in a string", () => {
    const matches = "10% off or 20% cashback".match(percentInStringRegex);
    expect(matches).toEqual(["10%", "20%"]);
  });

  it("returns null when no percentage present", () => {
    const matches = "No discounts here".match(percentInStringRegex);
    expect(matches).toBeNull();
  });

  it("has the global flag set", () => {
    expect(percentInStringRegex.global).toBe(true);
  });
});
