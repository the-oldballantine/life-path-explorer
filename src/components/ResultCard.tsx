import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface YearOutcome {
  year: number;
  title: string;
  text: string;
}

interface OutcomeData {
  summary: string;
  risk: string;
  type: string;
  years: YearOutcome[];
}

const outcomes: Record<string, OutcomeData> = {
  career: {
    summary:
      "Your decision to pursue a stable career sets you on a path of steady growth, deepening expertise, and compounding returns — both financially and professionally.",
    risk: "Low",
    type: "Career Growth",
    years: [
      {
        year: 1,
        title: "Foundation & Onboarding",
        text: "You land a solid role at a reputable company. The first year is about learning the internal systems, building relationships with your manager and peers, and proving your reliability. You complete two major projects ahead of schedule, earning early recognition. Financially, you start saving 20% of your income and open a small investment portfolio. Socially, you establish a routine — gym three times a week, weekend meetups with friends.",
      },
      {
        year: 2,
        title: "Skill Deepening",
        text: "You take on a cross-functional project that exposes you to product strategy. Your manager nominates you for a leadership development program. You start mentoring a junior colleague, which sharpens your communication skills. Your savings grow, and you begin investing in index funds. You attend your first industry conference and make three meaningful connections.",
      },
      {
        year: 3,
        title: "First Promotion",
        text: "You're promoted to a senior role with a 30% salary increase. Your responsibilities expand to include strategic planning and stakeholder management. You lead a team of 5 on a critical initiative that delivers $2M in value. You buy your first property — a modest apartment in a good neighborhood. Your professional reputation starts preceding you.",
      },
      {
        year: 4,
        title: "Expanding Influence",
        text: "You're invited to speak at an internal summit. Your cross-departmental work leads to a new process that's adopted company-wide. You start writing thought-leadership articles on LinkedIn, gaining a small but engaged following. Your investment portfolio crosses a meaningful milestone. You begin exploring whether management or individual contribution is your long-term path.",
      },
      {
        year: 5,
        title: "Mid-Career Inflection",
        text: "You hit a plateau and feel restless. This is the critical year — you invest in executive coaching and realize you want to lead larger teams. You negotiate a lateral move into a strategic division with more growth potential. Your network from conferences starts paying dividends: you receive two external job offers but choose to stay. Your net worth has grown 4x from Year 1.",
      },
      {
        year: 6,
        title: "Leadership Transition",
        text: "You're managing a team of 15. The transition from doing to leading is hard — you struggle with delegation initially but adapt. You implement a new performance framework that improves team output by 25%. You complete an executive MBA part-time. Your side investments in real estate start generating passive income.",
      },
      {
        year: 7,
        title: "Organizational Impact",
        text: "You're now a director overseeing a team of 40. You lead a company-wide transformation initiative. Your decisions directly impact quarterly revenue. You're recognized as a top 10% performer in the organization. Financially, you're in the top income bracket for your age group. You start advising two early-stage startups on the side.",
      },
      {
        year: 8,
        title: "Industry Recognition",
        text: "You're invited to join an industry advisory board. A major publication features your work. You launch an internal innovation lab that produces three new product concepts. Your professional brand is now well-established. You begin thinking about your legacy — what kind of leader do you want to be remembered as?",
      },
      {
        year: 9,
        title: "Strategic Crossroads",
        text: "A competitor offers you a C-suite role. Your current company counters with a VP position and equity. You negotiate hard and secure a package that includes significant stock options. You hire your replacement for your current role, ensuring continuity. Your passive income now covers 40% of your living expenses.",
      },
      {
        year: 10,
        title: "Compounded Success",
        text: "You're a VP with organizational influence, a strong personal brand, and deep domain expertise. Your net worth has grown 12x from Year 1. You sit on two advisory boards and mentor five rising leaders. The trade-off is clear: you chose depth over breadth, stability over chaos. Your foundation is unshakeable, and every future option — entrepreneurship, consulting, teaching — is open to you from a position of strength.",
      },
    ],
  },
  startup: {
    summary:
      "You choose the path of maximum uncertainty and maximum upside. The startup journey reshapes your identity, risk tolerance, and worldview in ways a traditional career never could.",
    risk: "High",
    type: "Entrepreneurship",
    years: [
      {
        year: 1,
        title: "The Leap",
        text: "You quit your job (or skip the job market entirely) and commit to your idea. The first six months are spent validating the concept — talking to 100+ potential users, building a rough MVP, and burning through savings. You find a co-founder through a mutual connection. By month 9, you have a working prototype and 50 beta users. Revenue: $0. Stress level: extreme. But the conviction is real.",
      },
      {
        year: 2,
        title: "Survival Mode",
        text: "You raise a small pre-seed round from angel investors — just enough for 12 months of runway. You hire two engineers and a designer. The product pivots twice based on user feedback. You lose one co-founder due to disagreements about direction. Monthly recurring revenue reaches $5K by year-end. You haven't taken a vacation in 18 months. Your relationships strain under the pressure.",
      },
      {
        year: 3,
        title: "First Traction",
        text: "Product-market fit starts to crystallize. A viral moment on social media brings 2,000 new users in a week. You close your first enterprise deal worth $50K annually. You raise a seed round at a $5M valuation. The team grows to 8. You learn to hire, fire, and manage — all painfully, all quickly. Your personal finances are still tight, but the company has 18 months of runway.",
      },
      {
        year: 4,
        title: "Scaling Begins",
        text: "Revenue hits $500K ARR. You raise a Series A at a $20M valuation. The team grows to 25. You hire a VP of Engineering and a Head of Sales — both mistakes you'll correct in Year 5. Growth brings new problems: customer churn, team culture challenges, and the realization that building a company is 80% people management. You finally pay yourself a reasonable salary.",
      },
      {
        year: 5,
        title: "The Hard Middle",
        text: "This is the year that breaks most founders. Growth slows. Two key employees leave. A competitor with more funding launches a similar product. You have a crisis of confidence and consider selling. Instead, you restructure the team, refocus the product, and double down on your core users. By year-end, you've found your second wind. Revenue: $1.2M ARR. Team: 20 (leaner, stronger).",
      },
      {
        year: 6,
        title: "Breakout Growth",
        text: "The product improvements from Year 5 compound. Revenue triples to $3.5M ARR. You raise a Series B at a $60M valuation. You hire an experienced COO who transforms operations. The company culture solidifies around clear values. You start sleeping 7 hours again. For the first time, the business feels like it can survive without you being in every meeting.",
      },
      {
        year: 7,
        title: "Market Leadership",
        text: "You're now the category leader in your niche. Revenue: $8M ARR. Team: 60. You launch in two international markets. A major tech publication names you a 'company to watch.' Acquisition offers start coming — you turn down a $100M offer because you believe the ceiling is higher. Your personal net worth on paper is significant, but it's all tied to equity.",
      },
      {
        year: 8,
        title: "The Decision Point",
        text: "Revenue: $15M ARR. A strategic acquirer offers $200M. Your investors push for continued growth toward an IPO. You spend months deliberating. The stress of the decision affects your health and relationships. You choose to keep building but negotiate secondary shares — selling $5M of personal equity, giving you financial security for the first time.",
      },
      {
        year: 9,
        title: "Empire Building",
        text: "With personal financial pressure removed, you make bolder strategic bets. You acquire a smaller competitor. You launch a platform ecosystem. Revenue: $30M ARR. Team: 120. You hire a President to run day-to-day operations, freeing yourself to focus on vision and strategy. You start angel investing, backing three founders who remind you of your Year 1 self.",
      },
      {
        year: 10,
        title: "Transformation Complete",
        text: "The company is valued at $500M+. You've created 15 millionaires among early employees. Revenue: $50M ARR. You're preparing for either an IPO or a strategic exit. More importantly, you've become a fundamentally different person — your risk tolerance, decision-making speed, and resilience are in the top 1%. The journey cost you: years of sleep, several relationships, and your naive optimism. It gave you: financial freedom, a legacy, and the knowledge that you can build something from nothing.",
      },
    ],
  },
};

interface ResultCardProps {
  name: string;
  decision: string;
}

const ResultCard = ({ name, decision }: ResultCardProps) => {
  const outcome = outcomes[decision];
  if (!outcome) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">
          Simulation Result
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Projected Outcome for {name}
        </h2>
      </div>

      <Separator className="bg-border/50" />

      {/* Summary */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {outcome.summary}
      </p>

      {/* Badges */}
      <div className="flex gap-2">
        <Badge variant="secondary" className="text-xs font-normal">
          Risk Level: {outcome.risk}
        </Badge>
        <Badge variant="secondary" className="text-xs font-normal">
          Outcome Type: {outcome.type}
        </Badge>
      </div>

      <Separator className="bg-border/50" />

      {/* Year-by-Year Timeline */}
      <div>
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-5">
          Year-by-Year Breakdown
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-6">
            {outcome.years.map((yr, i) => (
              <div
                key={yr.year}
                className="relative pl-8 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background" />

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary tracking-wide">
                      YEAR {yr.year}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      — {yr.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {yr.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
