import { LifePath } from "@/types/profile";

export interface YearEvent {
  year: number;
  title: string;
  text: string;
  mood: "positive" | "neutral" | "challenging" | "transformative";
}

export interface SimulationData {
  title: string;
  subtitle: string;
  summary: string;
  years: YearEvent[];
}

const loveSimulation: SimulationData = {
  title: "Love & Relationships",
  subtitle: "How your emotional world unfolds over the next decade",
  summary:
    "Your love life is shaped by your personality, emotional availability, and the choices you make at critical moments. This simulation traces the arc of your relationships — the connections, the heartbreaks, and the growth that comes from both.",
  years: [
    {
      year: 1,
      title: "The Search for Connection",
      mood: "neutral",
      text: "You enter this year with a mix of hope and uncertainty. Whether you're single or in a relationship, there's a restlessness — a feeling that something deeper exists. You meet someone unexpected through a mutual interest. The chemistry is instant but complicated. You spend months navigating the early stages: the excitement, the vulnerability, the overthinking. By year's end, you've learned that attraction alone isn't enough — compatibility matters.",
    },
    {
      year: 2,
      title: "Testing the Waters",
      mood: "challenging",
      text: "The relationship (or lack thereof) faces its first real test. If you're together, a disagreement about priorities reveals fundamental differences. If you're single, the loneliness hits harder than expected during a particularly quiet stretch. You turn to friends, family, or therapy. This year teaches you that emotional intelligence isn't optional — it's the foundation of every meaningful connection. You start understanding your attachment style.",
    },
    {
      year: 3,
      title: "Deepening or Departing",
      mood: "transformative",
      text: "A crossroads. The relationship either deepens significantly — through a shared challenge like moving cities, financial stress, or family drama — or it ends. If it ends, the grief is profound but clarifying. You emerge knowing exactly what you need vs. what you want. If it deepens, you discover a new level of trust. Either way, you're more emotionally mature than you were 12 months ago.",
    },
    {
      year: 4,
      title: "Building the Foundation",
      mood: "positive",
      text: "Stability arrives, either within a committed relationship or in your relationship with yourself. You establish routines, boundaries, and rituals that sustain emotional health. If partnered, you discuss long-term plans for the first time — living together, finances, family. If single, you've stopped searching desperately and started investing in friendships, self-growth, and interests that make you genuinely interesting.",
    },
    {
      year: 5,
      title: "The Five-Year Shift",
      mood: "challenging",
      text: "Half a decade in, something shifts. The relationship you're in — with a partner or with your own independence — faces a reckoning. You ask: 'Is this what I really want?' Career ambitions may conflict with relationship needs. Family pressure mounts. You make a difficult decision that either strengthens your commitment or frees you to pursue something more aligned. This is the year that separates intentional relationships from accidental ones.",
    },
    {
      year: 6,
      title: "Rebuilding or Reinforcing",
      mood: "neutral",
      text: "Post-reckoning, you rebuild. If you chose to stay, the relationship has new depth — you've survived a genuine test. If you left, you process the loss and slowly open up again. A new person enters your life unexpectedly, challenging your assumptions about your 'type.' You realize that the best relationships aren't about finding someone perfect — they're about finding someone who's willing to grow alongside you.",
    },
    {
      year: 7,
      title: "Commitment & Clarity",
      mood: "positive",
      text: "By year seven, clarity arrives. You're either in a relationship that feels like home or you've made peace with being alone while remaining open. If partnered, a major milestone — engagement, moving in, a significant shared investment — solidifies the bond. Your communication skills have sharpened. Arguments are shorter, resolutions are faster, and both of you understand that love is a practice, not a feeling.",
    },
    {
      year: 8,
      title: "Navigating Complexity",
      mood: "challenging",
      text: "Life gets more complex. Career demands, aging parents, financial pressures, or health issues test the relationship. If single, the dating landscape feels different — you have less patience for games but more clarity about what works. A meaningful connection (new or existing) helps you through a particularly difficult period. You learn that vulnerability isn't weakness — it's the only path to genuine intimacy.",
    },
    {
      year: 9,
      title: "Evolving Together",
      mood: "positive",
      text: "Growth becomes the theme. You and your partner (or your closest relationships) have evolved — not just as a couple, but as individuals. Shared experiences — travel, challenges, celebrations — create a rich tapestry of memories. If single, your life is full in ways you didn't expect: deep friendships, personal accomplishments, and a relationship with yourself that feels genuinely healthy.",
    },
    {
      year: 10,
      title: "The Love You've Built",
      mood: "transformative",
      text: "A decade later, you look back with a mix of gratitude and wonder. The love life you have — whether it's a deeply committed partnership, a healthy independence, or a rich web of meaningful connections — was built through intention, resilience, and the willingness to be honest. You've loved, lost, learned, and ultimately arrived at a place of emotional maturity that younger-you wouldn't recognize. The journey was never about finding 'the one' — it was about becoming someone worth loving.",
    },
  ],
};

