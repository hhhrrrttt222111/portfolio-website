import { getCurrentYear } from "@/utils/date";

describe("getCurrentYear", () => {
  it("returns the current year as a number", () => {
    const result = getCurrentYear();
    const expected = new Date().getFullYear();
    expect(result).toBe(expected);
  });

  it("returns a four-digit number", () => {
    const result = getCurrentYear();
    expect(result).toBeGreaterThanOrEqual(2020);
    expect(result).toBeLessThanOrEqual(2100);
  });
});
