import { useState, useEffect, useCallback } from "react";
import { UserProfile, defaultProfile, LifePath, AppPhase, SimulationTenure, ScenarioOption, SimulationMode } from "@/types/profile";
import { getOrGenerateNarrative } from "@/lib/narrative-generator";
import { getUserFromStorage, clearAuthFromStorage } from "@/lib/auth-storage";
import * as api from "@/lib/api";
import type { NarrativeHistoryItem } from "@/components/ProfileDashboard";
import { SimulationData } from "@/data/simulations";
import AuthForm from "@/components/auth/AuthForm";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import PathSelector from "@/components/PathSelector";
import ScenarioSetup from "@/components/ScenarioSetup";
import LoadingScreen from "@/components/LoadingScreen";
import SimulationView from "@/components/SimulationView";
import ProfileDashboard from "@/components/ProfileDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("onboarding");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedPath, setSelectedPath] = useState<LifePath | null>(null);
  const [tenure, setTenure] = useState<SimulationTenure>(5);
  const [scenario, setScenario] = useState<ScenarioOption | null>(null);
  const [simMode, setSimMode] = useState<SimulationMode>("ai");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [generatedNarrative, setGeneratedNarrative] = useState<SimulationData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [narrativeHistory, setNarrativeHistory] = useState<NarrativeHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Check for existing auth on mount
  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      setAuthUser(user);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = useCallback((user: api.AuthUser) => {
    setAuthUser(user);
    setProfile(defaultProfile);
    setSelectedPath(null);
    setScenario(null);
    setPhase("onboarding");
  }, []);

  const handleLogout = useCallback(async () => {
    clearAuthFromStorage();
    setAuthUser(null);
    setProfile(defaultProfile);
    setSelectedPath(null);
    setScenario(null);
    setTenure(5);
    setSimMode("ai");
    setCustomPrompt("");
    setPhase("auth");
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await api.saveProfile({
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        location: profile.location,
        schooling: profile.schooling,
        college: profile.college,
        degree: profile.degree,
        workStatus: profile.workStatus,
        industry: profile.industry,
        yearsExperience: profile.yearsExperience,
        familyStructure: profile.familyStructure,
        financialCondition: profile.financialCondition,
        familyRelationship: profile.familyRelationship,
        personality: profile.personality,
        riskAppetite: profile.riskAppetite,
        decisionStyle: profile.decisionStyle,
        discipline: profile.discipline,
        interests: profile.interests,
        hobbies: profile.hobbies,
        relationshipStatus: profile.relationshipStatus,
        lifeGoals: profile.lifeGoals,
        currentChallenges: profile.currentChallenges,
      });
    } catch (err) {
      console.warn("Failed to save profile to backend:", err);
    }
    setPhase("pathSelection");
  };

  const handlePathSelect = (path: LifePath) => {
    setSelectedPath(path);
    setPhase("scenarioSetup");
  };

  const handleScenarioStart = async (t: SimulationTenure, s: ScenarioOption | null, mode: SimulationMode, prompt: string) => {
    setTenure(t);
    setScenario(s);
    setSimMode(mode);
    setCustomPrompt(prompt);
    setGeneratedNarrative(null);
    setIsGenerating(true);
    setGenerationError(null);
    setPhase("loading");

    try {
      console.log(`Starting ${mode} simulation with tenure ${t}, scenario:`, s?.title, 'prompt length:', prompt?.length);

      const narrative = await getOrGenerateNarrative({
        profile,
        path: selectedPath!,
        tenure: t,
        scenario: s,
        mode,
        customPrompt: prompt || undefined,
        bypassCache: mode === 'ai' || !!prompt
      });
      console.log('Narrative generated:', narrative);

      setGeneratedNarrative(narrative);
      setIsGenerating(false);
      setPhase("simulation");
    } catch (error) {
      console.error("Failed to generate narrative:", error);
      setIsGenerating(false);
      setGenerationError(error instanceof Error ? error.message : String(error));
      setPhase("scenarioSetup");
    }
  };

  const handleBackToSelection = () => {
    setPhase("pathSelection");
    setSelectedPath(null);
    setScenario(null);
    setCustomPrompt("");
    setGeneratedNarrative(null);
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

  const loadNarrativeHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const narratives = await api.fetchNarratives();
      setNarrativeHistory(narratives);
    } catch (err) {
      console.warn("Failed to load narrative history:", err);
    }
    setIsLoadingHistory(false);
  }, []);

  const handleOpenProfile = () => {
    loadNarrativeHistory();
    setPhase("profile");
  };

  const handleReplay = useCallback(async (narrative: NarrativeHistoryItem) => {
    // Load saved narrative from history (no re-generation needed)
    const years = JSON.parse(narrative.years);
    if (!Array.isArray(years) || years.length === 0) {
      console.warn("Narrative has no year data");
      return;
    }
    setSelectedPath(narrative.path as LifePath);
    setTenure(narrative.tenure as SimulationTenure);
    setGeneratedNarrative({
      title: narrative.title,
      subtitle: narrative.subtitle,
      summary: narrative.summary,
      years,
    });
    setPhase("simulation");
  }, []);

  const handleProfileSimulate = (path: LifePath) => {
    setSelectedPath(path);
    setPhase("scenarioSetup");
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth gate: show auth form if not logged in
  if (!authUser) {
    return (
      <AuthForm
        onSuccess={handleLogin}
      />
    );
  }

  // User is authenticated - show app based on phase
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

  if (phase === "scenarioSetup") {
    // If we somehow got here without a selectedPath, go back to path selection
    if (!selectedPath) {
      console.warn('ScenarioSetup phase reached without selectedPath, redirecting to pathSelection');
      setPhase("pathSelection");
      return null;
    }
    return (
      <ScenarioSetup
        profile={profile}
        path={selectedPath}
        onStart={handleScenarioStart}
        onBack={handleBackToSelection}
        error={generationError}
      />
    );
  }

  if (phase === "loading") {
    if (!selectedPath) {
      console.warn('Loading phase reached without selectedPath, redirecting to pathSelection');
      setPhase("pathSelection");
      return null;
    }
    return (
      <LoadingScreen
        mode={simMode}
        customPrompt={customPrompt}
        onCancel={() => {
          setIsGenerating(false);
          setPhase("scenarioSetup");
        }}
      />
    );
  }

  if (phase === "simulation") {
    if (!selectedPath) {
      console.warn('Simulation phase reached without selectedPath, redirecting to pathSelection');
      setPhase("pathSelection");
      return null;
    }
    return (
      <SimulationView
        profile={profile}
        path={selectedPath}
        tenure={tenure}
        scenario={scenario}
        simulationMode={simMode}
        customPrompt={customPrompt}
        narrative={generatedNarrative}
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
        onLogout={handleLogout}
        narratives={narrativeHistory}
        isLoadingNarratives={isLoadingHistory}
        onReplay={handleReplay}
      />
    );
  }

  // Unknown phase - show error instead of blank page
  console.error('Unknown phase:', phase);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          Unknown application state: {phase}. Returning to home...
        </p>
        <Button onClick={() => setPhase("pathSelection")}>Go to Start</Button>
      </div>
    </div>
  );
};

export default Index;
