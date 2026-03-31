import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResultCardProps {
  name: string;
  decision: string;
}

const outcomes: Record<string, { text: string; risk: string; type: string }> = {
  career: {
    text: "Over the next decade, you build a respected career in your field. By year three, you've earned a leadership role, and by year seven, you're overseeing a team of 40. Financial stability allows you to invest early, and your disciplined approach compounds into long-term wealth. Your network grows steadily through industry conferences, and you become a trusted voice in your domain. The trade-off is subtle — fewer radical pivots, but deep expertise and a strong foundation for whatever comes next.",
    risk: "Low",
    type: "Career Growth",
  },
  startup: {
    text: "You launch your venture within six months. The first two years are turbulent — funding rounds, pivots, and sleepless nights define the period. By year four, you find product-market fit, and growth accelerates. Revenue scales, but so does complexity. By year eight, you face a critical choice: exit or double down. The journey reshapes your risk tolerance, decision-making speed, and resilience. Financially volatile early on, but the upside potential is asymmetric. You emerge as a fundamentally different thinker.",
    risk: "High",
    type: "Entrepreneurship",
  },
};

const ResultCard = ({ name, decision }: ResultCardProps) => {
  const outcome = outcomes[decision];
  if (!outcome) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4 animate-fade-in-up">
      <div>
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">
          Simulation Result
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Projected Outcome for {name}
        </h2>
      </div>
      <Separator className="bg-border/50" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        {outcome.text}
      </p>
      <div className="flex gap-2 pt-2">
        <Badge variant="secondary" className="text-xs font-normal">
          Risk Level: {outcome.risk}
        </Badge>
        <Badge variant="secondary" className="text-xs font-normal">
          Outcome Type: {outcome.type}
        </Badge>
      </div>
    </div>
  );
};

export default ResultCard;
