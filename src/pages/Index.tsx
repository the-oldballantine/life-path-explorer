import { useState } from "react";
import SimulationHeader from "@/components/SimulationHeader";
import InputCard from "@/components/InputCard";
import ResultCard from "@/components/ResultCard";

const Index = () => {
  const [name, setName] = useState("");
  const [decision, setDecision] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState(0);

  const handleSimulate = () => {
    setResultKey((k) => k + 1);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-2xl space-y-10">
        <SimulationHeader />
        <InputCard
          name={name}
          decision={decision}
          onNameChange={setName}
          onDecisionChange={setDecision}
          onSimulate={handleSimulate}
        />
        {showResult && (
          <ResultCard key={resultKey} name={name} decision={decision} />
        )}
      </div>
    </div>
  );
};

export default Index;
