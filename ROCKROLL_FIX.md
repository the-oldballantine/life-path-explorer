# Rock & Roll Mode Fix - Custom Scenario Generation

## Problem
Previously, when you selected **Rock & Roll** mode and wrote a custom scenario (like "what happen if i die and then rebirth in some other place but remembers everythng from past"), the system would:

1. Ignore your custom prompt for the main story content
2. Use a pre-written template based on the **selected life path** (Love/Career/Financial/etc.)
3. This meant a "rebirth" prompt would result in a generic Love story or Career story — completely unrelated to your scenario

## Solution

The narrative generator now **analyzes your custom prompt** and generates a narrative that actually matches your scenario:

### Detection System
The system recognizes these scenario types by keyword:
- **Rebirth**: "rebirth", "reborn", "die", "death", "past life", "remember" → Generates a story about being reborn with memories
- **Supernatural**: "witch", "magic", "supernatural", "power" → Magic/superpowers narrative
- **Future**: "future", "time travel", "apocalypse", "dystopia" → Futuristic survival/exploration
- **Wealth**: "rich", "wealthy", "billionaire", "money" → Sudden wealth story
- **Fame**: "famous", "celebrity", "star" → Fame and spotlight narrative
- **General**: Anything else → Smart generic template that references your concept

### AI vs Fallback

**With Claude API key:**
- Your custom prompt is sent to Claude
- Claude generates a unique 10-year story tailored to your exact scenario
- Includes your profile details throughout
- Highest quality, truly personalized

**Without API key (fallback):**
- Built-in custom generator creates a narrative matching your scenario type
- For "rebirth": 10-year story about dying, being reborn with memories, dual identity, etc.
- Your name, age, location, personality traits are woven throughout
- Not AI-quality but highly relevant to your prompt

---

## Testing the Rebirth Fix

### Without API Key (fallback mode):
1. Go to the app
2. Login/Signup → Complete onboarding with your real details
3. Select any life path (e.g., "Love" — but it won't matter now)
4. Choose **Rock & Roll** mode
5. Enter exactly: "what happen if i die and then rebirth in some other place but remembers everythng from past"
6. Click Start
7. **Expected result**: A 10-year story about rebirth, dual memories, discovering a new life while carrying the past — NOT a love story

### With Claude API Key:
1. Set `VITE_CLAUDE_API_KEY` in `.env`
2. Repeat steps above
3. **Expected result**: Claude generates a unique, beautifully written rebirth narrative specific to your profile

---

## What Changed in the Code

### `src/lib/narrative-generator.ts`
- Added `generateCustomNarrativeFromPrompt()` function
- Detects scenario type from keywords in custom prompt
- Generates appropriate custom narrative (rebirth, supernatural, future, wealth, fame, or general)
- For "rebirth" specifically: 10-year arc covering waking up in new body, dual identity, using past knowledge, connections across lifetimes, eventual integration

### `enhanceStaticNarrative()` modification
- Now checks: if mode === 'rockandroll' && customPrompt → call custom generator
- No longer uses the path-based template (love/career/financial) for custom prompts

---

## Example Rebirth Narrative (First 3 Years)

If your profile says: Name = Priya, Age = 26, Location = Mumbai, Personality = introvert

**Year 1: "Waking Up in a New World"**
> Priya opens their eyes to unfamiliar sights, sounds, and a body that feels both foreign and intimately theirs. The memories of the previous life flood in — the family they lost, the mistakes they made, the love they knew. With their introvert approach to confusion, Priya spends the first months in a daze, secretly observing this new world, learning its rules, and trying to understand why this happened. The disorientation is profound, but so is the realization: this is a second chance.

**Year 2: "The Dual Identity"**
> As Priya adapts to the new life, the burden of double memories becomes both a gift and a curse. At age 28, Priya possesses knowledge and emotional maturity far beyond their years, but also carries grief that no one else can comprehend...

**...continues through Year 10 showing integration and purpose...**

---

## Technical Details

The custom prompt analyzer:
1. Lowercases and searches for keywords
2. Maps to scenario categories
3. Loads (or generates) the matching narrative template
4. Personalizes with profile data (name, pronouns, location, personality)
5. Returns a complete `SimulationData` object

This happens synchronously in the fallback mode — no API calls needed.

---

## Future Improvements

1. **Better keyword matching** — Use embeddings or more sophisticated NLP
2. **More scenario categories** — Add support for "travel", "health", "adventure", "mystery", etc.
3. **Dynamic year generation** — Actually generate 10 unique years based on the prompt using a local LLM or more templates
4. **Claude prompt optimization** — Ensure Rock&Roll mode with Claude completely ignores path and focuses on custom scenario
5. **User feedback** — Let users rate narrative relevance to improve matching

---

## Summary

Now when you write a custom scenario in Rock & Roll mode, you'll get a narrative that actually follows your scenario, not a random love/career/financial story. The "rebirth with memories" concept now generates a proper rebirth narrative.

**Try it now** at http://localhost:8083/ and see the difference! 🚀