const careerSimulation: SimulationData = {
  title: "Career & Professional Growth",
  subtitle: "Your professional journey over the next decade",
  summary:
    "Career paths are rarely linear. This simulation traces the promotions, pivots, failures, and breakthroughs that define your professional identity — all shaped by your unique background, skills, and ambitions.",
  years: [
    {
      year: 1,
      title: "Setting the Stage",
      mood: "neutral",
      text: "You commit fully to your chosen path. If employed, you identify the fastest route to impact and volunteer for high-visibility projects. If building something of your own, you spend months talking to potential users and refining your idea. The first year is about learning the unwritten rules — office politics, industry dynamics, who holds real power. You make three key professional relationships that will matter for years. Income is modest but growing.",
    },
    {
      year: 2,
      title: "First Real Test",
      mood: "challenging",
      text: "A major project fails or a deal falls through. The failure is public enough to sting but private enough to learn from. You question whether you're on the right path. A mentor (formal or informal) provides perspective that changes how you think about your career. You develop a specific skill that sets you apart from peers. By year-end, your confidence is rebuilt on a sturdier foundation.",
    },
    {
      year: 3,
      title: "Gaining Momentum",
      mood: "positive",
      text: "The compound effect kicks in. Your skills, network, and reputation have accumulated enough to open new doors. You receive an unexpected opportunity — a promotion, a freelance project, or a partnership offer. Your income jumps 40%. You start thinking strategically about where you want to be in five years. Industry peers begin recognizing your work.",
    },
    {
      year: 4,
      title: "The Pivot Question",
      mood: "neutral",
      text: "Restlessness appears. You're competent at what you do, but something feels incomplete. A side interest — investing, writing, building a product, or consulting — demands attention. You experiment with it outside work hours. This dual existence is exhausting but exhilarating. The question isn't whether you can do more — it's whether you should, and at what cost to your primary trajectory.",
    },
    {
      year: 5,
      title: "Leadership Emerges",
      mood: "transformative",
      text: "You transition from individual contributor to leader — either managing a team, leading a project, or running your own operation. The shift is uncomfortable. Delegation feels slower than doing it yourself. But you learn that your impact scales through people, not hours. A critical decision this year — staying vs. leaving, hiring vs. waiting, investing vs. saving — defines the next three years. You choose with imperfect information and own the outcome.",
    },
    {
      year: 6,
      title: "Compounding Returns",
      mood: "positive",
      text: "The decisions from Year 5 start paying off. Revenue, responsibility, or recognition grows measurably. You're invited to speak, write, or advise. Your professional network becomes a genuine asset — opportunities come to you rather than the other way around. Financially, you cross a milestone that younger-you would have been proud of. But the workload is intense, and balance requires conscious effort.",
    },
    {
      year: 7,
      title: "The Competitor",
      mood: "challenging",
      text: "Someone new enters your space — a younger competitor, a well-funded rival, or a structural industry shift. For the first time in years, you feel threatened. This pressure forces innovation. You either differentiate sharply, double down on your niche, or make a bold strategic move. The stress is high but productive. You emerge with a clearer value proposition and a renewed sense of urgency.",
    },
    {
      year: 8,
      title: "Building a Legacy",
      mood: "positive",
      text: "You start thinking beyond personal success. Mentoring junior colleagues, building systems that outlast you, or creating something that impacts your industry. Your expertise is now deep enough that your perspective is genuinely valuable. You receive an offer that would have been your dream five years ago — but now your ambitions have evolved. You negotiate from strength.",
    },
    {
      year: 9,
      title: "Strategic Crossroads",
      mood: "transformative",
      text: "A major decision: double down on your current path or pivot into something new with fresh energy. The stakes are high — you have a reputation, obligations, and a track record. But you also have the skills, network, and financial cushion to take a calculated risk. You make your choice based on a simple question: 'What would I regret not trying?' The answer is more honest than comfortable.",
    },
    {
      year: 10,
      title: "The View from the Top",
      mood: "positive",
      text: "A decade of intentional career building has placed you in a position of influence. Your income, skills, and network are in the top tier for your age and experience. More importantly, you've developed professional judgment — the ability to read situations, make decisions under uncertainty, and lead through complexity. The next decade offers multiple paths: scaling what you've built, teaching what you've learned, or starting something entirely new. You choose from abundance, not necessity.",
    },
  ],
};

