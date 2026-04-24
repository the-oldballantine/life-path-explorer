import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { env } from "../config/env.js";

export interface ProfileSummary {
  name: string;
  age: string;
  gender: string;
  location: string;
  workStatus: string;
  industry: string;
  personality: string;
  interests: string;
  hobbies: string;
  riskAppetite: string;
  lifeGoals: string;
}

export interface NarrativeParams {
  profile: ProfileSummary;
  path: string;
  mode: string;
  tenure: number;
  scenario?: string;
  customPrompt?: string;
}

export interface YearEvent {
  year: number;
  title: string;
  text: string;
  mood: "positive" | "neutral" | "challenging" | "transformative";
}

export interface NarrativeResult {
  title: string;
  subtitle: string;
  summary: string;
  years: YearEvent[];
}

export async function generateNarrative(params: NarrativeParams): Promise<NarrativeResult> {
  // Try OpenAI first if configured
  if (env.OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(params);
    } catch (err) {
      console.warn("OpenAI generation failed, trying Claude:", err);
    }
  }

  // Try Claude if configured
  if (env.CLAUDE_API_KEY) {
    try {
      return await generateWithClaude(params);
    } catch (err) {
      console.warn("Claude generation failed, falling back to static:", err);
    }
  }

  // Fallback to enhanced static narrative
  return generateStaticNarrative(params);
}

async function generateWithOpenAI(params: NarrativeParams): Promise<NarrativeResult> {
  const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  const userPrompt = buildUserPrompt(params);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a skilled life story narrator. Generate a compelling, personalized year-by-year life simulation based on the user's profile and selected path.

Respond ONLY with a valid JSON object matching this exact structure:
{
  "title": "string",
  "subtitle": "string",
  "summary": "string (2-3 sentence overview)",
  "years": [
    {
      "year": 1,
      "title": "string",
      "text": "string (3-4 sentence narrative)",
      "mood": "positive | neutral | challenging | transformative"
    }
  ]
}

The years array should have exactly ${params.tenure} entries. Use vivid, specific language that incorporates details from the user's profile. Each year's text should be 3-4 sentences.`,
      },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 4000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  const parsed = JSON.parse(content) as NarrativeResult;
  validateResult(parsed);
  return parsed;
}

async function generateWithClaude(params: NarrativeParams): Promise<NarrativeResult> {
  const claude = new Anthropic({ apiKey: env.CLAUDE_API_KEY });

  const userPrompt = buildUserPrompt(params);

  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    temperature: 0.8,
    system: `You are a skilled life story narrator. Generate a compelling, personalized year-by-year life simulation based on the user's profile and selected path.

Respond ONLY with a valid JSON object matching this exact structure:
{
  "title": "string",
  "subtitle": "string",
  "summary": "string (2-3 sentence overview)",
  "years": [
    {
      "year": 1,
      "title": "string",
      "text": "string (3-4 sentence narrative)",
      "mood": "positive | neutral | challenging | transformative"
    }
  ]
}

The years array should have exactly ${params.tenure} entries. Use vivid, specific language that incorporates details from the user's profile. Each year's text should be 3-4 sentences.`,
    messages: [{ role: "user", content: userPrompt }],
  });

  const content = response.content.find((c) => c.type === "text");
  if (!content || content.type !== "text") throw new Error("Empty response from Claude");

  // Extract JSON from response (may have markdown code blocks)
  const jsonStr = content.text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const parsed = JSON.parse(jsonStr) as NarrativeResult;
  validateResult(parsed);
  return parsed;
}

function buildUserPrompt(params: NarrativeParams): string {
  const { profile, path, mode, tenure, scenario, customPrompt } = params;

  const pathLabels: Record<string, string> = {
    love: "Love & Relationships",
    career: "Career & Ambition",
    financial: "Financial Freedom",
    personal: "Personal Growth",
    alternate: "Alternate Life",
  };

  let prompt = `Create a ${tenure}-year life simulation for the following person:\n\n`;
  prompt += `Name: ${profile.name}\n`;
  prompt += `Age: ${profile.age}\n`;
  prompt += `Location: ${profile.location}\n`;
  prompt += `Work Status: ${profile.workStatus}\n`;
  prompt += `Industry: ${profile.industry}\n`;
  prompt += `Interests: ${profile.interests}\n`;
  prompt += `Hobbies: ${profile.hobbies}\n`;
  prompt += `Personality: ${profile.personality}\n`;
  prompt += `Risk Appetite: ${profile.riskAppetite}\n`;
  prompt += `Life Goals: ${profile.lifeGoals}\n\n`;
  prompt += `Life Path: ${pathLabels[path] || path}\n`;

  if (mode === "custom" && customPrompt) {
    prompt += `Custom Scenario Prompt: ${customPrompt}\n`;
    prompt += `Weave this custom premise into the narrative naturally.\n`;
  } else if (scenario) {
    prompt += `Specific Scenario: ${scenario}\n`;
  }

  prompt += `\nMake the narrative personal and vivid. Incorporate the person's actual details — their name, location, interests, personality, and values — into every year of the story.`;

  return prompt;
}

