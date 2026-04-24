import { UserProfile, LifePath, SimulationTenure, ScenarioOption, SimulationMode } from "@/types/profile";
import { YearEvent } from "@/data/simulations";

export interface NarrativeResult {
  title: string;
  subtitle: string;
  summary: string;
  years: YearEvent[];
  generatedAt: number;
  mode: SimulationMode;
  source: 'ai' | 'static';
}

function getApiKey(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_CLAUDE_API_KEY;
  }
  return undefined;
}

function buildProfileContext(profile: UserProfile): string {
  const parts: string[] = [];

  if (profile.name) parts.push(`Name: ${profile.name}`);
  if (profile.age) parts.push(`Age: ${profile.age}`);
  if (profile.gender) parts.push(`Gender: ${profile.gender}`);
  if (profile.location) parts.push(`Location: ${profile.location}`);
  if (profile.schooling) parts.push(`Education: ${profile.schooling}${profile.college ? `, ${profile.college}` : ''}${profile.degree ? ` (${profile.degree})` : ''}`);
  if (profile.workStatus) parts.push(`Work Status: ${profile.workStatus}`);
  if (profile.industry) parts.push(`Industry: ${profile.industry}`);
  if (profile.yearsExperience) parts.push(`Years Experience: ${profile.yearsExperience}`);
  if (profile.familyStructure) parts.push(`Family: ${profile.familyStructure}`);
  if (profile.financialCondition) parts.push(`Financial Background: ${profile.financialCondition}`);
  if (profile.personality) parts.push(`Personality: ${profile.personality}`);
  if (profile.riskAppetite) parts.push(`Risk Tolerance: ${profile.riskAppetite}`);
  if (profile.decisionStyle) parts.push(`Decision Style: ${profile.decisionStyle}`);
  if (profile.discipline) parts.push(`Discipline: ${profile.discipline}`);
  if (profile.interests) parts.push(`Interests: ${profile.interests}`);
  if (profile.hobbies) parts.push(`Hobbies: ${profile.hobbies}`);
  if (profile.relationshipStatus) parts.push(`Relationship Status: ${profile.relationshipStatus}`);
  if (profile.lifeGoals) parts.push(`Life Goals: ${profile.lifeGoals}`);
  if (profile.currentChallenges) parts.push(`Challenges: ${profile.currentChallenges}`);

  return parts.join('\n');
}

function buildSystemPrompt(path: LifePath, tenure: SimulationTenure, profileContext: string, scenario?: ScenarioOption | null, customPrompt?: string): string {
  const isRockAndRoll = !!customPrompt;

  const pathContext: Record<LifePath, string> = {
    love: "Focus on relationships, emotional growth, connections, intimacy, and the evolution of their love life.",
    career: "Focus on professional journey, promotions, job changes, entrepreneurship, challenges, and career identity.",
    financial: "Focus on wealth building, investments, financial decisions, income growth, security, and money mindset.",
    personal: "Focus on self-discovery, health, personal milestones, habits, mindset, and overall life satisfaction.",
    alternate: "Explore a completely different life path — what if they made opposite choices? Show how their life diverges dramatically."
  };

  let mainInstruction = '';
  let scenarioDetails = '';

  if (isRockAndRoll && customPrompt) {
    // Rock & Roll mode: custom prompt overrides path
    mainInstruction = `CRITICAL: The user has provided a custom scenario. Your entire narrative MUST follow this scenario exactly, regardless of the selected "${path}" path. Do NOT default to typical ${path} themes (e.g., ${path === 'love' ? 'relationships' : path === 'career' ? 'career' : path === 'financial' ? 'money' : path === 'personal' ? 'personal growth' : 'alternate life'}). Instead, base the story SOLELY on the custom scenario provided.`;
    scenarioDetails = `\nCUSTOM SCENARIO (This is the ENTIRE premise - follow it religiously):\n${customPrompt}\n\nWrite a ${tenure}-year story exploring this exact scenario. The premise might involve unusual concepts (rebirth, supernatural powers, time travel, etc.) — treat it as real and write it with conviction.`;
  } else if (scenario) {
    mainInstruction = `Focus on the ${path} life dimension.`;
    scenarioDetails = `\nSpecific Scenario: ${scenario.title}\nTwist/Challenge to incorporate: ${scenario.twist}\nWeave this twist naturally into the narrative, making it a pivotal moment (around year 2-6) with lasting consequences.`;
  } else {
    mainInstruction = `Focus on the ${path} life dimension.`;
    scenarioDetails = '';
  }

  return `You are a master storyteller writing a deeply personal, decade-spanning life simulation. Your style is literary, emotionally resonant, and psychologically insightful — like a novel by a contemporary literary fiction author.

### USER PROFILE CONTEXT ###
${profileContext}

### STORY INSTRUCTIONS ###
${mainInstruction}
${scenarioDetails}

### NARRATIVE REQUIREMENTS ###
1. Write exactly ${tenure} years (year 1 through year ${tenure}).
2. Each year must be a self-contained chapter with:
   - Title (3-6 words, evocative)
   - Narrative (3-4 sentences, specific to this person's actual details from their profile)
   - Mood: choose from "positive", "neutral", "challenging", or "transformative"
3. The story must have an arc — show character development, cause & effect, and evolving circumstances across all years.
4. Incorporate profile details naturally: their name, location, career field, hobbies, personality, risk appetite, etc. Weave these into the story, don't just list them.
5. Avoid clichés and generic advice. Make it feel like a real, messy, nuanced life.
6. The tone should be compassionate but honest — show both ups and downs.
7. If the custom scenario includes unusual elements (like dying and being reborn with memories), write them as if they're genuinely happening. Don't rationalize or soften the premise.

### IMPORTANT ###
- Use the user's actual name frequently
- Reference their actual location, career field, hobbies
- Show their personality traits and risk appetite in decisions
- Make this story uniquely THEIRS
- ${isRockAndRoll ? '**The custom scenario is the foundation. Build everything on it.**' : ''}

### OUTPUT FORMAT ###
Return strictly this JSON:
{
  "title": "Compelling title",
  "subtitle": "Brief descriptive subtitle",
  "summary": "2-3 sentence overview of the entire ${tenure}-year journey",
  "years": [
    { "year": 1, "title": "Chapter title", "text": "Narrative (3-4 sentences)", "mood": "neutral" },
    ... (${tenure} total)
  ]
}

Remember: This is a STORY, not a prediction. Write it as a novel about this real person, based on their profile and the scenario.`;
}

