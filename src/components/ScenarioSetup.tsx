import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile, LifePath, SimulationTenure, ScenarioOption } from "@/types/profile";
import { ArrowLeft, Clock, Zap, Shuffle } from "lucide-react";

interface ScenarioSetupProps {
  profile: UserProfile;
  path: LifePath;
  onStart: (tenure: SimulationTenure, scenario: ScenarioOption | null) => void;
  onBack: () => void;
}

const pathLabels: Record<LifePath, string> = {
  love: "Love Life",
  career: "Career Growth",
  financial: "Financial Future",
  personal: "Personal Growth",
  alternate: "Alternate Life",
};

function generateScenarios(profile: UserProfile, path: LifePath): ScenarioOption[] {
  const scenarios: Record<LifePath, ScenarioOption[]> = {
    love: [
      {
        id: "love-1",
        title: "The Unexpected Connection",
        description: "You meet someone through a completely unrelated interest",
        twist: `Your ${profile.hobbies || "hobby"} leads to an unexpected romantic connection that challenges everything you thought you wanted.`,
      },
      {
        id: "love-2",
        title: "The Long-Distance Leap",
        description: "A career opportunity forces a relationship test",
        twist: `A dream opportunity in another city tests whether love can survive distance and ambition.`,
      },
      {
        id: "love-3",
        title: "The Second Chance",
        description: "Someone from your past re-enters your life",
        twist: `An old connection resurfaces at the most unexpected time, forcing you to choose between comfort and growth.`,
      },
    ],
    career: [
      {
        id: "career-1",
        title: "The Startup Gamble",
        description: "You leave stability to build something of your own",
        twist: `With ${profile.yearsExperience || "your"} years of experience in ${profile.industry || "your field"}, you take the leap into entrepreneurship.`,
      },
      {
        id: "career-2",
        title: "The Industry Pivot",
        description: "A completely new field calls your name",
        twist: `Your ${profile.interests || "interests"} open a door to a career you never considered — one that aligns more with who you really are.`,
      },
      {
        id: "career-3",
        title: "The Leadership Fast-Track",
        description: "An accelerated path to the top with high stakes",
        twist: `A senior leader sees potential in you and offers mentorship — but the pace is relentless and the expectations are brutal.`,
      },
      {
        id: "career-4",
        title: "The Remote Revolution",
        description: "You build a location-independent career",
        twist: `Working from ${profile.location || "anywhere"}, you architect a career that prioritizes freedom over title.`,
      },
    ],
    financial: [
      {
        id: "fin-1",
        title: "The Aggressive Investor",
        description: "You go all-in on high-risk, high-reward bets",
        twist: `With a ${profile.riskAppetite || "calculated"} approach, you allocate heavily into emerging markets and alternative assets.`,
      },
      {
        id: "fin-2",
        title: "The Side-Income Builder",
        description: "Multiple income streams become your strategy",
        twist: `Your ${profile.interests || "skills"} become monetizable side projects that compound over time.`,
      },
      {
        id: "fin-3",
        title: "The Frugal Path to Freedom",
        description: "Extreme savings rate accelerates independence",
        twist: `Living well below your means from a ${profile.financialCondition || "middle class"} background, you pursue financial independence in record time.`,
      },
    ],
    personal: [
      {
        id: "personal-1",
        title: "The Complete Reinvention",
        description: "You rebuild your identity from the ground up",
        twist: `As a ${profile.personality || "complex"} person, you challenge every assumption about who you are and who you could become.`,
      },
      {
        id: "personal-2",
        title: "The Health Transformation",
        description: "A health crisis becomes a catalyst for change",
        twist: `Physical and mental health become your primary focus, reshaping every other area of your life.`,
      },
      {
        id: "personal-3",
        title: "The Community Builder",
        description: "You find purpose through connection",
        twist: `From ${profile.location || "your city"}, you build a community that gives your life unexpected meaning and direction.`,
      },
    ],
    alternate: [
      {
        id: "alt-1",
        title: "The Opposite Choice",
        description: "Every major decision goes the other way",
        twist: `What if a ${profile.personality || "different"} version of you made the exact opposite choice at every crossroad?`,
      },
      {
        id: "alt-2",
        title: "The Geographic Reset",
        description: "You move to a completely different environment",
        twist: `Leaving ${profile.location || "home"} behind, you start over in a place where nobody knows your name.`,
      },
      {
        id: "alt-3",
        title: "The Passion-First Life",
        description: "Money takes a backseat to meaning",
        twist: `Your ${profile.hobbies || "deepest interests"} become the center of your life, regardless of financial outcome.`,
      },
    ],
  };

  return scenarios[path] || [];
}

const tenureOptions: { value: SimulationTenure; label: string; description: string }[] = [
  { value: 3, label: "3 Years", description: "Short-term outlook" },
  { value: 5, label: "5 Years", description: "Medium-term trajectory" },
  { value: 10, label: "10 Years", description: "Full decade simulation" },
];

const ScenarioSetup = ({ profile, path, onStart, onBack }: ScenarioSetupProps) => {
  const [tenure, setTenure] = useState<SimulationTenure>(5);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const scenarios = generateScenarios(profile, path);

  const handleStart = () => {
    const scenario = scenarios.find((s) => s.id === selectedScenario) || null;
    onStart(tenure, scenario);
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in-up">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Path Selection
        </Button>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Configure Simulation
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {pathLabels[path]} — Setup
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose your simulation timeline and optionally pick a scenario to explore.
          </p>
        </div>

        {/* Tenure Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Simulation Duration
          </div>
          <div className="grid grid-cols-3 gap-3">
            {tenureOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTenure(opt.value)}
                className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                  tenure === opt.value
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <p className={`text-lg font-bold ${tenure === opt.value ? "text-primary" : "text-foreground"}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Paths */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            <Shuffle className="h-3.5 w-3.5" />
            Scenario Paths — Optional
          </div>
          <p className="text-xs text-muted-foreground/70">
            Pick a specific scenario derived from your profile, or skip to run the default simulation.
          </p>
          <div className="grid gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() =>
                  setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)
                }
                className={`w-full text-left rounded-xl border p-5 transition-all duration-200 ${
                  selectedScenario === scenario.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{scenario.title}</h3>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">{scenario.twist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleStart} className="gap-2">
            <Zap className="h-4 w-4" />
            Run {tenure}-Year Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSetup;
