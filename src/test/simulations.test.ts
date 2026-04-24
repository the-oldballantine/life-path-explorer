import { describe, it, expect } from "vitest";
import { simulations } from "@/data/simulations";

// Valid mood values
const VALID_MOODS = ["positive", "neutral", "challenging", "transformative"];
const EXPECTED_PATHS = ["love", "career", "financial", "personal", "alternate"];
const EXPECTED_YEARS = 10;

describe("simulations data structure", () => {
  it("should have all expected path simulations", () => {
    for (const path of EXPECTED_PATHS) {
      const sim = simulations[path as keyof typeof simulations];
      expect(sim).toBeDefined();
      expect(typeof sim.title).toBe("string");
      expect(typeof sim.subtitle).toBe("string");
      expect(typeof sim.summary).toBe("string");
      expect(Array.isArray(sim.years)).toBe(true);
    }
  });

  it("should have 10 year entries for each path", () => {
    for (const path of EXPECTED_PATHS) {
      const sim = simulations[path as keyof typeof simulations];
      expect(sim.years.length).toEqual(EXPECTED_YEARS);
    }
  });

  it("should have correct year numbering (1-10)", () => {
    for (const path of EXPECTED_PATHS) {
      const sim = simulations[path as keyof typeof simulations];
      for (let i = 0; i < sim.years.length; i++) {
        expect(sim.years[i].year).toBe(i + 1);
      }
    }
  });

  it("should have all required fields on each year event", () => {
    for (const path of EXPECTED_PATHS) {
      const sim = simulations[path as keyof typeof simulations];
      for (let i = 0; i < sim.years.length; i++) {
        const year = sim.years[i];
        expect(typeof year.title).toBe("string");
        expect(typeof year.text).toBe("string");
        expect(typeof year.mood).toBe("string");
        expect(year.text.length).toBeGreaterThan(10);
      }
    }
  });

  it("should have valid mood values", () => {
    for (const path of EXPECTED_PATHS) {
      const sim = simulations[path as keyof typeof simulations];
      for (const year of sim.years) {
        expect(VALID_MOODS).toContain(year.mood);
      }
    }
  });
});
