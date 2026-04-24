import { Button } from "@/components/ui/button";
import { Sparkles, Cpu, PenLine } from "lucide-react";

interface LoadingScreenProps {
  mode: "ai" | "rockandroll";
  customPrompt?: string;
  onCancel?: () => void;
}

const LoadingScreen = ({ mode, customPrompt, onCancel }: LoadingScreenProps) => {
  const getMessage = () => {
    switch (mode) {
      case "ai":
        return "Claude is crafting your personalized narrative...";
      case "rockandroll":
        return "Preparing your custom scenario...";
      default:
        return "Generating your simulation...";
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "ai":
        return <Cpu className="h-8 w-8 text-primary animate-pulse" />;
      case "rockandroll":
        return <PenLine className="h-8 w-8 text-primary animate-pulse" />;
      default:
        return <Sparkles className="h-8 w-8 text-primary animate-pulse" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 animate-fade-in-up">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">{getIcon()}</div>
          <h2 className="text-2xl font-semibold text-foreground">Generating Your Story</h2>
          <p className="text-sm text-muted-foreground">{getMessage()}</p>
        </div>

        {customPrompt && mode === "rockandroll" && (
          <div className="rounded-xl border border-border bg-card p-4 text-left">
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">
              Your Scenario
            </p>
            <p className="text-sm text-muted-foreground italic">"{customPrompt}"</p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
          </div>
          <p className="text-xs text-muted-foreground/60">This usually takes 5-10 seconds</p>
        </div>

        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-muted-foreground">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
