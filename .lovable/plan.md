

# Parallel Life Simulator — Professional AI Decision Platform

## Design System
- **Dark theme** with deep blacks (`#09090b`), charcoal (`#18181b`), muted grays
- **Accent**: subtle blue-violet (`hsl(250, 60%, 55%)`) used sparingly for interactive elements
- **Typography**: clean hierarchy — large bold headlines, medium subheadings, regular body text
- **Spacing**: generous whitespace, centered container (max-width ~800px), grid-based

## Page Structure

### 1. Header Section
- Small uppercase label: "AI SIMULATION PLATFORM" in muted text with a subtle accent dot
- Large headline: "Explore Alternate Paths of Your Life" — bold, white, strong presence
- Subheading beneath in muted gray, one line
- Subtle horizontal divider line below

### 2. Input Card
- Clean dark card with subtle border (`border-zinc-800`)
- **Name input**: minimal dark input field with label
- **Decision selector**: two selectable cards side by side — "Pursue a stable career" and "Build a startup" — with subtle border highlight on selection
- **"Run Simulation" button**: solid accent-colored button, slight scale on hover, no glow

### 3. Result Section (appears after clicking Run Simulation)
- Fade-in animation (CSS transition)
- Dark card with report-style typography
- Title: "Simulation Result" with the user's name
- Body text: a mock AI-generated life outcome paragraph
- Small metadata tags at bottom: "Risk Level: Moderate", "Outcome Type: Career Growth" — pill-style badges in muted colors

## Components to Create
- `SimulationHeader` — top section with label, headline, subheading
- `InputCard` — name input + decision selector + button
- `DecisionOption` — selectable card for each life direction
- `ResultCard` — simulation output with tags and fade-in
- Update `Index.tsx` to compose everything with dark background and state management

## Responsive
- Desktop-first centered layout, stacks vertically on mobile
- Decision cards go from side-by-side to stacked on small screens

## Interactions
- Local React state for name, selected decision, and result visibility
- Clicking "Run Simulation" shows the result card with a smooth fade-in
- Mock result text based on selected decision

