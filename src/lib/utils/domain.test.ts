import { filterAndFormatDomain } from "./domain";

describe("filterAndFormatDomain", () => {
  describe("protocol and www stripping", () => {
    it("strips https:// protocol", () => {
      expect(filterAndFormatDomain("https://amazon.com")).toBe("amazon.com");
    });

    it("strips http:// protocol", () => {
      expect(filterAndFormatDomain("http://amazon.com")).toBe("amazon.com");
    });

    it("strips www. prefix", () => {
      expect(filterAndFormatDomain("https://www.amazon.com")).toBe(
        "amazon.com",
      );
    });

    it("strips WWW. prefix (case-insensitive)", () => {
      expect(filterAndFormatDomain("https://WWW.amazon.com")).toBe(
        "amazon.com",
      );
    });

    it("strips trailing slashes", () => {
      expect(filterAndFormatDomain("https://amazon.com/")).toBe("amazon.com");
    });
  });

  describe("ignored sites", () => {
    it.each([
      "https://google.com",
      "https://youtube.com",
      "https://facebook.com",
      "https://twitter.com",
      "https://wikipedia.org",
      "https://instagram.com",
      "https://reddit.com",
      "https://netflix.com",
      "https://chatgpt.com",
    ])("returns empty string for ignored site: %s", (url) => {
      expect(filterAndFormatDomain(url)).toBe("");
    });
  });

  describe("regional paths", () => {
    it("appends GB region identifier for /en path", () => {
      expect(filterAndFormatDomain("https://amazon.com/en/product")).toBe(
        "amazon.com-en",
      );
    });

    it("appends GB region identifier for /uk path", () => {
      expect(filterAndFormatDomain("https://amazon.com/uk/product")).toBe(
        "amazon.com-uk",
      );
    });

    it("appends DE region identifier for /de path", () => {
      expect(filterAndFormatDomain("https://amazon.de/de/shoes")).toBe(
        "amazon.de-de",
      );
    });

    it("appends FR region identifier for /fr path", () => {
      expect(filterAndFormatDomain("https://example.com/fr")).toBe(
        "example.com-fr",
      );
    });

    it("returns only domain when path does not match a region", () => {
      expect(filterAndFormatDomain("https://amazon.com/products/shoes")).toBe(
        "amazon.com",
      );
    });
  });

  describe("edge cases", () => {
    it("returns empty string for an empty string", () => {
      expect(filterAndFormatDomain("")).toBe("");
    });

    it("returns empty string for a chrome-extension URL", () => {
      expect(
        filterAndFormatDomain("chrome-extension://abc123/popup.html"),
      ).toBe("");
    });

    it("returns domain without path for a plain domain", () => {
      expect(filterAndFormatDomain("https://nike.com/trainers")).toBe(
        "nike.com",
      );
    });
  });
});
