import { describe, it, expect, vi, beforeEach } from "vitest";
import { getOrGenerateNarrative } from "@/lib/narrative-generator";
import { simulations } from "@/data/simulations";

// Mock localStorage for cache
const store: Record<string, string> = {};
vi.stubGlobal("localStorage", {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
});

// Mock openai-service (no API key in tests)
vi.mock("@/lib/openai-service", () => ({
  generateNarrative: vi.fn(),
}));

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
});

const baseProfile = {
  name: "TestUser",
  age: "25",
  gender: "Male",
  location: "Seattle",
  industry: "Tech",
  workStatus: "Engineer",
  hobbies: "Gaming",
  personality: "Analytical",
  riskAppetite: "Moderate",
} as any;

describe("getOrGenerateNarrative", () => {
  it("should return a simulation with correct structure for AI mode", async () => {
    const result = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "love",
      tenure: 5,
      scenario: null,
      mode: "ai",
    });

    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("subtitle");
    expect(result).toHaveProperty("summary");
    expect(result).toHaveProperty("years");
    expect(Array.isArray(result.years)).toBe(true);
  });

  it("should return correct number of years based on tenure", async () => {
    const result = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "career",
      tenure: 3,
      scenario: null,
      mode: "ai",
    });

    expect(result.years.length).toBe(3);
  });

  it("should return correct number of years for 10-year tenure", async () => {
    const result = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "career",
      tenure: 10,
      scenario: null,
      mode: "ai",
    });

    expect(result.years.length).toBe(10);
  });

  it("should handle Rock & Roll mode with custom prompt", async () => {
    const result = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "alternate",
      tenure: 3,
      scenario: null,
      mode: "rockandroll",
      customPrompt: "What if I won the lottery?",
    });

    expect(Array.isArray(result.years)).toBe(true);
    expect(result.years.length).toBe(3);
    // Should have the custom prompt woven in
    expect(result.summary.toLowerCase()).toContain("lottery");
  });

  it("should cache AI mode results", async () => {
    const result1 = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "love",
      tenure: 5,
      scenario: null,
      mode: "ai",
    });

    const lsSize = Object.keys(store).length;
    expect(lsSize).toBeGreaterThan(0);

    // Second call should use cache
    const result2 = await getOrGenerateNarrative({
      profile: baseProfile,
      path: "love",
      tenure: 5,
      scenario: null,
      mode: "ai",
    });

    expect(result2).toBe(result1); // Same reference from cache
  });

  it("should bypass cache in rockandroll mode", async () => {
    await getOrGenerateNarrative({
      profile: baseProfile,
      path: "career",
      tenure: 5,
      scenario: null,
      mode: "rockandroll",
      customPrompt: "test prompt",
    });

    // Rock & Roll mode should not cache
    const hasNarrativeKey = Object.keys(store).some((k) => k.includes("career") && k.includes("rockandroll"));
    expect(hasNarrativeKey).toBe(false);
  });
});
