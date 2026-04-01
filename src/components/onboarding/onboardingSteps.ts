import { FieldConfig } from "./OnboardingStep";

export interface StepConfig {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  requiredFields: string[];
}

export const onboardingSteps: StepConfig[] = [
  {
    title: "Let's start with who you are",
    subtitle: "Tell us a bit about yourself — this helps us craft a simulation that feels real.",
    requiredFields: ["name", "age", "gender"],
    fields: [
      { key: "name", label: "What's your name?", type: "text", placeholder: "Your first name" },
      { key: "age", label: "How old are you?", type: "number", placeholder: "e.g. 22" },
      {
        key: "gender",
        label: "Gender",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "nonbinary", label: "Non-binary" },
          { value: "prefer-not", label: "Prefer not to say" },
        ],
      },
      {
        key: "location",
        label: "Where do you live?",
        type: "text",
        placeholder: "e.g. Mumbai, Delhi, Bangalore",
      },
    ],
  },
  {
    title: "Your education journey",
    subtitle: "Where you studied shapes how you think. Share your academic background.",
    requiredFields: ["schooling"],
    fields: [
      {
        key: "schooling",
        label: "Schooling",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "cbse", label: "CBSE" },
          { value: "icse", label: "ICSE" },
          { value: "state", label: "State Board" },
          { value: "ib", label: "IB / International" },
          { value: "other", label: "Other" },
        ],
      },
      { key: "college", label: "College / University", type: "text", placeholder: "e.g. IIT Delhi, BITS Pilani" },
      {
        key: "degree",
        label: "Degree / Field of Study",
        type: "text",
        placeholder: "e.g. B.Tech Computer Science, BBA",
      },
    ],
  },
  {
    title: "Where are you professionally?",
    subtitle: "Your current work situation drives career simulations.",
    requiredFields: ["workStatus"],
    fields: [
      {
        key: "workStatus",
        label: "Current Status",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "student", label: "Student" },
          { value: "fresher", label: "Fresher / Job Seeking" },
          { value: "employed", label: "Employed" },
          { value: "freelancer", label: "Freelancer" },
          { value: "entrepreneur", label: "Entrepreneur" },
          { value: "unemployed", label: "Between Jobs" },
        ],
      },
      {
        key: "industry",
        label: "Industry",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "tech", label: "Technology" },
          { value: "finance", label: "Finance & Banking" },
          { value: "healthcare", label: "Healthcare" },
          { value: "education", label: "Education" },
          { value: "media", label: "Media & Entertainment" },
          { value: "ecommerce", label: "E-Commerce & Retail" },
          { value: "consulting", label: "Consulting" },
          { value: "government", label: "Government" },
          { value: "other", label: "Other" },
        ],
      },
      { key: "yearsExperience", label: "Years of Experience", type: "number", placeholder: "e.g. 0, 2, 5" },
    ],
  },
  {
    title: "Your family & roots",
    subtitle: "Your background deeply influences life outcomes. Be honest — this stays private.",
    requiredFields: ["familyStructure", "financialCondition"],
    fields: [
      {
        key: "familyStructure",
        label: "Family Structure",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "nuclear", label: "Nuclear Family" },
          { value: "joint", label: "Joint Family" },
          { value: "single-parent", label: "Single Parent" },
          { value: "independent", label: "Living Independently" },
        ],
      },
      {
        key: "financialCondition",
        label: "Financial Background",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "struggling", label: "Struggling" },
          { value: "lower-middle", label: "Lower Middle Class" },
          { value: "middle", label: "Middle Class" },
          { value: "upper-middle", label: "Upper Middle Class" },
          { value: "affluent", label: "Affluent" },
        ],
      },
      {
        key: "familyRelationship",
        label: "Family Relationship Quality",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "strained", label: "Strained / Difficult" },
          { value: "distant", label: "Distant but OK" },
          { value: "average", label: "Average" },
          { value: "close", label: "Close & Supportive" },
          { value: "very-close", label: "Very Close" },
        ],
      },
    ],
  },
  {
    title: "What makes you, you?",
    subtitle: "Your personality traits shape how you navigate life's decisions.",
    requiredFields: ["personality", "riskAppetite"],
    fields: [
      {
        key: "personality",
        label: "Personality Type",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "introvert", label: "Introvert" },
          { value: "ambivert", label: "Ambivert" },
          { value: "extrovert", label: "Extrovert" },
        ],
      },
      {
        key: "riskAppetite",
        label: "Risk Appetite",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "conservative", label: "Conservative — play it safe" },
          { value: "moderate", label: "Moderate — calculated risks" },
          { value: "aggressive", label: "Aggressive — go big or go home" },
        ],
      },
      {
        key: "decisionStyle",
        label: "How do you make decisions?",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "logical", label: "Logical & Data-Driven" },
          { value: "intuitive", label: "Gut Feeling & Intuition" },
          { value: "mixed", label: "Mix of Both" },
        ],
      },
      {
        key: "discipline",
        label: "Self-Discipline Level",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "low", label: "Low — I procrastinate a lot" },
          { value: "moderate", label: "Moderate — depends on the day" },
          { value: "high", label: "High — very consistent" },
        ],
      },
    ],
  },
  {
    title: "Your world beyond work",
    subtitle: "Interests, relationships, and what keeps you going.",
    requiredFields: ["relationshipStatus"],
    fields: [
      {
        key: "interests",
        label: "What are you passionate about?",
        type: "text",
        placeholder: "e.g. AI, music, fitness, investing, travel",
      },
      {
        key: "hobbies",
        label: "Hobbies in your free time",
        type: "text",
        placeholder: "e.g. reading, gaming, coding, cooking",
      },
      {
        key: "relationshipStatus",
        label: "Relationship Status",
        type: "select",
        placeholder: "Select",
        options: [
          { value: "single", label: "Single" },
          { value: "dating", label: "In a Relationship" },
          { value: "engaged", label: "Engaged" },
          { value: "married", label: "Married" },
          { value: "complicated", label: "It's Complicated" },
        ],
      },
    ],
  },
  {
    title: "Where are you headed?",
    subtitle: "Your dreams and current struggles — the raw material of your simulation.",
    requiredFields: ["lifeGoals"],
    fields: [
      {
        key: "lifeGoals",
        label: "What are your biggest life goals?",
        type: "textarea",
        placeholder: "e.g. Build a successful startup, achieve financial freedom by 30, travel 20 countries, find a meaningful relationship...",
        hint: "Be specific — the more detail you share, the more realistic your simulation becomes.",
      },
      {
        key: "currentChallenges",
        label: "What's your biggest challenge right now?",
        type: "textarea",
        placeholder: "e.g. Confused about career direction, financial pressure, relationship issues, lack of motivation...",
        hint: "This helps us simulate realistic obstacles and turning points.",
      },
    ],
  },
];
