const CACHE_PREFIX = 'life_path_narrative_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: any;
  timestamp: number;
}

export function getCacheKey(
  profileHash: string,
  path: string,
  tenure: number,
  mode: string,
  scenarioId?: string,
  customPrompt?: string
): string {
  const promptSnippet = customPrompt?.slice(0, 50).replace(/\s+/g, '_') || scenarioId || 'default';
  return `${CACHE_PREFIX}${profileHash}_${path}_${tenure}_${mode}_${promptSnippet}`;
}

export function getFromCache(key: string): any | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    const now = Date.now();

    if (now - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export function saveToCache(key: string, data: any): void {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export function removeFromCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Cache remove error:', error);
  }
}

// Simple profile hash (not cryptographic, just for cache key uniqueness)
export function hashProfile(profile: any): string {
  const str = JSON.stringify({
    n: profile.name,
    a: profile.age,
    l: profile.location,
    i: profile.industry,
    p: profile.personality,
    r: profile.riskAppetite
  });
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(36);
}
