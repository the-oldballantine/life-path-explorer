import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DecisionOption from "@/components/DecisionOption";

interface InputCardProps {
  name: string;
  decision: string;
  onNameChange: (name: string) => void;
  onDecisionChange: (decision: string) => void;
  onSimulate: () => void;
}

const InputCard = ({ name, decision, onNameChange, onDecisionChange, onSimulate }: InputCardProps) => {
  const isDisabled = !name.trim() || !decision;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
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
        disabled={isDisabled}
        className="w-full h-11 font-medium transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
      >
        Run Simulation
      </Button>
    </div>
  );
};

export default InputCard;
