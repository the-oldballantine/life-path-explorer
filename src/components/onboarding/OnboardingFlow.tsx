import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import StepIndicator from "./StepIndicator";
import OnboardingStep from "./OnboardingStep";
import { onboardingSteps } from "./onboardingSteps";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface OnboardingFlowProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  onComplete: () => void;
}

const stepLabels = ["You", "Education", "Career", "Family", "Personality", "Interests", "Goals"];

const OnboardingFlow = ({ profile, onChange, onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);
  const currentConfig = onboardingSteps[step];

  const handleFieldChange = (key: string, value: string) => {
    onChange({ ...profile, [key]: value });
  };

  const isStepValid = currentConfig.requiredFields.every(
    (field) => (profile[field as keyof UserProfile] || "").trim() !== ""
  );

  const isLastStep = step === onboardingSteps.length - 1;

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand header */}
        <div className="text-center mb-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Parallel Life Simulator
          </div>
          <p className="text-sm text-muted-foreground/70">
            Step {step + 1} of {onboardingSteps.length}
          </p>
        </div>

        <StepIndicator
          currentStep={step}
          totalSteps={onboardingSteps.length}
          labels={stepLabels}
        />

        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <OnboardingStep
            key={step}
            title={currentConfig.title}
            subtitle={currentConfig.subtitle}
            fields={currentConfig.fields}
            values={profile as unknown as Record<string, string>}
            onChange={handleFieldChange}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            {isLastStep ? (
              <Button
                onClick={onComplete}
                disabled={!isStepValid}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Begin Simulation
              </Button>
            ) : (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!isStepValid}
                size="sm"
                className="gap-1"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
