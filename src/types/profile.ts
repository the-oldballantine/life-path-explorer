export interface UserProfile {
  // Personal
  name: string;
  age: string;
  gender: string;
  location: string;

  // Education
  schooling: string;
  college: string;
  degree: string;

  // Career
  workStatus: string;
  industry: string;
  yearsExperience: string;

  // Family
  familyStructure: string;
  financialCondition: string;
  familyRelationship: string;

  // Personality
  personality: string;
  riskAppetite: string;
  decisionStyle: string;
  discipline: string;

  // Interests
  interests: string;
  hobbies: string;

  // Relationships & Goals
  relationshipStatus: string;
  lifeGoals: string;
  currentChallenges: string;
}

export const defaultProfile: UserProfile = {
  name: "",
  age: "",
  gender: "",
  location: "",
  schooling: "",
  college: "",
  degree: "",
  workStatus: "",
  industry: "",
  yearsExperience: "",
  familyStructure: "",
  financialCondition: "",
  familyRelationship: "",
  personality: "",
  riskAppetite: "",
  decisionStyle: "",
  discipline: "",
  interests: "",
  hobbies: "",
  relationshipStatus: "",
  lifeGoals: "",
  currentChallenges: "",
};

export type LifePath = "love" | "career" | "financial" | "personal" | "alternate";

export type AppPhase = "onboarding" | "pathSelection" | "simulation";
