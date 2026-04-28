import { buildUrl } from "./buildUrl";

const MOCK_URL = "http://www.example.com";

describe("buildUrl", () => {
  it("should return original URL when no search params are provided", () => {
    const url = buildUrl(MOCK_URL);
    expect(url.origin + url.pathname).toBe("http://www.example.com/");
    expect(url.searchParams.size).toBe(0);
  });

  it("adds search parameters from object", () => {
    const params = {
      name: "Giuseppe",
      age: 28,
      score: 80,
      roles: ["admin", "user"],
      active: true,
      tags: [],
      status: [null, "open", undefined, "closed"],
    };
    const url = buildUrl(MOCK_URL, params);

    expect(url.origin + url.pathname).toBe("http://www.example.com/");

    expect(url.searchParams.getAll("name")).toStrictEqual(["Giuseppe"]);
    expect(url.searchParams.getAll("age")).toStrictEqual(["28"]);
    expect(url.searchParams.getAll("score")).toStrictEqual(["80"]);
    expect(url.searchParams.getAll("active")).toStrictEqual(["true"]);
    expect(url.searchParams.getAll("roles")).toStrictEqual(["admin", "user"]);
    expect(url.searchParams.getAll("tags")).toStrictEqual([]);
    expect(url.searchParams.getAll("status")).toStrictEqual(["open", "closed"]);

    expect(url.href).toBe(
      "http://www.example.com/?name=Giuseppe&age=28&score=80&roles=admin&roles=user&active=true&status=open&status=closed",
    );

    expect(url.searchParams.size).toBe(8);
  });
});
