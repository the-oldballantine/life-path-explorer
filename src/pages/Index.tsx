import { useState } from "react";
import SimulationHeader from "@/components/SimulationHeader";
import InputCard from "@/components/InputCard";
import ResultCard from "@/components/ResultCard";
import { ProfileData, defaultProfile } from "@/components/ProfileForm";

const Index = () => {
  const [mode, setMode] = useState<"quick" | "detailed">("quick");
  const [name, setName] = useState("");
  const [decision, setDecision] = useState("");
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState(0);

  const handleSimulate = () => {
    setResultKey((k) => k + 1);
    setShowResult(true);
  };

  const resultName = mode === "detailed" ? profile.name : name;
  const resultDecision = mode === "detailed" ? profile.career : decision;

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-2xl space-y-10">
        <SimulationHeader />
        <InputCard
          mode={mode}
          onModeChange={setMode}
          name={name}
          decision={decision}
          onNameChange={setName}
          onDecisionChange={setDecision}
          profile={profile}
          onProfileChange={setProfile}
          onSimulate={handleSimulate}
        />
        {showResult && (
          <ResultCard key={resultKey} name={resultName} decision={resultDecision} />
        )}
      </div>
    </div>
  );
};

export default Index;
