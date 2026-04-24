import { describe, it, expect } from "vitest";
import {
  personalizeSimulationData,
  createCustomIntro,
  getPersonalizationProfile,
} from "@/lib/personalization";
import { SimulationData } from "@/data/simulations";

describe("personalizeSimulationData", () => {
  const baseNarrative: SimulationData = {
    title: "{name}'s Journey",
    subtitle: "A story in {location}",
    summary: "{name} is a {personality} person from {location}",
    years: [
      { year: 1, title: "Beginning", text: "{name} discovers {industry}", mood: "positive" },
      { year: 2, title: "Growth", text: "{name} grows in {career}", mood: "transformative" },
    ],
  };

  it("should replace profile tokens in all fields", () => {
    const result = personalizeSimulationData(baseNarrative, {
      profile: {
        name: "Alice",
        location: "Boston",
        industry: "Tech",
        workStatus: "Engineer",
        personality: "Creative",
        hobbies: "Music",
        riskAppetite: "High",
      } as any,
    });

    expect(result.title).toContain("Alice");
    expect(result.subtitle).toContain("Boston");
    expect(result.summary).toContain("Creative");
    expect(result.years[0].text).toContain("Tech");
    expect(result.years[1].text).toContain("Engineer");
  });

  it("should add custom prompt intro to summary", () => {
    const result = personalizeSimulationData(baseNarrative, {
      profile: { name: "Bob" } as any,
      customPrompt: "become a millionaire through real estate",
    });

    expect(result.summary).toContain("become a millionaire through real estate");
  });

  it("should weave custom prompt into year 3 text", () => {
    const narrativeWithYears = {
      ...baseNarrative,
      years: [
        { year: 1, title: "Y1", text: "start", mood: "neutral" },
        { year: 2, title: "Y2", text: "grow", mood: "positive" },
        { year: 3, title: "Y3", text: "test", mood: "challenging" },
        { year: 4, title: "Y4", text: "struggle", mood: "challenging" },
      ],
    };

    const result = personalizeSimulationData(narrativeWithYears, {
      profile: { name: "Charlie" } as any,
      customPrompt: "build a startup",
    });

    expect(result.years[3].text).toContain("build a startup");
  });

  it("should preserve original mood values", () => {
    const result = personalizeSimulationData(baseNarrative, {
      profile: { name: "Dave" } as any,
    });

    expect(result.years[0].mood).toBe("positive");
    expect(result.years[1].mood).toBe("transformative");
  });
});

describe("createCustomIntro", () => {
  it("should return an intro string for year 1", () => {
    const intro = createCustomIntro(1, "start a bakery");
    expect(typeof intro).toBe("string");
    expect(intro.length).toBeGreaterThan(0);
  });

  it("should return an intro string for year 2", () => {
    const intro = createCustomIntro(2, "start a bakery");
    expect(typeof intro).toBe("string");
    expect(intro).toContain("start a bakery");
  });

  it("should return an intro string for year 3", () => {
    const intro = createCustomIntro(3, "start a bakery");
    expect(typeof intro).toBe("string");
    expect(intro).toContain("start a bakery");
  });

  it("should return empty string for year 0", () => {
    const intro = createCustomIntro(0, "start a bakery");
    expect(intro).toBe("");
  });

  it("should return empty string for year > 3", () => {
    const intro = createCustomIntro(10, "start a bakery");
    expect(intro).toBe("");
  });
});

describe("getPersonalizationProfile", () => {
  it("should return token map from profile", () => {
    const profile = {
      name: "Eve",
      age: "30",
      location: "NYC",
      industry: "Finance",
      workStatus: "Analyst",
      hobbies: "Running",
      personality: "Driven",
      riskAppetite: "Aggressive",
    } as any;

    const result = getPersonalizationProfile(profile);

    expect(result.name).toBe("Eve");
    expect(result.age).toBe("30");
    expect(result.industry).toBe("Finance");
    expect(result.career).toBe("Analyst");
    expect(result.hobbies).toBe("Running");
    expect(result.risk).toBe("Aggressive");
  });

  it("should use fallback values for empty fields", () => {
    const profile = {} as any;
    const result = getPersonalizationProfile(profile);

    expect(result.name).toBe("they");
    expect(result.age).toBe("their age");
    expect(result.industry).toBe("their field");
    expect(result.career).toBe("their career");
  });
});
