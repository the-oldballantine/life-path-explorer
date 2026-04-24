# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Life Path Explorer** - a React + TypeScript application that simulates different life trajectories based on user profiles. The app allows users to:
- Create a personal profile (onboarding)
- Choose from 5 life paths: Love, Career, Financial, Personal Growth, or Alternate Life
- Configure simulation duration (3, 5, or 10 years)
- Run simulations with either AI-generated scenarios or custom "Rock & Roll" prompts
- View year-by-year timeline of projected life events

## Development Commands

### Quick Start
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` — Start development server (Vite) on port 8080
- `npm run build` — Create production build
- `npm run build:dev` — Create development build
- `npm run lint` — Run ESLint on entire codebase
- `npm run preview` — Preview production build locally
- `npm test` — Run all tests once (Vitest)
- `npm run test:watch` — Run tests in watch mode

### Running Single Tests
```bash
npm test -- NameOfTest
# or
npx vitest run path/to/testfile.test.ts
```

## Architecture & Structure

### Tech Stack
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library (Radix UI primitives)
- **TanStack React Query** - Server state management
- **React Router v6** - Client-side routing
- **Vitest** - Unit testing
- **Playwright** - E2E testing (fixture configured)

### Directory Structure
```
src/
├── App.tsx                      # Root component with QueryClient, Router, Toasters
├── main.tsx                     # Entry point
├── pages/
│   ├── Index.tsx                # Main orchestrator with phase-based state machine
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── ui/                      # shadcn/ui components (buttons, forms, dialogs, etc.)
│   ├── onboarding/              # Multi-step profile creation flow
│   ├── auth/
│   │   └── AuthForm.tsx         # Login/signup with localStorage auth
│   ├── LoadingScreen.tsx        # Animated loading during AI generation
│   ├── DecisionOption.tsx
│   ├── InputCard.tsx
│   ├── NavLink.tsx
│   ├── PathSelector.tsx         # Life path selection screen
│   ├── ProfileDashboard.tsx     # View/edit profile after creation
│   ├── ProfileForm.tsx
│   ├── ResultCard.tsx
│   ├── ScenarioSetup.tsx        # Configure simulation mode, tenure, scenario
│   ├── SimulationHeader.tsx
│   └── SimulationView.tsx       # Displays year-by-year timeline
├── data/
│   └── simulations.ts           # Hardcoded 10-year narrative for each life path
├── types/
│   ├── profile.ts               # Core TypeScript interfaces & types
│   └── auth.ts                  # Auth user types & service interface
├── lib/
│   ├── utils.ts                 # cn classname utility (tailwind-merge)
│   ├── auth-storage.ts          # localStorage auth helpers
│   ├── claude-service.ts        # Claude API integration for narrative generation
│   ├── openai-service.ts        # OpenAI GPT-4o integration for narrative generation
│   ├── narrative-generator.ts   # Orchestrator: AI/static fallback, caching
│   ├── narrative-cache.ts       # localStorage cache with 24h TTL
│   └── personalization.ts       # Token replacement for static narratives
├── hooks/
│   ├── use-mobile.tsx           # Responsive utilities
│   └── use-toast.ts             # Toast notification integration
└── test/
    ├── example.test.ts
    └── setup.ts                 # Test setup (jsdom, matchMedia mock)
