import { TECH_STACK } from "@/constants";

describe("TECH_STACK", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(TECH_STACK)).toBe(true);
    expect(TECH_STACK.length).toBeGreaterThan(0);
  });

  it("contains expected categories", () => {
    const ids = TECH_STACK.map((c) => c.id);
    expect(ids).toContain("languages");
    expect(ids).toContain("webdev");
    expect(ids).toContain("databases");
    expect(ids).toContain("ml");
    expect(ids).toContain("devops");
  });

  it("has valid structure for every entry", () => {
    TECH_STACK.forEach((category) => {
      expect(typeof category.id).toBe("string");
      expect(typeof category.label).toBe("string");
      expect(typeof category.command).toBe("string");
      expect(typeof category.accentColor).toBe("string");
      expect(Array.isArray(category.skills)).toBe(true);
      expect(category.skills.length).toBeGreaterThan(0);
    });
  });

  it("has unique ids", () => {
    const ids = TECH_STACK.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has valid hex accent colors", () => {
    TECH_STACK.forEach((category) => {
      expect(category.accentColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("has no duplicate skills within a category", () => {
    TECH_STACK.forEach((category) => {
      expect(new Set(category.skills).size).toBe(category.skills.length);
    });
  });

  it("contains specific skills", () => {
    const allSkills = TECH_STACK.flatMap((c) => c.skills);
    ["Python", "TensorFlow", "Git", "AWS", "Flutter", "MySQL"].forEach((skill) => {
      expect(allSkills).toContain(skill);
    });
  });
});
