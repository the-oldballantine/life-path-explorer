import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileData {
  name: string;
  age: string;
  stage: string;
  career: string;
  industry: string;
  risk: string;
  ambition: string;
  priority: string;
  personality: string;
  decisionStyle: string;
  discipline: string;
  location: string;
  background: string;
  support: string;
  timeframe: string;
  workStyle: string;
  failureTolerance: string;
  lifestyle: string;
  mobility: string;
  customGoal: string;
}

export const defaultProfile: ProfileData = {
  name: "",
  age: "",
  stage: "",
  career: "",
  industry: "",
  risk: "",
  ambition: "",
  priority: "",
  personality: "",
  decisionStyle: "",
  discipline: "",
  location: "",
  background: "",
  support: "",
  timeframe: "10",
  workStyle: "",
  failureTolerance: "",
  lifestyle: "",
  mobility: "",
  customGoal: "",
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

const SelectField = ({ label, value, onChange, placeholder, options }: SelectFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-secondary/50 border-border text-sm h-9">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

interface ProfileFormProps {
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
}

const ProfileForm = ({ profile, onChange }: ProfileFormProps) => {
  const update = (field: keyof ProfileData, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Custom Goal */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Describe Your Goal (Optional)</Label>
        <Textarea
          placeholder="e.g. I want to build a SaaS company in the AI space while maintaining work-life balance..."
          value={profile.customGoal}
          onChange={(e) => update("customGoal", e.target.value)}
          className="bg-secondary/50 border-border text-sm min-h-[80px] resize-none focus-visible:ring-primary/40"
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Your Name</Label>
          <Input
            placeholder="Enter name"
            value={profile.name}
            onChange={(e) => update("name", e.target.value)}
            className="bg-secondary/50 border-border text-sm h-9 focus-visible:ring-primary/40"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Age</Label>
          <Input
            type="number"
            placeholder="e.g. 22"
            value={profile.age}
            onChange={(e) => update("age", e.target.value)}
            className="bg-secondary/50 border-border text-sm h-9 focus-visible:ring-primary/40"
          />
        </div>

        <SelectField
          label="Life Stage"
          value={profile.stage}
          onChange={(v) => update("stage", v)}
          placeholder="Select stage"
          options={[
            { value: "student", label: "Student" },
            { value: "earlyCareer", label: "Early Career" },
            { value: "midCareer", label: "Mid Career" },
            { value: "senior", label: "Senior Professional" },
            { value: "retired", label: "Retired" },
          ]}
        />
      </div>

      {/* Career & Industry */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Career Path"
          value={profile.career}
          onChange={(v) => update("career", v)}
          placeholder="Select path"
          options={[
            { value: "career", label: "Stable Career" },
            { value: "startup", label: "Startup" },
            { value: "freelance", label: "Freelance" },
            { value: "creative", label: "Creative Arts" },
            { value: "research", label: "Research / Academia" },
          ]}
        />

        <SelectField
          label="Industry"
          value={profile.industry}
          onChange={(v) => update("industry", v)}
          placeholder="Select industry"
          options={[
            { value: "tech", label: "Technology" },
            { value: "finance", label: "Finance" },
            { value: "healthcare", label: "Healthcare" },
            { value: "education", label: "Education" },
            { value: "media", label: "Media & Entertainment" },
            { value: "manufacturing", label: "Manufacturing" },
            { value: "other", label: "Other" },
          ]}
        />
      </div>

      {/* Risk & Ambition */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <SelectField
          label="Risk Tolerance"
          value={profile.risk}
          onChange={(v) => update("risk", v)}
          placeholder="Select"
          options={[
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
          ]}
        />
        <SelectField
          label="Ambition Level"
          value={profile.ambition}
          onChange={(v) => update("ambition", v)}
          placeholder="Select"
          options={[
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
          ]}
        />
        <SelectField
          label="Top Priority"
          value={profile.priority}
          onChange={(v) => update("priority", v)}
          placeholder="Select"
          options={[
            { value: "career", label: "Career" },
            { value: "family", label: "Family" },
            { value: "health", label: "Health" },
            { value: "wealth", label: "Wealth" },
            { value: "freedom", label: "Freedom" },
          ]}
        />
      </div>

      {/* Personality & Decision */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <SelectField
          label="Personality"
          value={profile.personality}
          onChange={(v) => update("personality", v)}
          placeholder="Select"
          options={[
            { value: "introvert", label: "Introvert" },
            { value: "ambivert", label: "Ambivert" },
            { value: "extrovert", label: "Extrovert" },
          ]}
        />
        <SelectField
          label="Decision Style"
          value={profile.decisionStyle}
          onChange={(v) => update("decisionStyle", v)}
          placeholder="Select"
          options={[
            { value: "logical", label: "Logical" },
            { value: "intuitive", label: "Intuitive" },
            { value: "mixed", label: "Mixed" },
          ]}
        />
        <SelectField
          label="Discipline"
          value={profile.discipline}
          onChange={(v) => update("discipline", v)}
          placeholder="Select"
          options={[
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
          ]}
        />
      </div>

      {/* Location & Background */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <SelectField
          label="Location Type"
          value={profile.location}
          onChange={(v) => update("location", v)}
          placeholder="Select"
          options={[
            { value: "tier1", label: "Tier 1 City" },
            { value: "tier2", label: "Tier 2 City" },
            { value: "tier3", label: "Tier 3 / Rural" },
            { value: "international", label: "International" },
          ]}
        />
        <SelectField
          label="Financial Background"
          value={profile.background}
          onChange={(v) => update("background", v)}
          placeholder="Select"
          options={[
            { value: "low", label: "Low Income" },
            { value: "middle", label: "Middle Class" },
            { value: "upper", label: "Upper Class" },
          ]}
        />
        <SelectField
          label="Support System"
          value={profile.support}
          onChange={(v) => update("support", v)}
          placeholder="Select"
          options={[
            { value: "weak", label: "Weak" },
            { value: "moderate", label: "Moderate" },
            { value: "strong", label: "Strong" },
          ]}
        />
      </div>

      {/* Work & Lifestyle */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Timeframe (years)</Label>
          <Input
            type="number"
            placeholder="e.g. 10"
            value={profile.timeframe}
            onChange={(e) => update("timeframe", e.target.value)}
            className="bg-secondary/50 border-border text-sm h-9 focus-visible:ring-primary/40"
          />
        </div>
        <SelectField
          label="Work Style"
          value={profile.workStyle}
          onChange={(v) => update("workStyle", v)}
          placeholder="Select"
          options={[
            { value: "hustle", label: "Hustle Mode" },
            { value: "balanced", label: "Balanced" },
            { value: "relaxed", label: "Relaxed" },
          ]}
        />
        <SelectField
          label="Failure Tolerance"
          value={profile.failureTolerance}
          onChange={(v) => update("failureTolerance", v)}
          placeholder="Select"
          options={[
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Desired Lifestyle"
          value={profile.lifestyle}
          onChange={(v) => update("lifestyle", v)}
          placeholder="Select"
          options={[
            { value: "minimalist", label: "Minimalist" },
            { value: "balanced", label: "Balanced" },
            { value: "luxurious", label: "Luxurious" },
          ]}
        />
        <SelectField
          label="Mobility Preference"
          value={profile.mobility}
          onChange={(v) => update("mobility", v)}
          placeholder="Select"
          options={[
            { value: "metro", label: "Metro / Urban" },
            { value: "suburban", label: "Suburban" },
            { value: "remote", label: "Remote / Anywhere" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
