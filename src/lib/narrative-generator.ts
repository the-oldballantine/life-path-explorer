import { UserProfile, LifePath, SimulationTenure, ScenarioOption, SimulationMode, SimulationData } from "@/types/profile";
import { generateWithGemini } from "./gemini-service";
import { getFromCache, saveToCache, getCacheKey, hashProfile, removeFromCache } from "./narrative-cache";

export interface GenerationParams {
  profile: UserProfile;
  path: LifePath;
  tenure: SimulationTenure;
  scenario: ScenarioOption | null;
  mode: SimulationMode;
  customPrompt?: string;
  bypassCache?: boolean;
}

const GEMINI_API_KEY = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : undefined;

export async function getOrGenerateNarrative(params: GenerationParams): Promise<SimulationData> {
  const {
    profile,
    path,
    tenure,
    scenario,
    mode,
    customPrompt,
    bypassCache = false
  } = params;

  const profileHash = hashProfile(profile);
  const scenarioId = scenario?.id;
  const cacheKey = getCacheKey(profileHash, path, tenure, mode, scenarioId, customPrompt);

  // Always generate fresh AI narratives
  if (!bypassCache) {
    const cached = getFromCache(cacheKey);
    if (cached && isValidNarrative(cached)) {
      console.log('Using cached narrative');
      return cached;
    } else if (cached) {
      console.warn('Invalid cache entry found, removing...');
      removeFromCache(cacheKey);
    }
  }

  // Generate with Gemini AI if key is set, otherwise show error
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in your environment. Get a free key at https://ai.google.dev');
  }

  try {
    console.log('Generating AI narrative with Gemini...');
    const result = await generateWithGemini(GEMINI_API_KEY, profile, path, tenure, scenario, mode, customPrompt);

    // Cache the result
    if (!bypassCache) {
      saveToCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error('Gemini narrative generation failed:', error);
    throw error;
  }
}

function isValidNarrative(data: any): data is SimulationData {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.title !== 'string') return false;
  if (typeof data.subtitle !== 'string') return false;
  if (typeof data.summary !== 'string') return false;
  if (!Array.isArray(data.years)) return false;
  if (data.years.length === 0) return false;
  const validMoods = ['positive', 'neutral', 'challenging', 'transformative'];
  for (const year of data.years) {
    if (typeof year.year !== 'number') return false;
    if (typeof year.title !== 'string') return false;
    if (typeof year.text !== 'string') return false;
    if (!validMoods.includes(year.mood)) return false;
  }
  return true;
}
