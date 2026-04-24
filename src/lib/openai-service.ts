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
    return import.meta.env.VITE_OPENAI_API_KEY;
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

function buildSystemPrompt(path: LifePath, tenure: SimulationTenure, profileContext: string, profileName: string, scenario?: ScenarioOption | null, customPrompt?: string): string {
  const isCustom = !!customPrompt;

  // Scenario section
  let scenarioSection = '';
  if (isCustom) {
    scenarioSection = `
**CUSTOM SCENARIO** (this defines the entire story):
${customPrompt}

Important: This scenario is the premise. Write the story as if this is the protagonist's actual life, even if it involves unusual elements like rebirth, supernatural powers, time travel, etc. Do not treat it as hypothetical. It's real for them.`;
  } else {
    const twist = scenario
      ? `\n**SCENARIO TWIST**: "${scenario.title}" — ${scenario.twist}\nThis twist should appear around years 2-6 and have lasting ripple effects.`
      : '';
    scenarioSection = `
**LIFE PATH**: ${path.toUpperCase()}
Focus on this dimension of their life.${twist}`;
  }

  // Prompt template
  return `You are an award-winning novelist crafting deeply personal, psychologically rich life narratives. Your prose is vivid, immersive, and emotionally powerful - never boring. Style: contemporary literary fiction with emotional depth (like Sally Rooney or Jesmyn Ward) or surreal depth (like Haruki Murakami) as appropriate.

## Profile
${profileContext}

## Instructions
${scenarioSection}

## Story Requirements
- Write exactly ${tenure} years (year 1 through year ${tenure}).
- Each year must include:
  * Title: 3-6 words, evocative, specific
  * Text: 4-6 sentences of vivid narrative with sensory details, emotions, concrete actions, and references to the protagonist's actual life (use their real name, city, job, hobbies, personality). Show, don't tell.
  * Mood: "positive", "neutral", "challenging", or "transformative" - chosen based on the content.
- Show clear character development and cause-effect across years. Early decisions matter later.
- If custom scenario includes unusual concepts (rebirth, magic, etc.), treat them as ordinary reality. Show how the protagonist lives with them practically and emotionally.
- Avoid clichés and generic statements. Every sentence should feel authentic to this specific person, scenario, and moment.
- Balance: even good times have small shadows; hard times have grace notes.
- Use present tense or immediate past tense. Include specific details: place names, brands, physical sensations, real emotions.

## Example
Bad: "She was sad after the breakup and worked a lot."
Good: "Priya stared at the empty spot on her bedroom wall where Rohan's photo used to be. The silence in her Mumbai apartment pressed against her ears. She buried herself in client projects at the startup, often coding until 2 AM, but the machines couldn't fill the hollow space. Then in October, during a team lunch, she laughed - really laughed - for the first time in months."

## Narrative Arc
Year 1: Establish the new normal, introduce environment and central tension.
Year 2: Complications emerge, initial tests.
Years 3-4: Deepening choices, obstacles, growth, relationship evolution.
Year 5: Major turning point.
Years 6-7: Consequences, rebuilding.
Year 8: New equilibrium begins.
Year 9: Stakes rise or deeper understanding.
Year 10: Culmination, reflection, transformed self.

## Output
Return ONLY this JSON structure, nothing else:

{
  "title": "Compelling Title",
  "subtitle": "Brief subtitle",
  "summary": "2-3 sentence overview of the whole journey",
  "years": [
    { "year": 1, "title": "Year 1 Title", "text": "4-6 sentences of specific narrative", "mood": "neutral" },
    ... (total ${tenure} years)
  ]
}

Now generate:
- For: ${profileName}
- Premise: ${customPrompt || scenario?.title || path}
- Years: ${tenure}
`;
}

async function callOpenAIAPI(prompt: string): Promise<any> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.\n" +
      "Get your API key from: https://platform.openai.com/api-keys"
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 4000,
      temperature: 0.8,
      messages: [
        { role: "system", content: "You are a literary fiction writer. Always output valid JSON without extra commentary or markdown." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  return await response.json();
}

function extractJSONFromResponse(content: string): any {
  try {
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    const objMatch = content.match(/\{[\s\S]*\}/);
    if (objMatch) {
      return JSON.parse(objMatch[0]);
    }
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse OpenAI response as JSON:", error);
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
  const systemPrompt = buildSystemPrompt(path, tenure, profileContext, profile.name || 'the protagonist', scenario, customPrompt);

  const userPrompt = `Now generate the complete ${tenure}-year narrative as JSON. Ensure each year has 4-6 sentence narratives with vivid, specific details. Make it compelling and never boring. Include exactly ${tenure} years.`;

  try {
    const response = await callOpenAIAPI(systemPrompt + "\n\n" + userPrompt);
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    const narrativeData = extractJSONFromResponse(content);

    if (!narrativeData.years || !Array.isArray(narrativeData.years)) {
      throw new Error("Invalid narrative structure: missing years array");
    }

    if (narrativeData.years.length !== tenure) {
      console.warn(`Expected ${tenure} years but got ${narrativeData.years.length}, trimming/padding...`);
      narrativeData.years = narrativeData.years.slice(0, tenure);
      while (narrativeData.years.length < tenure) {
        const lastIndex = narrativeData.years.length;
        narrativeData.years.push({
          year: lastIndex + 1,
          title: "Continuing the Journey",
          text: "Life continues with its mix of challenges and growth. The protagonist navigates this period with the resilience built from previous years, learning and adapting as they go.",
          mood: "neutral"
        });
      }
    }

    const validMoods = ["positive", "neutral", "challenging", "transformative"];
    narrativeData.years = narrativeData.years.map((y: any) => ({
      ...y,
      mood: validMoods.includes(y.mood) ? y.mood : "neutral",
      year: y.year || (narrativeData.years.indexOf(y) + 1)
    }));

    return {
      title: narrativeData.title || `${path} Simulation`,
      subtitle: narrativeData.subtitle || "A journey of growth and transformation",
      summary: narrativeData.summary || "A story about the protagonist's life over the coming years.",
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
