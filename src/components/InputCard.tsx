import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DecisionOption from "@/components/DecisionOption";
import ProfileForm, { ProfileData } from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputCardProps {
  mode: "quick" | "detailed";
  onModeChange: (mode: "quick" | "detailed") => void;
  name: string;
  decision: string;
  onNameChange: (name: string) => void;
  onDecisionChange: (decision: string) => void;
  profile: ProfileData;
  onProfileChange: (profile: ProfileData) => void;
  onSimulate: () => void;
}

const InputCard = ({
  mode,
  onModeChange,
  name,
  decision,
  onNameChange,
  onDecisionChange,
  profile,
  onProfileChange,
  onSimulate,
}: InputCardProps) => {
  const isQuickDisabled = !name.trim() || !decision;
  const isDetailedDisabled = !profile.name.trim() || !profile.career;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <Tabs value={mode} onValueChange={(v) => onModeChange(v as "quick" | "detailed")}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
          <TabsTrigger value="quick" className="text-xs">Quick Simulation</TabsTrigger>
          <TabsTrigger value="detailed" className="text-xs">Detailed Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-muted-foreground">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="bg-secondary/50 border-border focus-visible:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Choose a Life Direction</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <DecisionOption
                value="career"
                label="Pursue a stable career"
                description="Security, growth, structure"
                icon="career"
                selected={decision === "career"}
                onSelect={onDecisionChange}
              />
              <DecisionOption
                value="startup"
                label="Build a startup"
                description="Risk, autonomy, innovation"
                icon="startup"
                selected={decision === "startup"}
                onSelect={onDecisionChange}
              />
            </div>
          </div>

          <Button
            onClick={onSimulate}
            disabled={isQuickDisabled}
            className="w-full h-11 font-medium transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
          >
            Run Simulation
          </Button>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6 space-y-6">
          <ProfileForm profile={profile} onChange={onProfileChange} />
          <Separator className="bg-border/50" />
          <Button
            onClick={onSimulate}
            disabled={isDetailedDisabled}
            className="w-full h-11 font-medium transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
          >
            Run Detailed Simulation
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InputCard;
