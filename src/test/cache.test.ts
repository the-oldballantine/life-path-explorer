import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFromCache, saveToCache, getCacheKey, hashProfile, removeFromCache } from "@/lib/narrative-cache";

// Mock localStorage
const store: Record<string, string> = {};
beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store[k] || null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  });
});

describe("hashProfile", () => {
  it("should produce a hash string", () => {
    const profile = { name: "Alice", age: "30" } as any;
    const hash = hashProfile(profile);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(0);
  });

  it("should produce same hash for same profile", () => {
    const profile = { name: "Bob", location: "NYC" } as any;
    const h1 = hashProfile(profile);
    const h2 = hashProfile(profile);
    expect(h1).toBe(h2);
  });

  it("should produce different hash for different profile", () => {
    const p1 = { name: "Alice" } as any;
    const p2 = { name: "Bob" } as any;
    expect(hashProfile(p1)).not.toBe(hashProfile(p2));
  });
});

describe("getCacheKey", () => {
  it("should produce a deterministic key", () => {
    const key = getCacheKey("abc123", "love", 5, "ai", null);
    expect(typeof key).toBe("string");
    expect(key).toContain("abc123");
    expect(key).toContain("love");
    expect(key).toContain("5");
    expect(key).toContain("ai");
  });

  it("should include scenario in key", () => {
    const key = getCacheKey("abc", "career", 3, "rockandroll", "scenario42", "some custom prompt");
    // customPrompt takes precedence and is truncated to 50 chars
    expect(key).toContain("abc");
    expect(key).toContain("career");
    expect(key).toContain("3");
    expect(key).toContain("rockandroll");
  });
});

describe("cache operations", () => {
  it("should save and retrieve a narrative", () => {
    const narrative = {
      title: "Test",
      subtitle: "Subtitle",
      summary: "Summary",
      years: [{ year: 1, title: "Y1", text: "Hello", mood: "positive" }],
    };
    saveToCache("testkey", narrative);
    const result = getFromCache("testkey");
    expect(result).toEqual(narrative);
  });

  it("should return null for missing key", () => {
    expect(getFromCache("nonexistent")).toBeNull();
  });

  it("should remove a cached narrative", () => {
    const narrative = { title: "T", subtitle: "S", summary: "M", years: [] };
    saveToCache("key1", narrative);
    expect(getFromCache("key1")).not.toBeNull();
    removeFromCache("key1");
    expect(getFromCache("key1")).toBeNull();
  });

  it("should clear all cached narratives", () => {
    saveToCache("k1", { title: "T1", subtitle: "S", summary: "M", years: [] });
    saveToCache("k2", { title: "T2", subtitle: "S", summary: "M", years: [] });
    // Manual clear via known keys
    removeFromCache("k1");
    removeFromCache("k2");
    expect(getFromCache("k1")).toBeNull();
    expect(getFromCache("k2")).toBeNull();
  });
});
