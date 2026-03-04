import { BLOG_POSTS } from "@/constants";

describe("BLOG_POSTS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(BLOG_POSTS)).toBe(true);
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
  });

  it("has at least 4 blog posts", () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(4);
  });

  it("has valid structure for every entry", () => {
    BLOG_POSTS.forEach((post) => {
      expect(typeof post.id).toBe("number");
      expect(typeof post.title).toBe("string");
      expect(typeof post.date).toBe("string");
      expect(typeof post.url).toBe("string");
      expect(typeof post.tag).toBe("string");
    });
  });

  it("has unique ids", () => {
    const ids = BLOG_POSTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has valid URLs", () => {
    BLOG_POSTS.forEach((post) => {
      expect(post.url).toMatch(/^https?:\/\//);
    });
  });

  it("has non-empty titles and tags", () => {
    BLOG_POSTS.forEach((post) => {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.tag.length).toBeGreaterThan(0);
    });
  });
});