async function callClaudeAPI(prompt: string): Promise<any> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "Claude API key not configured. Please set VITE_CLAUDE_API_KEY in your environment variables.\n" +
      "Get your API key from: https://console.anthropic.com/"
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307", // or claude-3-opus for higher quality
      max_tokens: 4000,
      temperature: 0.7,
      system: "You are a creative writing assistant specializing in personalized life narratives. Always output valid JSON without extra commentary.",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data;
}

function extractJSONFromResponse(content: string): any {
  try {
    // Claude might wrap JSON in markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    // Or it might be plain JSON
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse Claude response as JSON:", error);
    console.error("Raw content:", content);
    throw new Error("AI returned invalid format. Please try again.");
  }
}

export async function generateNarrative(
  profile: UserProfile,
  path: LifePath,
  tenure: SimulationTenure,
  scenario: ScenarioOption | null,
  mode: SimulationMode,
  customPrompt?: string
): Promise<NarrativeResult> {
  const profileContext = buildProfileContext(profile);
  const systemPrompt = buildSystemPrompt(path, tenure, profileContext, scenario, customPrompt);

  const userPrompt = `Generate the ${tenure}-year ${path} simulation now. Output ONLY the JSON.`;

  try {
    const response = await callClaudeAPI(systemPrompt + "\n\n" + userPrompt);
    const content = response.content?.[0]?.text || response.content;

    if (!content) {
      throw new Error("No content in Claude response");
    }

    const narrativeData = extractJSONFromResponse(content);

    // Validate structure
    if (!narrativeData.years || !Array.isArray(narrativeData.years)) {
      throw new Error("Invalid narrative structure: missing years array");
    }

    // Ensure we have exactly tenure years
    if (narrativeData.years.length !== tenure) {
      // Trim or pad as needed
      narrativeData.years = narrativeData.years.slice(0, tenure);
      while (narrativeData.years.length < tenure) {
        const last = narrativeData.years[narrativeData.years.length - 1] || { year: narrativeData.years.length, title: "Continuing", text: "Life continues.", mood: "neutral" as const };
        narrativeData.years.push({
          ...last,
          year: narrativeData.years.length + 1,
        });
      }
    }

    // Validate mood values
    const validMoods = ["positive", "neutral", "challenging", "transformative"];
    narrativeData.years = narrativeData.years.map((y: any) => ({
      ...y,
      mood: validMoods.includes(y.mood) ? y.mood : "neutral"
    }));

    return {
      title: narrativeData.title || `${path} Simulation`,
      subtitle: narrativeData.subtitle || "Your personalized journey",
      summary: narrativeData.summary || "A story of growth and change.",
      years: narrativeData.years,
      generatedAt: Date.now(),
      mode,
      source: 'ai'
    };

  } catch (error) {
    console.error("Narrative generation failed:", error);
    throw error;
  }
}