function validateResult(result: NarrativeResult): void {
  if (!result.title || !result.subtitle || !result.summary || !Array.isArray(result.years)) {
    throw new Error("Invalid narrative structure");
  }
  const validMoods = ["positive", "neutral", "challenging", "transformative"];
  for (const y of result.years) {
    if (!validMoods.includes(y.mood)) {
      throw new Error(`Invalid mood: ${y.mood}`);
    }
  }
}

function generateStaticNarrative(params: NarrativeParams): NarrativeResult {
  const { profile, path, tenure, customPrompt } = params;
  const name = profile.name;
  const location = profile.location;
  const workStatus = profile.workStatus;
  const personality = profile.personality;
  const interests = profile.interests;
  const lifeGoals = profile.lifeGoals;
  const hobby = profile.hobbies;

  const pathLabels: Record<string, string> = {
    love: "Love & Relationships",
    career: "Career & Ambition",
    financial: "Financial Freedom",
    personal: "Personal Growth",
    alternate: "Alternate Life",
  };

  const titles: Record<string, string[]> = {
    love: [
      "A New Connection",
      "Opening Up",
      "Vulnerability",
      "Growing Together",
      "The Challenge",
      "Deeper Commitment",
      "Weathering Storms",
      "Renewed Vows",
      "Building a Home",
      "Enduring Love",
    ],
    career: [
      "The First Step",
      "Finding Your Footing",
      "A Bold Opportunity",
      "Leadership Emerges",
      "The Pivot Point",
      "Scaling New Heights",
      "Facing Burnout",
      "Reimagining Purpose",
      "Mastery",
      "Legacy Building",
    ],
    financial: [
      "Awakening to Money",
      "Learning the Rules",
      "First Investments",
      "The Windfall",
      "Temptation",
      "Building Wealth",
      "Protecting Assets",
      "Giving Back",
      "True Wealth",
      "Financial Freedom",
    ],
    personal: [
      "The Spark",
      "Facing Mirror",
      "Breaking Patterns",
      "Discovering Strength",
      "The Reckoning",
      "New Habits",
      "Expanding Horizons",
      "Inner Peace",
      "Authentic Living",
      "Whole Self",
    ],
    alternate: [
      "The Fork",
      "Parallel Paths",
      "The Other World",
      "Convergence",
      "Choices Echo",
      "Blending Lives",
      "The Revelation",
      "A Unified Vision",
      "Full Circle",
      "Everything Connected",
    ],
  };

  const texts: Record<string, string[]> = {
    love: [
      `${name} meets someone unexpected. In a world where ${name} is already ${workStatus}, this encounter catches them off guard. The spark is undeniable. ${personality ? `True to ${personality} nature, ` : ""}${name} approaches it with both curiosity and caution.`,
      `Relationships deepen as ${name} opens up about dreams and fears. In ${location}, quiet moments become the foundation of something real. ${interests ? `Shared ${interests} become bonding rituals.` : "Shared experiences build the foundation."} ${name} feels seen, truly seen, for the first time.`,
      `The relationship faces its first real test. Miscommunication, different timelines, external pressures — love is not enough without effort. ${name} and their partner choose to do the work. Growth through discomfort is the lesson here.`,
      `Together, they evolve. ${name} learns that lasting connection requires constant reinvention. What worked a year ago doesn't work now, and that's okay. The love deepens from infatuation to something more resilient and more honest.`,
      `A crisis arrives. Either external circumstances or internal doubts threaten the bond. ${name} must decide what matters most. The choice made here becomes the defining moment — either walking away from comfort or fighting for something worth keeping.`,
      `The aftermath of year 5 brings clarity. ${name} and their partner emerge stronger, but it required brutal honesty. ${lifeGoals ? `They align on shared ${lifeGoals} now, making the relationship a true partnership.` : "They commit to a shared future."} Vulnerability becomes the new normal.`,
      `Life throws its usual curveballs, but this time they face them as a unit. ${name} realizes that having a partner doesn't mean losing independence — it means having a co-pilot. The balance of autonomy and togetherness takes work, and ${name} is learning.`,
      `Renewal. Maybe it's a second honeymoon, a recommitment, or simply a quiet realization that the person across the table is still the most fascinating person in the room. ${location ? `Back in ${location}, they build a life they're proud of.` : "They build a life they're proud of."}`,
      `Building something that lasts. ${name} and partner create rituals, traditions, and a home that feels like home. They've found a rhythm that works.`,
      `A decade in, love is no longer new, but it's no less powerful. ${name} has learned that love is not a feeling — it's a practice. The journey from first spark to enduring flame is the story of this path. And ${name} wouldn't change a thing.`,
    ],
    career: [
      `${name} takes the first bold step in their chosen direction. With ${workStatus} as the foundation, the ambition is real but needs direction. ${personality ? `As a ${personality} individual, ` : ""}${name} brings their unique approach to everything. The early enthusiasm is infectious.`,
      `Reality checks arrive — but so do real skills. ${name} learns the craft, builds networks, and discovers their niche. ${hobby ? `${hobby} becomes an unexpected asset in the professional world.` : "Unexpected talents emerge."} The path isn't linear, but it's moving forward.`,
      `An opportunity ${name} didn't expect appears. A project, a collaboration, a promotion — the kind that makes or breaks careers. ${name} takes it. ${lifeGoals ? `It aligns with ${lifeGoals} beautifully.` : "The risk pays off."} Confidence surges.`,
      `Responsibility grows. ${name} is no longer just doing the work — they're leading it. Leadership feels natural but also heavy. ${location ? `From ${location}, ${name} influences a wider circle.` : "Their influence expands."} With influence comes the temptation and the weight.`,
      `The pivot point: ${name} faces a choice between the comfortable and the bold. ${lifeGoals ? `Remembering ${lifeGoals}, ` : ""}the decision is harder than expected. What got ${name} here won't get ${name} further.`,
      `Scaling. ${name} pushes beyond previous limits. ${workStatus ? `The work reaches new heights.` : "The work reaches new heights."} Recognition comes — awards, mentions, opportunities that validate the journey. But with visibility comes pressure.`,
      `Burnout. The word everyone warns about but nobody believes applies to them. Until it does. ${name} hits a wall. ${personality ? `For a ${personality} person, slowing down is its own challenge.` : "Rest feels like failure at first."} Recovery means redefining success.`,
      `Reimagined purpose. ${name} returns to work not because it's obligatory, but because it's meaningful. The difference is everything. A deeper 'why' emerges from the ashes of burnout. The career becomes a calling.`,
      `Mastery. ${name} does what few can — combines skill, wisdom, and authenticity. The work speaks for itself. ${interests ? `Those early ${interests} have evolved into expertise.` : "What was once passion is now purpose."} The impact is measurable and meaningful.`,
      `Legacy. ${name} is no longer building a career — they're building something that outlasts it. Mentoring the next generation, sharing lessons learned, and creating systems that don't depend on ${name}'s presence. The career has become a contribution.`,
    ],
    financial: [
      `${name} has a wake-up call about money. Whether it's seeing others achieve financial freedom or simply being tired of paycheck-to-paycheck living, something shifts. ${workStatus ? `${workStatus} income is the starting point, not the ceiling.` : "The current income is a starting point."} Education begins.`,
      `Financial literacy is more important than high income, and ${name} learns this fast. Budgets, savings, emergency funds — the unsexy foundation of everything. ${personality ? `${personality} discipline helps.` : "Discipline helps."} The first real savings account feels like a small miracle.`,
      `First investments. ${name} takes the accumulated savings and puts them to work — stocks, real estate, or a side business. Not every bet wins, but every loss teaches.`,
      `The first significant gain. A return on investment, a business that clicks, a promotion with real financial impact. ${name} sees the power of compound growth — not just in money, but in knowledge and confidence. ${hobby ? `Monetizing ${hobby} becomes a real possibility.` : ""}`,
      `Temptation arrives: lifestyle inflation. More money tempts ${name} to spend more. New car, bigger apartment, upgraded everything. The question is: what kind of life does this money enable?`,
      `Strategic wealth building. ${name} moves beyond reactive money management to proactive wealth creation. Portfolios are diversified, income streams multiplied, and tax efficiency optimized. ${location ? `In ${location}, the economic landscape favors the prepared.` : ""} The portfolio takes shape.`,
      `Protection becomes the focus. Insurance, legal structures, estate planning — wealth without protection is fragile. ${name} builds the infrastructure. ${personality ? `Methodical ${personality} traits shine here.` : "The unsexy work is what keeps wealth intact."} It's not glamorous, but it's essential.`,
      `Giving back. Money at this level stops being about ${name} and starts being about impact. ${name} discovers that wealth is most satisfying when it's shared.`,
      `True wealth, redefined. ${name} realizes that the original goals were about more than a number. Financial freedom means time freedom, choice freedom, relationship freedom. The money enabled the life, but didn't define it.`,
      `A decade of financial transformation. ${name} went from awareness to abundance — but more importantly, from scarcity to generosity. ${location ? `${name}'s presence in ${location} is now felt positively through giving.` : "The legacy is not the balance sheet, it's the life built."} The money was the tool; the life was the project.`,
    ],
    personal: [
      `${name} recognizes something isn't working — or could work better. The spark of self-awareness ignites. ${personality ? `As someone ${personality}, this realization is hard-won.` : "This realization takes courage."} ${lifeGoals ? `The gap between where ${name} is and where ${name} wants to be (${lifeGoals}) is the starting line.` : "The journey begins."}`,
      `Looking in the mirror — really looking. ${name} confronts patterns, habits, and beliefs that have been invisible. ${interests ? `Even ${interests}, once just hobbies, become mirrors into who ${name} really is.` : "The process is uncomfortable but necessary."} Self-awareness is not a comfortable phase.`,
      `Breaking the patterns starts small. One habit changed. One belief challenged. One fear acknowledged and acted on anyway. Progress is slow but real. The first evidence that change is possible emerges.`,
      `A test of the new ${name}. Something triggers the old reaction, and ${name} catches it. This is the moment growth becomes visible — not in the trigger, but in the response. ${location ? `In the familiar setting of ${location}, ${name} surprises even ${name}self.` : ""}`,
      `The reckoning. Not everything that was broken in year 1 can be fixed with new habits. There's deeper stuff — childhood beliefs, past traumas, identity issues. ${name} faces it with a therapist, a book, a retreat, or just raw honesty. This is the hardest year.`,
      `Post-reckoning clarity. ${name} emerges with a new operating system. Not perfect, but functional and more authentically ${name}. The old scripts are rewritten. Energy returns, replaced by something more durable.`,
      `Expanding horizons. With internal foundations solid, ${name} looks outward. ${interests ? `${interests} become vehicles for expression, not just distractions.` : ""} New skills, new relationships, new ways of being emerge. Growth accelerates because the internal resistance is lower.`,
      `Inner peace. Not a permanent state, but a reachable one. ${name} discovers that peace isn't the absence of chaos, but the presence of inner stability regardless of circumstances. Meditation, nature, art, faith — whatever it is for ${name}, it works.`,
      `Authentic living. ${name} stops performing and starts being. In every area of life, there's a lightness that comes from not trying to be someone else. ${lifeGoals ? `${lifeGoals} are either achieved or replaced by better goals.` : ""}`,
      `A decade of personal transformation. ${name} looks back and barely recognizes the person who started. Not because they're different, but because they're finally the same person inside and out. ${workStatus ? `Even in ${workStatus}, the energy has shifted from proving to contributing.` : "The journey is the destination."} Wholeness.`,
    ],
    alternate: [
      `The fork. ${name} makes a choice — or a choice is made — that sends life in a radically different direction. ${workStatus ? `Instead of ${workStatus}, ` : "Instead of the expected,"} something else. ${location ? `Not ${location}, but somewhere new.` : "Somewhere entirely different."} The alternate life begins with disorientation and a spark of possibility.`,
      `Living the parallel. ${name} discovers that this other life has its own joys and challenges. ${interests ? `${interests} take on new meanings in this context.` : ""} Things that seemed important before feel trivial. Things that seemed small feel enormous. The contrast between lives is illuminating.`,
      `The other world solidifies. ${name} builds relationships, routines, and identity in this alternate path. ${personality ? `${personality} traits find new channels.` : ""} But in quiet moments, ${name} wonders about the life not lived. The grass is greener in both directions.`,
      `Convergence. Elements from the original life and this alternate path start overlapping. ${name} realizes that some things are the same no matter the path — core values, deep desires, the essence of who ${name} is. ${lifeGoals ? `${lifeGoals} appear in both worlds, just differently expressed.` : ""}`,
      `Choices echo. A decision that seemed small in the original life proves enormous here, or vice versa. ${name} understands the chaos theory of personal decisions: tiny shifts create massive divergence. The realization is both humbling and empowering.`,
      `Blending the wisdom of both lives. ${name} stops seeing this as either/or and starts seeing the value in the multiplicity of human experience. Even if it's only hypothetical, the alternate life teaches things the real one can't, and vice versa.`,
      `The revelation: there is no perfect path. Every choice has a cost and a reward. ${name} stops idealizing the road not taken and starts appreciating the road being walked.`,
      `A unified vision emerges. ${name} takes the best of the alternate world — the perspective, the gratitude, the "what ifs" — and integrates it into the actual life. The imaginary becomes a catalyst for the real.`,
      `Full circle. ${name} returns to the present — whether physically or mentally — with new eyes. The career, the relationships, the daily routine — all freshly seen. The alternate life was never about escaping; it was about seeing.`,
      `Everything connected. ${name} understands that the "what if" and "what is" are not enemies but partners in the same understanding. ${location ? `In ${location}, now seen with clarity, ` : "In life, now seen with clarity,"} ${name} finds not answers but better questions. And that is enough.`,
    ],
  };

  const pathTitles = titles[path] || titles.personal;
  const pathTexts = texts[path] || texts.personal;

  const years: YearEvent[] = [];
  const tenureCount = Math.min(tenure, 10);

  for (let i = 0; i < tenureCount; i++) {
    let mood: YearEvent["mood"] = "neutral";
    if (i === 0) mood = "transformative";
    else if (i === tenureCount - 1) mood = "transformative";
    else if (i % 3 === 1) mood = "challenging";
    else if (i % 2 === 0) mood = "positive";

    let titleText = pathTitles[i] || `Year ${i + 1}`;
    let textContent = pathTexts[i] || `${name} continues their journey in this path.`;

    if (customPrompt) {
      textContent = `${name}'s story unfolds with a unique premise: "${customPrompt.slice(0, 100)}...". ${textContent}`;
    }

    years.push({
      year: i + 1,
      title: titleText,
      text: textContent,
      mood,
    });
  }

  const scenarioContext =
    customPrompt ? ` — a custom scenario` : "";

  return {
    title: `${pathLabels[path] || "Personal"} Journey${scenarioContext}`,
    subtitle: `${tenure}-year ${pathLabels[path] || "life"} simulation for ${name}`,
    summary: `A ${tenure}-year exploration of ${name}'s ${pathLabels[path] || "personal"} path, weaving together ${workStatus}, ${interests}, and ${hobby} into a narrative of transformation, challenge, and growth${scenarioContext ? ` prompted by: "${customPrompt?.slice(0, 80)}"` : ""}.`,
    years,
  };
}
