import { UserProfile, LifePath } from "@/types/profile";
import { Heart, Briefcase, Wallet, User, Shuffle, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PathSelectorProps {
  profile: UserProfile;
  onSelect: (path: LifePath) => void;
  onViewProfile: () => void;
}

const paths: {
  id: LifePath;
  label: string;
  description: string;
  icon: typeof Heart;
  detail: string;
}[] = [
  {
    id: "love",
    label: "Love Life",
    description: "Relationships, emotional growth & connections",
    icon: Heart,
    detail: "Explore how your relationships evolve — from first connections to deep partnerships, heartbreaks, and the emotional milestones that define your personal life.",
  },
  {
    id: "career",
    label: "Career Growth",
    description: "Professional journey, promotions & pivots",
    icon: Briefcase,
    detail: "Simulate your career trajectory — job changes, promotions, entrepreneurial leaps, industry shifts, and the professional decisions that compound over time.",
  },
  {
    id: "financial",
    label: "Financial Future",
    description: "Wealth building, investments & security",
    icon: Wallet,
    detail: "See how your financial decisions play out — savings strategies, investment choices, major purchases, and the path to financial independence or struggle.",
  },
  {
    id: "personal",
    label: "Personal Growth",
    description: "Self-discovery, health & fulfillment",
    icon: User,
    detail: "Trace your journey of self-improvement — mental health, habits, lifestyle changes, personal milestones, and the evolution of who you become.",
  },
  {
    id: "alternate",
    label: "Alternate Life",
    description: "What if you took a completely different path?",
    icon: Shuffle,
    detail: "Explore a radically different version of your life — what if you moved abroad, changed your career entirely, or made the opposite choice at every crossroad?",
  },
];

const PathSelector = ({ profile, onSelect }: PathSelectorProps) => {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Simulation Ready
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome, {profile.name}.
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Your profile is locked in. Now choose which dimension of your life you want to explore. Each simulation is uniquely shaped by who you are.
          </p>
        </div>

        {/* Path Cards */}
        <div className="grid gap-3">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <button
                key={path.id}
                onClick={() => onSelect(path.id)}
                className="group w-full text-left rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {path.label}
                      </h3>
                      <span className="text-xs text-muted-foreground/60">
                        {path.description}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground/80">
                      {path.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PathSelector;
