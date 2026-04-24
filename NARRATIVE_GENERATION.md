# Narrative Generation System

## Overview
The Life Path Explorer now features **dual-mode storytelling**:

1. **AI Simulation** - Generates unique, personalized 10-year narratives using Claude AI
2. **Rock & Roll** - Uses your custom prompt to frame and personalize enhanced static templates

Both modes produce compelling, story-driven simulations that feel authentic to your profile.

---

## How It Works

### AI Mode (Claude-Powered)
- Requires a Claude API key (get one from https://console.anthropic.com/)
- Sends your complete profile (name, age, location, career, personality, goals, etc.) to Claude
- Claude crafts a custom 10-year narrative specific to your life path (Love/Career/Financial/Personal/Alternate)
- If you selected a scenario, its "twist" is incorporated at the appropriate year
- The result is a unique story that reads like literary fiction

### Rock & Roll Mode (Enhanced Static)
- You write a custom scenario describing what you want to explore
- The system selects the best template from our library of pre-written narratives
- Your profile details are injected (name, location, industry, hobbies, etc.)
- Your custom prompt is woven into the story as a framing device
- Works immediately without any API key

---

## Setup

### For AI Mode (Optional)
1. Copy `.env.example` to `.env` in the project root:
   ```bash
   cp .env.example .env
   ```
2. Add your Claude API key:
   ```
   VITE_CLAUDE_API_KEY=your_actual_api_key_here
   ```
3. Restart the dev server

**Note:** Without the API key, AI mode will automatically fall back to enhanced static narratives.

---

## Usage Flow

1. **Login/Signup** → New authentication gate
2. **Onboarding** → Fill out your profile (mandatory)
3. **Path Selection** → Choose which life dimension to simulate
4. **Scenario Setup**:
   - Pick **AI Simulation** or **Rock & Roll** mode
   - Select simulation duration (3/5/10 years)
   - If AI: optionally pick a scenario twist from the list
   - If Rock & Roll: write your custom scenario in the textarea
   - Click **Start**
5. **Loading Screen** → Watch the story being generated (5-10 seconds for AI)
6. **Simulation View** → Read your personalized year-by-year narrative

---

## Technical Details

### Files Created
- `src/lib/claude-service.ts` - Claude API integration with prompt engineering
- `src/lib/narrative-cache.ts` - Caching system to minimize API calls (24h TTL)
- `src/lib/narrative-generator.ts` - Orchestrator that decides AI vs static
- `src/lib/personalization.ts` - Token replacement for static templates
- `src/components/LoadingScreen.tsx` - Loading animation during generation
- `src/types/auth.ts` - Authentication types
- `src/lib/auth-storage.ts` - localStorage auth persistence
- `src/components/auth/AuthForm.tsx` - Login/signup form
- `.env.example` - Environment variable template
- `src/vite-env.d.ts` - TypeScript definitions for Vite env

### Modified Files
- `src/pages/Index.tsx` - Added auth phase, loading phase, narrative generation
- `src/types/profile.ts` - Added `"auth"` to `AppPhase`
- `src/components/SimulationView.tsx` - Accepts dynamic narrative prop
- `src/components/PathSelector.tsx` - (no changes, kept clean)
- `src/components/ProfileDashboard.tsx` - Added logout button

### Caching
- Generated narratives are cached in localStorage with a 24-hour TTL
- Cache key includes: profile hash, path, tenure, mode, scenario ID, custom prompt snippet
- Reduces API calls and speeds up repeat viewings

### Fallback Behavior
If Claude API fails or is not configured:
- AI mode → falls back to enhanced static narrative with personalization
- Rock & Roll mode → uses enhanced static narrative with custom prompt injection
- Users still get a working simulation, just not AI-generated

---

## Prompt Engineering

The Claude system prompt is carefully crafted to:
- Analyze the user's entire profile in detail
- Write in a literary, emotionally resonant style
- Produce exactly N years (3/5/10) with consistent character development
- Incorporate scenario twists at realistic moments (years 2-6)
- Use the user's actual name, location, career details throughout
- Show realistic consequences (not always happy, but meaningful)
- Output structured JSON that matches the `SimulationData` schema

---

## Testing Scenarios

### Scenario 1: AI Mode with API Key
1. Set `VITE_CLAUDE_API_KEY` in `.env`
2. Complete onboarding with a detailed profile (e.g., name: "Alex", age: "28", location: "Mumbai", industry: "Tech", personality: "introvert", etc.)
3. Choose Career path, select "The Startup Gamble" scenario, 5 years
4. Click Start
5. Should see loading screen with "Claude is crafting your personalized narrative..."
6. After 5-10 seconds, see simulation with "✨ AI Generated" badge in header
7. Narrative should mention Alex, Mumbai, Tech industry, and introverted personality

### Scenario 2: Rock & Roll Mode (No API Key)
1. Ensure `.env` has no API key or remove it
2. Complete onboarding (any profile)
3. Choose Love path, select Rock & Roll mode
4. In textarea, type: "I want to see what happens if I move to Goa next year and start a beachside cafe while dating a local artist"
5. Click Start
6. Loading screen with "Preparing your custom scenario..."
7. Simulation appears with "Custom Scenario" badge
8. The narrative should be from the love template but may reference the Goa/cafe/artist elements in some years
9. Your name and profile details should appear in the text

### Scenario 3: Fallback Behavior
1. Set an invalid API key (e.g., "fake-key") or intentionally break the API call
2. Try AI mode
3. Should fall back to static narrative with personalization (name, location, etc. injected)
4. Should show an error or just use static? (current: fallback silently)
5. Simulation still works, just not AI-generated

---

## Security & Cost Considerations

### API Key Security
- The API key is stored client-side in `.env` (Vite injects it at build time)
- **This is NOT secure for production** - anyone can inspect the bundle and extract the key
- For production, implement a backend proxy:
  - Create a simple Node.js/Express server
  - Store API key in server environment variables
  - Proxy requests to Claude API
  - Update `claude-service.ts` to call your backend instead of Anthropic directly

### Cost Control
- Claude Haiku costs ~$0.25 per 1M tokens (very affordable)
- Each generation uses ~1000-2000 tokens (detailed 10-year story)
- Cache ensures we don't regenerate the same narrative repeatedly
- Potential issue: users could spam generate → implement rate limiting if needed

---

## Future Enhancements

1. **Streaming Output** - Show narrative as it's being generated (using Claude streaming)
2. **Multiple Variants** - Generate 3 different narratives and let user choose
3. **Narrative History** - Save all generated narratives to user profile
4. **Regenerate Button** - Generate a new narrative with same settings
5. **Edit & Refine** - Allow users to tweak generated narratives
6. **Share Stories** - Export as PDF or shareable link
7. **Backend Proxy** - Secure API key handling
8. **Better Theme Detection** - More sophisticated keyword matching for Rock&Roll mode
9. **User Feedback** - Rate the narrative quality to improve prompts
10. **Multi-language** - Generate narratives in user's preferred language

---

## Troubleshooting

### "Claude API key not configured" error
- Check `.env` file exists and contains `VITE_CLAUDE_API_KEY=your_key`
- Restart dev server after creating/changing `.env`
- Verify the key is valid at https://console.anthropic.com/

### AI Generation Fails
- Check browser console for error details
- Verify API key has credits and is not expired
- Check network tab for CORS issues (should not happen with direct Anthropic API)
- App will fallback to static narrative automatically

### Caching Not Working
- localStorage might be full or disabled
- Check browser DevTools → Application → Local Storage
- Try clearing site data and retry

---

## Architecture Notes

The system is designed to be **swap-out-able**:
- `getOrGenerateNarrative()` is the single source of truth
- Different strategies (AI, static, hybrid) can be plugged in
- The rest of the app only consumes `SimulationData` - it doesn't care how it was generated
- Easy to add new generation methods (e.g., OpenAI, local LLM, user templates)

---

**Enjoy your hyper-personalized life simulations!** 🚀