const financialSimulation: SimulationData = {
  title: "Financial Future",
  subtitle: "How your wealth story unfolds over the next decade",
  summary:
    "Money isn't just numbers — it's freedom, security, and the ability to make choices. This simulation traces your financial journey through saving, investing, spending, and the unexpected events that test your financial resilience.",
  years: [
    {
      year: 1,
      title: "Financial Awakening",
      mood: "neutral",
      text: "You take a hard look at your finances for the first time. Income vs. expenses, debt obligations, and savings rate. The numbers are sobering. You open a dedicated savings account and start investing — even if it's just ₹5,000/month. You read three finance books and follow two credible financial advisors. The biggest win: understanding the difference between assets and liabilities. You cut two unnecessary subscriptions and redirect ₹3,000/month to investments.",
    },
    {
      year: 2,
      title: "Building Discipline",
      mood: "positive",
      text: "The habit of saving becomes automatic. You've built a 3-month emergency fund. Your investment portfolio shows modest returns — nothing exciting, but the compound interest visualizations keep you motivated. You resist the urge to buy something expensive and instead invest the amount. A friend makes quick money in crypto; the FOMO is real, but you stick to your plan. By year-end, your net worth has grown 30% from Year 1.",
    },
    {
      year: 3,
      title: "Income Leap",
      mood: "positive",
      text: "A career move or side income stream boosts your earnings by 40%. The temptation to lifestyle-inflate is strong — a better apartment, a new gadget, dining out more. You allow yourself one upgrade but invest 70% of the income increase. You start a SIP in index funds and explore one alternative investment (real estate, P2P lending, or a small business). Your financial confidence grows. Total portfolio: 8-10x your monthly income.",
    },
    {
      year: 4,
      title: "First Financial Test",
      mood: "challenging",
      text: "An unexpected expense — medical, family emergency, or a market crash — tests your financial resilience. Your emergency fund covers it, but barely. The stress reminds you why financial planning matters. You rebuild the emergency fund to 6 months and add health insurance. A friend's business opportunity tempts you; you say no because the risk-reward doesn't align. Smart decision — they lose money within 18 months.",
    },
    {
      year: 5,
      title: "Wealth Acceleration",
      mood: "transformative",
      text: "Five years of discipline compound into noticeable wealth. Your portfolio has grown significantly — the returns are now generating meaningful passive income. You explore tax optimization strategies and restructure investments for efficiency. You make your first 'big' purchase from investment returns — it feels earned. Financial stress, which dominated Year 1, is now background noise. Your relationship with money has fundamentally changed.",
    },
    {
      year: 6,
      title: "Strategic Diversification",
      mood: "positive",
      text: "You diversify across asset classes — equities, debt, real estate, and one high-risk bet. You start a side venture or invest in one, treating it as a financial experiment. Your income now comes from multiple streams. You negotiate a significant raise or land a higher-paying role, further accelerating savings. Net worth milestone: you're now in the top 10% for your age group. Financial advisors start making more sense.",
    },
    {
      year: 7,
      title: "The Temptation Year",
      mood: "challenging",
      text: "Wealth brings new temptations — luxury items, status symbols, pressure to 'look successful.' You overspend for two months before catching yourself. A conversation with a financially wise friend recalibrates you. You create a 'fun money' budget that allows enjoyment without derailing progress. You also face a major financial decision — property purchase, business investment, or helping family — that requires careful analysis.",
    },
    {
      year: 8,
      title: "Passive Income Milestone",
      mood: "positive",
      text: "Your investments now generate passive income that covers 30-40% of your monthly expenses. The psychological shift is profound — you're working because you want to, not because you have to. You start thinking about financial independence timelines. Tax planning becomes more sophisticated. You mentor two younger people on personal finance, which reinforces your own discipline.",
    },
    {
      year: 9,
      title: "Major Asset Acquisition",
      mood: "transformative",
      text: "You make a significant financial move — buying property, investing in a business, or taking a position that most people would consider 'aggressive.' But your analysis supports it, and your financial cushion can absorb the risk. The decision pays off by year-end, adding 25% to your net worth. You realize that wealth isn't about being reckless — it's about being prepared enough to act when opportunities appear.",
    },
    {
      year: 10,
      title: "Financial Freedom",
      mood: "positive",
      text: "A decade of intentional financial behavior has transformed your relationship with money. Your net worth is 20-30x where you started. Passive income covers 50-60% of your lifestyle. You have complete clarity on your financial goals for the next decade — whether that's full independence, building generational wealth, or funding a passion project. The biggest revelation: financial freedom isn't a number. It's the absence of financial anxiety and the presence of choice.",
    },
  ],
};

