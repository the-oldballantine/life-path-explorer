interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="flex flex-col items-center">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-8 bg-primary"
                  : i < currentStep
                  ? "w-2 bg-primary/60"
                  : "w-2 bg-border"
              }`}
            />
            <span
              className={`text-[10px] mt-1.5 transition-colors ${
                i === currentStep
                  ? "text-primary font-medium"
                  : i < currentStep
                  ? "text-muted-foreground"
                  : "text-muted-foreground/40"
              }`}
            >
              {labels[i]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
