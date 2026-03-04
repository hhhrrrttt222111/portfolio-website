import { SOCIAL_LINKS } from "@/constants";

describe("SOCIAL_LINKS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(SOCIAL_LINKS)).toBe(true);
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
  });

  it("contains required social platforms", () => {
    const names = SOCIAL_LINKS.map((link) => link.name);
    expect(names).toContain("GitHub");
    expect(names).toContain("LinkedIn");
    expect(names).toContain("Twitter");
    expect(names).toContain("Goodreads");
  });

  it("has valid structure for every entry", () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(link).toHaveProperty("name");
      expect(link).toHaveProperty("url");
      expect(link).toHaveProperty("Icon");
      expect(typeof link.name).toBe("string");
      expect(typeof link.url).toBe("string");
      expect(typeof link.Icon).toBe("object");
    });
  });

  it("has valid URLs for every entry", () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(link.url).toMatch(/^https?:\/\//);
    });
  });

  it("has unique names", () => {
    const names = SOCIAL_LINKS.map((link) => link.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has unique URLs", () => {
    const urls = SOCIAL_LINKS.map((link) => link.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
