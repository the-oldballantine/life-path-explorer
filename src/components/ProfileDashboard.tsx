import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile, LifePath } from "@/types/profile";
import { ArrowLeft, Pencil, Save, X, Play, LogOut, Eye, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface NarrativeHistoryItem {
  id: string;
  path: string;
  mode: string;
  tenure: number;
  scenario: string | null;
  title: string;
  subtitle: string;
  summary: string;
  years: string;
  createdAt: string;
}

interface ProfileDashboardProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onSimulate: (path: LifePath) => void;
  onBack: () => void;
  onLogout?: () => void;
  onReplay?: (narrative: NarrativeHistoryItem) => void;
  narratives?: NarrativeHistoryItem[];
  isLoadingNarratives?: boolean;
}

interface FieldDef {
  key: keyof UserProfile;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
}

const sections: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Personal",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "age", label: "Age", type: "text" },
      {
        key: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "nonbinary", label: "Non-binary" },
          { value: "prefer-not", label: "Prefer not to say" },
        ],
      },
      { key: "location", label: "Location", type: "text" },
    ],
  },
  {
    title: "Education",
    fields: [
      { key: "schooling", label: "Schooling", type: "text" },
      { key: "college", label: "College", type: "text" },
      { key: "degree", label: "Degree", type: "text" },
    ],
  },
  {
    title: "Career",
    fields: [
      { key: "workStatus", label: "Status", type: "text" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "yearsExperience", label: "Experience", type: "text" },
    ],
  },
  {
    title: "Family",
    fields: [
      { key: "familyStructure", label: "Structure", type: "text" },
      { key: "financialCondition", label: "Financial", type: "text" },
      { key: "familyRelationship", label: "Relationship", type: "text" },
    ],
  },
  {
    title: "Personality",
    fields: [
      { key: "personality", label: "Type", type: "text" },
      { key: "riskAppetite", label: "Risk", type: "text" },
      { key: "decisionStyle", label: "Decisions", type: "text" },
      { key: "discipline", label: "Discipline", type: "text" },
    ],
  },
  {
    title: "Interests & Goals",
    fields: [
      { key: "interests", label: "Interests", type: "text" },
      { key: "hobbies", label: "Hobbies", type: "text" },
      { key: "relationshipStatus", label: "Relationship", type: "text" },
      { key: "lifeGoals", label: "Life Goals", type: "text" },
      { key: "currentChallenges", label: "Challenges", type: "text" },
    ],
  },
];

const quickPaths: { id: LifePath; label: string }[] = [
  { id: "love", label: "Love Life" },
  { id: "career", label: "Career" },
  { id: "financial", label: "Financial" },
  { id: "personal", label: "Personal" },
  { id: "alternate", label: "Alternate" },
];

const ProfileDashboard = ({ profile, onUpdate, onSimulate, onBack, onLogout, onReplay, narratives = [], isLoadingNarratives = false }: ProfileDashboardProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserProfile>(profile);

  const handleSave = () => {
    onUpdate(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            )}
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your Profile
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {profile.name || "Your"} Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Your core identity — the foundation of every simulation. Edit anytime and rerun.
          </p>
        </div>

        {/* Profile Sections */}
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-border bg-card p-5 space-y-4"
          >
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground">
              {section.title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">{field.label}</Label>
                  {editing ? (
                    field.key === "lifeGoals" || field.key === "currentChallenges" ? (
                      <Textarea
                        value={draft[field.key]}
                        onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                        className="bg-secondary/50 border-border text-sm min-h-[60px] resize-none"
                      />
                    ) : (
                      <Input
                        value={draft[field.key]}
                        onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                        className="bg-secondary/50 border-border text-sm h-9"
                      />
                    )
                  ) : (
                    <p className="text-sm text-foreground capitalize">
                      {profile[field.key] || (
                        <span className="text-muted-foreground/40 italic">Not set</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Narrative History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Simulation History</h2>
          {isLoadingNarratives ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : narratives.length === 0 ? (
            <p className="text-sm text-muted-foreground/70 italic">No simulations yet. Try a path above!</p>
          ) : (
            <div className="grid gap-3">
              {narratives.map((n) => (
                <Card
                  key={n.id}
                  className="cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => onReplay?.(n)}
                >
                  <CardHeader className="py-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <CardTitle className="text-sm font-medium">{n.title}</CardTitle>
                        <CardDescription className="text-xs">{n.subtitle}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={(e) => { e.stopPropagation(); onReplay?.(n); }}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                        {n.path}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                        {n.mode === "rockandroll" ? "Custom" : "AI"}
                      </Badge>
                      <span>{n.tenure}y</span>
                      <Clock className="h-3 w-3" />
                      <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    {n.scenario && (
                      <p className="text-xs text-muted-foreground">
                        &ldquo;{n.scenario.slice(0, 60)}&rdquo;
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Quick Simulate */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            Quick Simulate from Profile
          </p>
          <p className="text-sm text-muted-foreground">
            Run a new simulation using your current profile data.
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPaths.map((p) => (
              <Button
                key={p.id}
                variant="outline"
                size="sm"
                onClick={() => onSimulate(p.id)}
                className="gap-1.5"
              >
                <Play className="h-3 w-3" />
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