const personalSimulation: SimulationData = {
  title: "Personal Growth",
  subtitle: "The evolution of who you become over the next decade",
  summary:
    "Personal growth isn't always visible from the outside, but it's the foundation of everything else. This simulation traces your journey of self-discovery — habits, health, mindset, and the quiet transformations that redefine who you are.",
  years: [
    {
      year: 1,
      title: "The Wake-Up Call",
      mood: "challenging",
      text: "Something triggers a shift — a health scare, a breakup, a period of burnout, or simply the realization that you've been coasting. You start a new habit (exercise, meditation, journaling, or therapy) and stick with it for 90 days. The first real insight arrives: most of your stress comes from avoidance, not from actual problems. You start confronting things you've been postponing — difficult conversations, health check-ups, financial reviews.",
    },
    {
      year: 2,
      title: "Building New Patterns",
      mood: "positive",
      text: "The habit you started in Year 1 becomes part of your identity. Your physical health improves noticeably — better sleep, more energy, clearer thinking. You read 12 books that change your perspective on life. You identify your top 3 values and start making decisions through that filter. A toxic relationship (friend, colleague, or partner) naturally fades as you outgrow it. The loss feels necessary.",
    },
    {
      year: 3,
      title: "The Inner Work",
      mood: "transformative",
      text: "You go deeper — therapy, coaching, or serious self-reflection reveals patterns you didn't know you had. Childhood experiences, family dynamics, and past failures connect in new ways. You understand why you react certain ways to certain triggers. This awareness doesn't make you perfect, but it makes you intentional. Your relationships improve because you stop projecting and start communicating.",
    },
    {
      year: 4,
      title: "Finding Your Community",
      mood: "positive",
      text: "You seek out people who share your values and ambitions. A new community — whether online, professional, or hobby-based — becomes a source of energy and accountability. You realize that personal growth isn't a solo journey. The right people accelerate it. You also learn to set boundaries with people who drain you, without guilt. Your social circle shrinks in size but grows in depth.",
    },
    {
      year: 5,
      title: "Identity Shift",
      mood: "transformative",
      text: "Halfway through the decade, you barely recognize who you were five years ago. Your beliefs, habits, priorities, and even your daily routine have fundamentally changed. This isn't comfortable — people from your past struggle to understand the new you. Some relationships adapt; others don't. You grieve the old version of yourself while celebrating the new one. A creative project or personal milestone marks this transition.",
    },
    {
      year: 6,
      title: "Teaching What You've Learned",
      mood: "positive",
      text: "Your growth becomes visible to others. People ask for advice, mentorship, or simply how you changed. You start sharing — through conversations, writing, or creating content. Teaching reinforces your learning and reveals gaps in your understanding. You also confront a new challenge: maintaining growth after the initial transformation. Consistency without novelty requires a new kind of discipline.",
    },
    {
      year: 7,
      title: "The Plateau",
      mood: "challenging",
      text: "Growth slows, and frustration sets in. You've improved so much that further progress requires exponentially more effort. A period of stagnation tests your patience. You try something completely new — a skill, a trip, a relationship dynamic, or a physical challenge — that reignites curiosity. The lesson: growth isn't always upward. Sometimes it's lateral, and that's equally valuable.",
    },
    {
      year: 8,
      title: "Integration",
      mood: "neutral",
      text: "The various threads of your growth — physical, emotional, intellectual, social — start weaving together into a coherent whole. You stop compartmentalizing and start living with more alignment. Your work reflects your values. Your relationships reflect your growth. Your health reflects your priorities. Conflicts between different areas of life decrease because you've found your center.",
    },
    {
      year: 9,
      title: "Giving Back",
      mood: "positive",
      text: "With a solid foundation, you shift focus outward. Volunteering, mentoring, community involvement, or supporting a cause becomes a natural extension of your growth. You realize that the highest form of personal development is contribution. Your sense of purpose clarifies. The daily anxieties that plagued Year 1 feel distant — not because life is easier, but because you're stronger.",
    },
    {
      year: 10,
      title: "The Person You've Become",
      mood: "transformative",
      text: "A decade of intentional personal growth has produced someone remarkable — not perfect, but deeply self-aware, resilient, and purposeful. You handle stress with equanimity, relationships with care, and uncertainty with confidence. The biggest surprise: the best version of yourself isn't the one who achieved the most. It's the one who remained curious, honest, and willing to change. You enter the next decade not as someone searching for meaning, but as someone creating it.",
    },
  ],
};

