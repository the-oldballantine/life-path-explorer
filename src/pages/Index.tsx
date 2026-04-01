import { useState } from "react";
import { UserProfile, defaultProfile, LifePath, AppPhase } from "@/types/profile";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import PathSelector from "@/components/PathSelector";
import SimulationView from "@/components/SimulationView";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("onboarding");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedPath, setSelectedPath] = useState<LifePath | null>(null);

  const handleOnboardingComplete = () => {
    setPhase("pathSelection");
  };

  const handlePathSelect = (path: LifePath) => {
    setSelectedPath(path);
    setPhase("simulation");
  };

  const handleBackToSelection = () => {
    setPhase("pathSelection");
    setSelectedPath(null);
  };

  const handleRestart = () => {
    setProfile(defaultProfile);
    setSelectedPath(null);
    setPhase("onboarding");
  };

  if (phase === "onboarding") {
    return (
      <OnboardingFlow
        profile={profile}
        onChange={setProfile}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  if (phase === "pathSelection") {
    return <PathSelector profile={profile} onSelect={handlePathSelect} />;
  }

  if (phase === "simulation" && selectedPath) {
    return (
      <SimulationView
        profile={profile}
        path={selectedPath}
        onBack={handleBackToSelection}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;
