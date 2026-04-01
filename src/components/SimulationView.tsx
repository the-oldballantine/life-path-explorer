import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserProfile, LifePath } from "@/types/profile";
import { simulations, YearEvent } from "@/data/simulations";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface SimulationViewProps {
  profile: UserProfile;
  path: LifePath;
  onBack: () => void;
  onRestart: () => void;
}

const moodColors: Record<YearEvent["mood"], string> = {
  positive: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  neutral: "bg-secondary text-muted-foreground border-border",
  challenging: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  transformative: "bg-primary/15 text-primary border-primary/20",
};

const moodLabels: Record<YearEvent["mood"], string> = {
  positive: "Growth Phase",
  neutral: "Steady Phase",
  challenging: "Challenge Phase",
  transformative: "Turning Point",
};

const SimulationView = ({ profile, path, onBack, onRestart }: SimulationViewProps) => {
  const sim = simulations[path];

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-3xl space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Choose Different Path
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            New Profile
          </Button>
        </div>

        {/* Header */}
        <div className="animate-fade-in-up space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Simulation Active
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {profile.name}'s {sim.title}
          </h1>
          <p className="text-sm text-muted-foreground">{sim.subtitle}</p>
        </div>

        {/* Profile Summary Card */}
        <div
          className="rounded-xl border border-border bg-card p-5 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Profile Snapshot
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {profile.age} years old
            </Badge>
            {profile.workStatus && (
              <Badge variant="secondary" className="text-xs font-normal capitalize">
                {profile.workStatus}
              </Badge>
            )}
            {profile.industry && (
              <Badge variant="secondary" className="text-xs font-normal capitalize">
                {profile.industry}
              </Badge>
            )}
            {profile.personality && (
              <Badge variant="secondary" className="text-xs font-normal capitalize">
                {profile.personality}
              </Badge>
            )}
            {profile.riskAppetite && (
              <Badge variant="secondary" className="text-xs font-normal capitalize">
                Risk: {profile.riskAppetite}
              </Badge>
            )}
            {profile.location && (
              <Badge variant="secondary" className="text-xs font-normal">
                {profile.location}
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <div
          className="rounded-xl border border-border bg-card p-6 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {sim.summary}
          </p>
        </div>

        <Separator className="bg-border/50" />

        {/* Year-by-Year Timeline */}
        <div>
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Year-by-Year Journey
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

            <div className="space-y-8">
              {sim.years.map((yr, i) => (
                <div
                  key={yr.year}
                  className="relative pl-10 animate-fade-in-up"
                  style={{ animationDelay: `${300 + i * 80}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 bg-background ${
                      yr.mood === "transformative"
                        ? "border-primary"
                        : yr.mood === "positive"
                        ? "border-emerald-500"
                        : yr.mood === "challenging"
                        ? "border-amber-500"
                        : "border-muted-foreground/30"
                    }`}
                  />

                  <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-primary tracking-wider">
                          YEAR {yr.year}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground">
                          {yr.title}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${moodColors[yr.mood]}`}
                      >
                        {moodLabels[yr.mood]}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {yr.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* End Card */}
        <div
          className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3 animate-fade-in-up"
          style={{ animationDelay: "1200ms" }}
        >
          <p className="text-sm font-medium text-foreground">
            End of Simulation
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            This was one possible version of your future. Want to explore a different path or start fresh with a new profile?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={onBack}>
              Try Another Path
            </Button>
            <Button size="sm" onClick={onRestart}>
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;