const alternateSimulation: SimulationData = {
  title: "The Road Not Taken",
  subtitle: "What if everything had been different?",
  summary:
    "This is the life you didn't live — the parallel universe where you made the opposite choices. It's not about regret; it's about understanding the weight of every decision and appreciating the path you're on.",
  years: [
    {
      year: 1,
      title: "The Divergence Point",
      mood: "transformative",
      text: "Imagine you made the opposite choice at your last major crossroad. Instead of stability, you chose chaos — or vice versa. The alternate version of you moves to a new city with nothing but a bag and a vague plan. The first three months are terrifying. No safety net, no familiar faces, no guaranteed income. But something shifts — the absence of comfort forces creativity. You find a part-time gig, a shared apartment, and an unexpected friendship that changes your worldview.",
    },
    {
      year: 2,
      title: "Embracing the Unknown",
      mood: "challenging",
      text: "The alternate path is harder than expected. Financial pressure mounts. You take a job you'd never have considered — manual labor, customer service, or something completely outside your training. The humility is bruising but educational. You learn skills that formal education never taught: negotiation under pressure, resourcefulness, and the ability to connect with people vastly different from you. Your old friends don't understand your choices.",
    },
    {
      year: 3,
      title: "Unexpected Discovery",
      mood: "positive",
      text: "A chance encounter — a conversation at a café, a random event, a job interview gone wrong — opens a door to something you never knew existed. A field, a community, or a way of living that aligns with parts of you that your original path suppressed. You dive in with the energy of a beginner. The learning curve is steep, but the passion is genuine. For the first time, work doesn't feel like a compromise.",
    },
    {
      year: 4,
      title: "Building in the Margins",
      mood: "neutral",
      text: "You build a life in the cracks of convention. Your career doesn't fit a LinkedIn headline, your living situation is unconventional, and your income is unpredictable. But you're alive in a way that your previous self wasn't. You create something — a project, a small business, a body of creative work — that earns zero money but attracts attention. People start noticing. Imposter syndrome is constant but manageable.",
    },
    {
      year: 5,
      title: "The Mirror Moment",
      mood: "transformative",
      text: "Halfway through, you bump into someone from your old life — an old colleague, a childhood friend, or an ex. The contrast is stark. They've achieved traditional milestones: promotions, property, stability. You've achieved something harder to measure: freedom, self-knowledge, and a life that feels genuinely yours. Neither path is better. But the comparison forces you to recommit to your choice with full awareness of the trade-offs.",
    },
    {
      year: 6,
      title: "Unexpected Success",
      mood: "positive",
      text: "The thing you built in the margins catches fire. An article goes viral, a product finds its market, a performance attracts the right audience. Suddenly, the unconventional path has conventional validation. Income jumps. Opportunities multiply. The irony: success in the alternate life comes from the exact qualities that felt like liabilities — your unconventional perspective, your willingness to fail, your refusal to follow the script.",
    },
    {
      year: 7,
      title: "The Price of Freedom",
      mood: "challenging",
      text: "Freedom has costs you didn't anticipate. Inconsistent income creates anxiety. The lack of structure means some months are brilliant and others are directionless. A health issue or family crisis reveals the gaps in your safety net. You consider returning to a more structured path — the temptation is strong. Instead, you build better systems while keeping the freedom that defines your alternate life.",
    },
    {
      year: 8,
      title: "Convergence",
      mood: "positive",
      text: "Your alternate path starts converging with elements of your original one — but on your terms. You bring structure without sacrificing freedom. You earn well without selling out. You build a team or community around your work. The skills from both paths — the discipline from your original trajectory and the creativity from the alternate — create a unique combination that few possess.",
    },
    {
      year: 9,
      title: "Wisdom from Both Worlds",
      mood: "neutral",
      text: "You've now lived enough of both paths to understand a fundamental truth: there's no 'right' life. Every choice creates gains and losses. The alternate path gave you perspective, resilience, and authenticity. The original path would have given you security, depth, and social validation. You stop comparing and start integrating. The insights from living differently become your greatest asset.",
    },
    {
      year: 10,
      title: "The Parallel Self",
      mood: "transformative",
      text: "A decade into the road not taken, you've become someone your original self wouldn't recognize — but would deeply respect. You've proven that safety isn't the only path to fulfillment. You've built a life that's messy, unconventional, and entirely yours. The parallel you — the one who stayed on the original path — is also fine. Different, but fine. The real lesson of the alternate life isn't that one path is better. It's that you're capable of thriving in any reality, as long as you bring honesty, courage, and the willingness to keep choosing.",
    },
  ],
};

export const simulations: Record<LifePath, SimulationData> = {
  love: loveSimulation,
  career: careerSimulation,
  financial: financialSimulation,
  personal: personalSimulation,
  alternate: alternateSimulation,
};
