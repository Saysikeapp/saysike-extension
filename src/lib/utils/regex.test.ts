import { emailRegex, percentInStringRegex, priceOrPercentRegex } from "./regex";

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

describe("priceOrPercentRegex", () => {
  it("matches a currency symbol prefix", () => {
    const matches = "Save £100 today".match(priceOrPercentRegex);
    expect(matches).toEqual(["£100"]);
  });

  it("matches a currency symbol suffix", () => {
    const matches = "Only 50$ left".match(priceOrPercentRegex);
    expect(matches).toEqual(["50$"]);
  });

  it("matches a decimal price", () => {
    const matches = "Was $9.99".match(priceOrPercentRegex);
    expect(matches).toEqual(["$9.99"]);
  });

  it("matches a percentage", () => {
    const matches = "Get 20% off".match(priceOrPercentRegex);
    expect(matches).toEqual(["20%"]);
  });

  it("matches prices and percentages together", () => {
    const matches = "Save £50 or get 10% off".match(priceOrPercentRegex);
    expect(matches).toEqual(["£50", "10%"]);
  });

  it("returns null when no match", () => {
    const matches = "No deals here".match(priceOrPercentRegex);
    expect(matches).toBeNull();
  });

  it("has the global flag set", () => {
    expect(priceOrPercentRegex.global).toBe(true);
  });
});