```

### Core Concepts

#### Phase-Based Navigation
The app uses a simple state machine in `src/pages/Index.tsx` with 7 phases:
- `auth` — Login/signup form (entry gate)
- `onboarding` — Multi-step form to create UserProfile
- `pathSelection` — Choose which life path to simulate (5 options)
- `scenarioSetup` — Configure duration, AI vs custom mode, select scenario
- `loading` — Narrative generation in progress (animated loading screen)
- `simulation` — View the generated year-by-year timeline
- `profile` — Review/edit profile details

#### Data Flow
1. User authenticates (stored in localStorage — client-side only, not a real backend)
2. User fills out `UserProfile` during onboarding (stored in Index state)
3. User selects a `LifePath` (love, career, financial, personal, alternate)
4. User configures simulation (mode, tenure, optional scenario)
5. `getOrGenerateNarrative()` orchestrates narrative generation (see below)
6. `SimulationView` displays the resulting timeline

#### Narrative Generation System
The app supports dual-mode storytelling via `src/lib/narrative-generator.ts`:

**AI Mode** — Calls external AI APIs to generate personalized narratives:
- Primary: Claude API via `src/lib/claude-service.ts` (uses `VITE_CLAUDE_API_KEY`)
- Alternatively: OpenAI API via `src/lib/openai-service.ts` (uses `VITE_OPENAI_API_KEY`, checked first)
- If neither is configured, falls back to enhanced static narratives with placeholder replacement

**Rock & Roll Mode** — Uses custom user prompts with procedurally generated narratives from pre-written templates (rebirth, supernatural, future, wealth, fame, general scenarios) in `src/lib/narrative-generator.ts`

**Caching** — Narratives are cached in localStorage for 24 hours via `src/lib/narrative-cache.ts`. Cache key is computed from profile hash, path, tenure, mode, and scenario details.

**Personalization** — `src/lib/personalization.ts` provides placeholder replacement (`{name}`, `{location}`, etc.) for static narratives.

**Key env vars** (see `.env.example`):
- `VITE_CLAUDE_API_KEY` — Required for AI mode with Claude
- `VITE_OPENAI_API_KEY` — If set, OpenAI GPT-4o is tried first before Claude

#### Simulation Data Structure
Each `LifePath` has a `SimulationData` object with:
- `title`, `subtitle` — Display text
- `summary` — Overview of the journey
- `years[]` — Array of 10 events (one per year) with:
  - `year` (1-10)
  - `title`
  - `text` — Narrative description
  - `mood` — "positive" | "neutral" | "challenging" | "transformative"

## Important Patterns & Conventions

### Imports
- Use `@/*` alias for src folder (configured in vite.config.ts)
  - Example: `import { UserProfile } from "@/types/profile"`
- shadcn/ui components use `@/components/ui` alias
- Keep imports organized: React first, then third-party, then project modules

### Styling
- **Tailwind CSS** with shadcn/ui's design tokens
- Utility classes use the `tw-` prefix NOT needed (standard Tailwind)
- Custom animations in `src/index.css`:
  - `animate-fade-in-up` — Used throughout for staggered reveals
- Components use `bg-card`, `text-foreground`, `border-border` for theme compatibility
- Dark mode supported via `next-themes` (though not actively used in current UI)

### Component Design
- Functional components with TypeScript interfaces for props
- Prefer composition over props drilling (keep prop interfaces small)
- Use Radix UI patterns for accessible interactive elements
- Maintain consistent spacing: `space-y-4`, `space-y-6`, `space-y-8`
- Button sizes: `size="sm"` for secondary actions, default for primary

### Forms & State
- Local component state with `useState`
- Profile state lifted to `Index.tsx` (simple global state)
- Use `react-hook-form` for form handling (see shadcn/ui form component)
- Form validation: check required fields using `requiredFields` array in onboardingSteps

### TypeScript
- Strict typing expected; avoid `any`
- Define interfaces in `src/types/` (e.g., `profile.ts`)
- Use `type` for unions, `interface` for objects
- Export `defaultProfile` as a template for new profiles

### Testing
- Unit tests with Vitest + React Testing Library
- Test files co-located in `src/test/` or alongside components with `.test.tsx`
- Use `describe`, `it`, `expect` patterns
- Mock external dependencies minimally; prefer testing pure functions
- E2E fixtures in `playwright.config.ts` using lovable-agent config

### Linting
- ESLint config in `eslint.config.js`
- Uses `typescript-eslint` and React plugins
- Runs automatically on commit? (check hooks)
- Fix lint errors: `npm run lint -- --fix`

### Paths & Aliases
```json
{
  "@/*": ["./src/*"],
  "@components/ui": "@/components/ui",
  "@lib/utils": "@/lib/utils"
}
```

## Special Files

### `components.json`
Generated by shadcn/ui CLI. Defines:
- Style: "default"
- Base color: "slate"
- CSS variables enabled
- Aliases for components, utils, ui, lib, hooks

Do not edit manually unless adding new shadcn components.

### `vite.config.ts`
- Host: "::" (IPv6, all interfaces)
- Port: 8080
- SWC plugin for React
- `@` alias for src
- Dedupe React packages
- `lovable-tagger` in dev mode (for Lovable platform integration)

### `tailwind.config.ts`
- Follows shadcn/ui defaults
- Content includes `./src/**/*.{ts,tsx}`

## Common Development Tasks

### Adding a new Life Path (e.g., "Health")
1. Add `type LifePath` extension in `src/types/profile.ts`
2. Create `healthSimulation: SimulationData` in `src/data/simulations.ts`
3. Add entry to `export const simulations` record
4. Add path card configuration in `src/components/PathSelector.tsx` (update `paths` array)
5. (Optional) Add scenarios in `generateScenarios` switch in `ScenarioSetup.tsx`

### Adding a new Onboarding Step
1. Edit `src/components/onboarding/onboardingSteps.ts`
2. Define step config: `title`, `subtitle`, `fields[]`, `requiredFields[]`
3. Update `stepLabels` in `OnboardingFlow.tsx` with new label
4. Adjust UI logic if needed for new field types

### Adding shadcn/ui component
```bash
npx shadcn-ui@latest add [component-name]
# e.g., npx shadcn-ui@latest add select
```
Commits the component to `src/components/ui/` and updates `components.json`.

### Modifying Simulation Narratives
Edit `src/data/simulations.ts`. Each path contains an array of 10 `YearEvent` objects. Keep:
- Year numbering 1-10
- `mood` values: "positive", "neutral", "challenging", "transformative"
- Length ~3-4 sentences for `text`

## Environment & Configuration

### Port
Development server runs on **http://localhost:8080**

### Node Version
Check `package.json` "engines" field if present. Current dependencies suggest Node 18+.

### Environment Variables
See `.env.example`. Two optional API keys:
- `VITE_CLAUDE_API_KEY` — Enables Claude API narrative generation
- `VITE_OPENAI_API_KEY` — Enables OpenAI GPT-4o (checked first if set)
Without either key, the app falls back to static templates with personalization

## Git Workflow

- Main branch: `main`
- Recent commits show work on "dual simulation modes" — maintain that feature's integrity

No specific commit message format enforced, but be descriptive.

## Known Issues & Gotchas

- `tsconfig.json` has `strictNullChecks: false` and `noUnusedLocals: false` — consider tightening
- Animations use CSS custom properties not defined in Tailwind config; they work via global styles
- AI API keys are exposed client-side via Vite env vars — NOT secure for production; need a backend proxy
- Auth is client-side only (localStorage); users and passwords are stored in plaintext
- Profile data is transient (lost on refresh)
- Profile hash in `narrative-cache.ts` is a simple string hash, not cryptographic
- `narrative-generator.ts` uses `any` types in several places — could be tightened

## References

- [Vite Docs](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)

## For Future Claude Instances

When working on this repository:
- Preserve the clean, minimalist UI aesthetic (shadcn/default slate theme)
- Maintain the phase-based navigation pattern
- Add new life paths by following the `SimulationData` pattern
- Narrative generation flows through `getOrGenerateNarrative()` in `narrative-generator.ts`
- New AI providers should return `NarrativeResult` and plug into the generator's try/fallback chain
- Write tests for new logic, especially in `src/data/` and `src/lib/` transformations
- Keep component prop interfaces minimal and well-documented
- Use existing shadcn/ui components rather than building custom ones
- Animations should use `animate-fade-in-up` class for consistency
