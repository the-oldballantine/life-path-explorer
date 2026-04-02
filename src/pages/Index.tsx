import { useState } from "react";
import { UserProfile, defaultProfile, LifePath, AppPhase, SimulationTenure, ScenarioOption, SimulationMode } from "@/types/profile";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import PathSelector from "@/components/PathSelector";
import ScenarioSetup from "@/components/ScenarioSetup";
import SimulationView from "@/components/SimulationView";
import ProfileDashboard from "@/components/ProfileDashboard";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("onboarding");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedPath, setSelectedPath] = useState<LifePath | null>(null);
  const [tenure, setTenure] = useState<SimulationTenure>(5);
  const [scenario, setScenario] = useState<ScenarioOption | null>(null);
  const [simMode, setSimMode] = useState<SimulationMode>("ai");
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const handleOnboardingComplete = () => {
    setPhase("pathSelection");
  };

  const handlePathSelect = (path: LifePath) => {
    setSelectedPath(path);
    setPhase("scenarioSetup");
  };

  const handleScenarioStart = (t: SimulationTenure, s: ScenarioOption | null, mode: SimulationMode, prompt: string) => {
    setTenure(t);
    setScenario(s);
    setSimMode(mode);
    setCustomPrompt(prompt);
    setPhase("simulation");
  };

  const handleBackToSelection = () => {
    setPhase("pathSelection");
    setSelectedPath(null);
    setScenario(null);
    setCustomPrompt("");
  };

  const handleBackToScenario = () => {
    setPhase("scenarioSetup");
  };

  const handleRestart = () => {
    setProfile(defaultProfile);
    setSelectedPath(null);
    setScenario(null);
    setPhase("onboarding");
  };

  const handleOpenProfile = () => {
    setPhase("profile");
  };

  const handleProfileSimulate = (path: LifePath) => {
    setSelectedPath(path);
    setPhase("scenarioSetup");
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
    return (
      <PathSelector
        profile={profile}
        onSelect={handlePathSelect}
        onViewProfile={handleOpenProfile}
      />
    );
  }

  if (phase === "scenarioSetup" && selectedPath) {
    return (
      <ScenarioSetup
        profile={profile}
        path={selectedPath}
        onStart={handleScenarioStart}
        onBack={handleBackToSelection}
      />
    );
  }

  if (phase === "simulation" && selectedPath) {
    return (
      <SimulationView
        profile={profile}
        path={selectedPath}
        tenure={tenure}
        scenario={scenario}
        simulationMode={simMode}
        customPrompt={customPrompt}
        onBack={handleBackToScenario}
        onRestart={handleRestart}
        onViewProfile={handleOpenProfile}
      />
    );
  }

  if (phase === "profile") {
    return (
      <ProfileDashboard
        profile={profile}
        onUpdate={setProfile}
        onSimulate={handleProfileSimulate}
        onBack={handleBackToSelection}
      />
    );
  }

  return null;
};

export default Index;
