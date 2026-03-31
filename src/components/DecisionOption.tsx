import { cn } from "@/lib/utils";
import { Briefcase, Rocket } from "lucide-react";

interface DecisionOptionProps {
  value: string;
  label: string;
  description: string;
  icon: "career" | "startup";
  selected: boolean;
  onSelect: (value: string) => void;
}

const icons = {
  career: Briefcase,
  startup: Rocket,
};

const DecisionOption = ({ value, label, description, icon, selected, onSelect }: DecisionOptionProps) => {
  const Icon = icons[icon];

  return (
    <button
      onClick={() => onSelect(value)}
      className={cn(
        "flex-1 p-4 rounded-lg border text-left transition-all duration-200",
        "bg-secondary/50 hover:bg-secondary",
        selected
          ? "border-primary/60 ring-1 ring-primary/30"
          : "border-border hover:border-muted-foreground/30"
      )}
    >
      <Icon className="h-4 w-4 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </button>
  );
};

export default DecisionOption;
