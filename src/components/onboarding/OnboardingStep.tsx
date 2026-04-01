import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  placeholder: string;
  options?: { value: string; label: string }[];
  hint?: string;
}

interface OnboardingStepProps {
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const OnboardingStep = ({
  title,
  subtitle,
  fields,
  values,
  onChange,
}: OnboardingStepProps) => {
  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div
            key={field.key}
            className={`space-y-1.5 ${
              field.type === "textarea" ? "sm:col-span-2" : ""
            }`}
          >
            <Label className="text-xs text-muted-foreground">{field.label}</Label>
            {field.hint && (
              <p className="text-[11px] text-muted-foreground/60">{field.hint}</p>
            )}

            {field.type === "select" && field.options ? (
              <Select
                value={values[field.key] || ""}
                onValueChange={(v) => onChange(field.key, v)}
              >
                <SelectTrigger className="bg-secondary/50 border-border text-sm h-10">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "textarea" ? (
              <Textarea
                placeholder={field.placeholder}
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="bg-secondary/50 border-border text-sm min-h-[80px] resize-none focus-visible:ring-primary/40"
              />
            ) : (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="bg-secondary/50 border-border text-sm h-10 focus-visible:ring-primary/40"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingStep;
