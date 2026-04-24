import { UserProfile, SimulationData, YearEvent } from "@/types/profile";

interface PersonalizationContext {
  profile: UserProfile;
  customPrompt?: string;
}

// Template placeholders that can be replaced
const PLACEHOLDERS = {
  name: "{name}",
  age: "{age}",
  location: "{location}",
  industry: "{industry}",
  career: "{career}",
  hobbies: "{hobbies}",
  personality: "{personality}",
  risk: "{riskAppetite}",
  customPrompt: "{customPrompt}"
};

function replacePlaceholders(text: string, context: PersonalizationContext): string {
  let result = text;

  if (context.profile.name) {
    result = result.split(PLACEHOLDERS.name).join(context.profile.name);
  }
  if (context.profile.age) {
    result = result.split(PLACEHOLDERS.age).join(context.profile.age);
  }
  if (context.profile.location) {
    result = result.split(PLACEHOLDERS.location).join(context.profile.location);
  }
  if (context.profile.industry) {
    result = result.split(PLACEHOLDERS.industry).join(context.profile.industry);
  }
  if (context.profile.workStatus) {
    result = result.split(PLACEHOLDERS.career).join(context.profile.workStatus);
  }
  if (context.profile.hobbies) {
    result = result.split(PLACEHOLDERS.hobbies).join(context.profile.hobbies);
  }
  if (context.profile.personality) {
    result = result.split(PLACEHOLDERS.personality).join(context.profile.personality);
  }
  if (context.profile.riskAppetite) {
    result = result.split(PLACEHOLDERS.risk).join(context.profile.riskAppetite);
  }
  if (context.customPrompt) {
    result = result.split(PLACEHOLDERS.customPrompt).join(context.customPrompt);
  }

  return result;
}

function extractKeyThemes(prompt: string): string[] {
  // Simple keyword extraction for theme matching
  const keywords = prompt.toLowerCase().split(/\s+/);
  const themes: string[] = [];

  const themeMap: Record<string, string[]> = {
      'goa': ['travel', 'lifestyle', 'freedom', 'coastal'],
      'surf': ['lifestyle', 'passion', 'health', 'freedom'],
      'startup': ['entrepreneurship', 'risk', 'growth', 'innovation'],
      'business': ['entrepreneurship', 'growth', 'finance'],
      'freelance': ['freedom', 'lifestyle', 'career'],
      'developer': ['tech', 'career', 'skill'],
      'art': ['creative', 'personal', 'passion'],
      'music': ['creative', 'passion', 'personal'],
      'money': ['financial', 'wealth', 'security'],
      'love': ['love', 'relationships', 'emotional'],
      'marriage': ['love', 'commitment', 'family'],
      'family': ['family', 'personal', 'relationships'],
      'health': ['health', 'personal', 'discipline'],
      'fitness': ['health', 'personal', 'discipline'],
    };

  for (const [keyword, mappedThemes] of Object.entries(themeMap)) {
    if (keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
      themes.push(...mappedThemes);
    }
  }

  return [...new Set(themes)];
}

function shouldSwapTemplate(customPrompt: string, path: string): boolean {
  // For Rock&Roll mode with a very specific custom prompt, we might want to use a different template
  const prompt = customPrompt.toLowerCase();
  const pathKey = path as string;

  // If prompt strongly indicates a different path than selected, we could switch (optional)
  // For now, we'll keep the selected path but enhance with custom elements
  if (pathKey === 'love' && (prompt.includes('business') || prompt.includes('startup'))) {
    return true; // Would switch to career template, but for now we stay with love
  }
  return false;
}

export function personalizeSimulationData(
  data: SimulationData,
  context: PersonalizationContext
): SimulationData {
  const { profile, customPrompt } = context;

  // Personalize title, subtitle, summary
  let personalizedTitle = replacePlaceholders(data.title, context);
  let personalizedSubtitle = replacePlaceholders(data.subtitle, context);
  let personalizedSummary = replacePlaceholders(data.summary, context);

  // If custom prompt exists, weave it into the narrative as a framing element
  if (customPrompt) {
    const promptIntro = `Based on the scenario: "${customPrompt}"\n\n`;
    personalizedSummary = promptIntro + personalizedSummary;
  }

  // Personalize each year's content
  const personalizedYears: YearEvent[] = data.years.map((yearEvent, index) => {
    let personalizedText = replacePlaceholders(yearEvent.text, context);
    let personalizedTitle = replacePlaceholders(yearEvent.title, context);

    // Add custom prompt flavor if provided
    if (customPrompt && index >= 1 && index <= 5) {
      // Inject custom prompt elements into a random year between 1-5
      const themes = extractKeyThemes(customPrompt);
      if (themes.length > 0 && index === 3) {
        const themeMention = themes[0];
        personalizedText = `Reflecting on their goal to ${customPrompt.slice(0, 50)}..., ${personalizedText}`;
      }
    }

    return {
      ...yearEvent,
      title: personalizedTitle,
      text: personalizedText,
      mood: yearEvent.mood // Keep original mood
    };
  });

  return {
    ...data,
    title: personalizedTitle,
    subtitle: personalizedSubtitle,
    summary: personalizedSummary,
    years: personalizedYears
  };
}

export function createCustomIntro(year: number, customPrompt: string): string {
  const intros: Record<number, string[]> = {
    1: [
      `With a clear vision of ${customPrompt}, the journey begins.`,
      `Fresh from deciding to ${customPrompt}, they step into this year with purpose.`,
      `The decision to ${customPrompt} sets the tone for everything that follows.`
    ],
    2: [
      `The realities of ${customPrompt} start to surface.`,
      `What seemed simple at first—${customPrompt}—now reveals its complexities.`,
      `Six months into ${customPrompt},Adjustments are necessary.`
    ],
    3: [
      `${customPrompt} demands a deeper commitment.`,
      `The midway point of this ${customPrompt} journey brings unexpected challenges.`,
      `Having pursued ${customPrompt} for two years, a critical choice emerges.`
    ]
  };

  const yearIntros = intros[year];
  if (!yearIntros) return "";

  return yearIntros[Math.floor(Math.random() * yearIntros.length)];
}

export function getPersonalizationProfile(profile: UserProfile): Record<string, string> {
  return {
    name: profile.name || "they",
    age: profile.age || "their age",
    location: profile.location || "their city",
    industry: profile.industry || profile.workStatus || "their field",
    career: profile.workStatus || "their career",
    hobbies: profile.hobbies || "their interests",
    personality: profile.personality || "their nature",
    risk: profile.riskAppetite || "moderate"
  };
}
