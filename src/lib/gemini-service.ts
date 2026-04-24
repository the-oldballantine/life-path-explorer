import { UserProfile, LifePath, SimulationTenure, ScenarioOption, SimulationMode, SimulationData } from "@/types/profile";

const PATH_DESCRIPTIONS: Record<LifePath, string> = {
  love: "Love & Relationships - how their emotional world, romantic connections, and relationships evolve",
  career: "Career & Professional Growth - their professional journey, skill development, leadership, and impact",
  financial: "Financial Future - their wealth building, investments, spending habits, and financial freedom",
  personal: "Personal Growth - their inner transformation, habits, health, mindset, and self-discovery",
  alternate: "The Road Not Taken - an alternate universe exploring the opposite choices they could have made",
};

function buildPrompt(
  profile: UserProfile,
  path: LifePath,
  tenure: SimulationTenure,
  scenario: ScenarioOption | null,
  mode: SimulationMode,
  customPrompt?: string
): string {
  const profileDetails = [
    profile.name ? `Name: ${profile.name}` : "",
    profile.age ? `Age: ${profile.age}` : "",
    profile.gender ? `Gender: ${profile.gender}` : "",
    profile.location ? `Location: ${profile.location}` : "",
    profile.schooling ? `Schooling: ${profile.schooling}` : "",
    profile.college ? `College: ${profile.college}` : "",
    profile.degree ? `Degree: ${profile.degree}` : "",
    profile.workStatus ? `Current Work Status: ${profile.workStatus}` : "",
    profile.industry ? `Industry: ${profile.industry}` : "",
    profile.yearsExperience ? `Years of Experience: ${profile.yearsExperience}` : "",
    profile.familyStructure ? `Family Structure: ${profile.familyStructure}` : "",
    profile.financialCondition ? `Financial Condition: ${profile.financialCondition}` : "",
    profile.familyRelationship ? `Family Relationship: ${profile.familyRelationship}` : "",
    profile.personality ? `Personality: ${profile.personality}` : "",
    profile.riskAppetite ? `Risk Appetite: ${profile.riskAppetite}` : "",
    profile.decisionStyle ? `Decision Style: ${profile.decisionStyle}` : "",
    profile.discipline ? `Discipline Level: ${profile.discipline}` : "",
    profile.interests ? `Interests: ${profile.interests}` : "",
    profile.hobbies ? `Hobbies: ${profile.hobbies}` : "",
    profile.relationshipStatus ? `Relationship Status: ${profile.relationshipStatus}` : "",
    profile.lifeGoals ? `Life Goals: ${profile.lifeGoals}` : "",
    profile.currentChallenges ? `Current Challenges: ${profile.currentChallenges}` : "",
  ].filter(Boolean).join("\n");

  const scenarioDetail = scenario ? `\nScenario: ${scenario.title} - ${scenario.description}` : "";
  const customDetail = customPrompt ? `\nCustom User Prompt: ${customPrompt}` : "";

    return `You are a skilled life simulation storyteller. Create a deeply personalized and engaging ${tenure}-year life simulation for this person, following the path: ${PATH_DESCRIPTIONS[path]}.${scenarioDetail}${customDetail}

Here is the person's profile:
${profileDetails}

Make the narrative feel REAL and PERSONALIZED — weave in their actual details (name, location, personality, career, interests, challenges) naturally into the story. Each year should have specific, vivid events that feel unique to THIS person, not generic advice.

Respond strictly with VALID JSON in this exact format — nothing else, no markdown, no explanation:
{
  "title": "A compelling title for this journey",
  "subtitle": "A short evocative subtitle",
  "summary": "A 2-3 sentence overview of the overall arc",
  "years": [
    {
      "year": 1,
      "title": "Year-specific title",
      "text": "150-200 words of narrative describing what happens this year",
      "mood": "positive"
    },
    ...
  ]
}

The years array must have exactly ${tenure} entries, numbered 1 through ${tenure}, in order.
Each "mood" must be exactly one of: "positive", "neutral", "challenging", "transformative".
The "text" should be 150-200 words, specific to this person, with real emotional depth.

Respond with ONLY the JSON object.`;
}

export async function generateWithGemini(
  apiKey: string,
  profile: UserProfile,
  path: LifePath,
  tenure: SimulationTenure,
  scenario: ScenarioOption | null,
  mode: SimulationMode,
  customPrompt?: string
): Promise<SimulationData> {
  const prompt = buildPrompt(profile, path, tenure, scenario, mode, customPrompt);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${error?.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned no narrative content");
  }

  // Parse the JSON response
  let parsed: any;
  try {
    // Clean up any markdown or extra text
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    parsed = JSON.parse(cleanJson);
  } catch {
    throw new Error("Failed to parse Gemini response as valid narrative JSON");
  }

  if (!parsed.title || !parsed.summary || !Array.isArray(parsed.years)) {
    throw new Error("Invalid narrative structure from Gemini");
  }

  // Default mood values
  const validMoods = ["positive", "neutral", "challenging", "transformative"] as const;

  return {
    title: parsed.title,
    subtitle: parsed.subtitle || "",
    summary: parsed.summary,
    years: parsed.years.map((y: any, i: number) => ({
      year: i + 1,
      title: y.title || `Year ${i + 1}`,
      text: y.text || "This year brought new experiences and growth.",
      mood: validMoods.includes(y.mood) ? y.mood : "neutral",
    })),
  };
}
