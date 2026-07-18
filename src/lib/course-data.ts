// ============================================================
// LEAN SIX SIGMA GREEN & BLACK BELT — COMPLETE IMC COURSE DATA
// 100% Factual content aligned with ASQ & IASSC Body of Knowledge
// ============================================================

export interface VideoResource {
  title: string;
  youtubeId: string;
  duration: string;
  channel: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "green" | "black";
  topic: string;
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  phase: "define" | "measure" | "analyze" | "improve" | "control" | "lean" | "advanced" | "leadership";
  belt: "green" | "black" | "both";
  duration: string;
  keyTopics: string[];
  content: string;
  tools: string[];
  videos: VideoResource[];
  quizQuestions: QuizQuestion[];
}

// ── DMAIC Phase Colors ──
export const phaseColors: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  define: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", accent: "#34d399" },
  measure: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", accent: "#22d3ee" },
  analyze: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", accent: "#fbbf24" },
  improve: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/30", accent: "#a78bfa" },
  control: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", accent: "#fb7185" },
  lean: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30", accent: "#2dd4bf" },
  advanced: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", accent: "#fb923c" },
  leadership: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30", accent: "#f472b6" },
};

// ── COMPLETE MODULE DATA ──
export const modules: Module[] = [
  // ═══════════════════════════════════════════════════════
  //  GREEN BELT — DEFINE PHASE
  // ═══════════════════════════════════════════════════════
  {
    id: "gb-define-overview",
    title: "Six Sigma Fundamentals & Define Phase Overview",
    shortTitle: "Six Sigma Fundamentals",
    description: "Understand the origins, principles, and foundational framework of Six Sigma methodology including the DMAIC cycle, sigma levels, and the role of a Green Belt practitioner.",
    icon: "Target",
    phase: "define",
    belt: "green",
    duration: "2 hours",
    keyTopics: ["History of Six Sigma", "DMAIC Overview", "Sigma Levels & DPMO", "Roles & Responsibilities", "Project Selection"],
    content: `Six Sigma originated at Motorola in the mid-1980s when engineer Bill Smith developed the methodology as a quality measurement and improvement program. The term "Six Sigma" refers to a statistical measure where a process operates at 3.4 defects per million opportunities (DPMO), representing near-perfection in process performance. Motorola reported savings of over $17 billion from Six Sigma implementation in the first decade alone.

The methodology was later popularized by GE under Jack Welch's leadership in the 1990s, transforming it into a comprehensive business management strategy. Today, Six Sigma is widely adopted across manufacturing, healthcare, finance, technology, and service industries worldwide. The International Association for Six Sigma Certification (IASSC) and the American Society for Quality (ASQ) are the two primary certifying bodies.

The DMAIC cycle (Define, Measure, Analyze, Improve, Control) is the core problem-solving methodology of Six Sigma. Each phase builds upon the previous one, creating a structured approach to identifying root causes and implementing sustainable improvements. A Green Belt typically leads smaller projects within their functional area while supporting Black Belts on larger, cross-functional initiatives.

**Key Statistical Foundation**: The Greek letter σ (sigma) represents one standard deviation in a normal distribution. A process at "Six Sigma" level has its specification limits placed at six standard deviations from the mean, accounting for a 1.5σ mean shift (as per Motorola's empirical finding). This yields a defect rate of 3.4 DPMO for the shifted distribution.

**Sigma Level Conversion Table:**
- 1σ = 691,462 DPMO (30.85% yield)
- 2σ = 308,538 DPMO (69.15% yield)
- 3σ = 66,807 DPMO (93.32% yield)
- 4σ = 6,210 DPMO (99.38% yield)
- 5σ = 233 DPMO (99.977% yield)
- 6σ = 3.4 DPMO (99.99966% yield)`,
    tools: ["CTQ Drilldown Tree", "Project Charter", "SIPOC Diagram"],
    videos: [
      { title: "Basics of Six Sigma | Six Sigma Basic Training for Beginners", youtubeId: "P9YMWY-I5Yk", duration: "15:24", channel: "Simplilearn" },
      { title: "Six Sigma In 9 Minutes | What Is Six Sigma?", youtubeId: "4EDYfSl-fmc", duration: "9:45", channel: "Simplilearn" },
      { title: "Lean Six Sigma In 8 Minutes | What Is Lean Six Sigma?", youtubeId: "s2HCrhNVfak", duration: "8:12", channel: "Simplilearn" },
    ],
    quizQuestions: [
      {
        id: "q-d1",
        question: "What does Six Sigma mean in terms of defect rate?",
        options: ["3.4 defects per thousand", "3.4 defects per million opportunities", "6 defects per million", "34 defects per million"],
        correctIndex: 1,
        explanation: "Six Sigma equates to 3.4 defects per million opportunities (DPMO), representing a 99.99966% yield rate. This accounts for a 1.5σ process mean shift, which was empirically observed by Motorola.",
        difficulty: "green",
        topic: "Six Sigma Fundamentals"
      },
      {
        id: "q-d2",
        question: "Who developed the Six Sigma methodology at Motorola?",
        options: ["Jack Welch", "Bill Smith", "W. Edwards Deming", "Genichi Taguchi"],
        correctIndex: 1,
        explanation: "Bill Smith, an engineer at Motorola, is credited with developing Six Sigma in 1986. Jack Welch later popularized it at GE in the 1990s, while Deming and Taguchi contributed foundational quality concepts.",
        difficulty: "green",
        topic: "Six Sigma Fundamentals"
      },
      {
        id: "q-d3",
        question: "What does DMAIC stand for?",
        options: ["Design, Measure, Analyze, Improve, Control", "Define, Measure, Analyze, Improve, Control", "Define, Manage, Analyze, Implement, Control", "Direct, Measure, Assess, Improve, Confirm"],
        correctIndex: 1,
        explanation: "DMAIC stands for Define, Measure, Analyze, Improve, Control. It is the core improvement methodology used in Six Sigma for existing processes. (DMADV is used for new process/design projects.)",
        difficulty: "green",
        topic: "DMAIC"
      },
    ],
  },
  {
    id: "gb-voice-of-customer",
    title: "Voice of Customer (VOC) & CTQ Analysis",
    shortTitle: "VOC & CTQ",
    description: "Learn to capture, analyze, and translate customer needs into Critical-to-Quality (CTQ) characteristics using structured VOC collection methods and CTQ drilldown trees.",
    icon: "MessageSquare",
    phase: "define",
    belt: "green",
    duration: "2.5 hours",
    keyTopics: ["VOC Collection Methods", "Kano Model", "CTQ Trees", "Affinity Diagrams", "Customer Segmentation"],
    content: `The Voice of Customer (VOC) is a critical starting point in any Six Sigma project because it ensures improvements are aligned with what customers truly value. VOC encompasses all customer needs, expectations, preferences, and perceptions regarding a product, service, or process. Effective VOC capture requires systematic data collection through multiple channels.

**VOC Collection Methods:**
- **Surveys & Questionnaires**: Structured instruments using Likert scales, NPS (Net Promoter Score), and open-ended questions. Best for quantitative benchmarking across large populations.
- **Customer Interviews**: One-on-one semi-structured conversations that uncover deep insights. The "5 Whys" technique applied to customer pain points often reveals root needs.
- **Focus Groups**: Facilitated group discussions with 6-10 representative customers. Useful for exploring new product concepts or service improvements.
- **Observation & Ethnographic Studies**: Directly observing customers using products/services in their natural environment. Reveals unarticulated needs customers may not consciously recognize.
- **Complaint Analysis**: Mining warranty claims, support tickets, and return data to identify systematic failure patterns.
- **Social Media & Review Mining**: Analyzing online reviews, social mentions, and forums for unsolicited customer feedback at scale.

**Kano Model**: Developed by Professor Noriaki Kano, this model categorizes customer requirements into three types:
1. **Must-Be (Basic) Quality**: Expected features whose absence causes dissatisfaction but whose presence does not increase satisfaction (e.g., a car that starts reliably).
2. **One-Dimensional (Performance) Quality**: Features where more is better — satisfaction increases proportionally with performance (e.g., fuel efficiency).
3. **Attractive (Excitement) Quality**: Unexpected features that create disproportionate delight when present but do not cause dissatisfaction when absent (e.g., innovative technology features).

**CTQ (Critical-to-Quality) Drilldown Tree**: This tool translates broad customer needs into specific, measurable quality characteristics. The process involves:
- Starting with the customer need (e.g., "fast delivery")
- Drilling down to drivers (e.g., "short processing time," "accurate order entry")
- Converting to measurable CTQs (e.g., "order processing time < 4 hours," "order accuracy ≥ 99.5%")

Each CTQ must be Specific, Measurable, Attainable, Relevant, and Time-bound (SMART).`,
    tools: ["Kano Model", "CTQ Drilldown Tree", "Affinity Diagram", "Customer Journey Map"],
    videos: [
      { title: "Voice of Customer (VOC) | Six Sigma", youtubeId: "yQTKLLibzEg", duration: "6:31", channel: "Learn LEAN Six Sigma FREE" },
      { title: "Kano Model - Implementations & Customer Satisfaction", youtubeId: "ZT8lnHGay_8", duration: "9:15", channel: "QualityGurus" },
    ],
    quizQuestions: [
      {
        id: "q-voc1",
        question: "In the Kano Model, which category describes features that cause dissatisfaction when absent but do not increase satisfaction when present?",
        options: ["One-Dimensional Quality", "Must-Be (Basic) Quality", "Attractive (Excitement) Quality", "Indifferent Quality"],
        correctIndex: 1,
        explanation: "Must-Be (Basic) Quality features are baseline expectations. Their absence causes great dissatisfaction, but their presence is simply taken for granted. They are the 'price of admission' requirements.",
        difficulty: "green",
        topic: "VOC & CTQ"
      },
      {
        id: "q-voc2",
        question: "What does CTQ stand for in Six Sigma?",
        options: ["Critical to Quality", "Customer Time Quantification", "Cost to Quality", "Critical Testing Qualification"],
        correctIndex: 0,
        explanation: "CTQ stands for Critical-to-Quality. These are the measurable characteristics of a product or process that must be within specification to satisfy the customer. They are derived from the Voice of Customer.",
        difficulty: "green",
        topic: "VOC & CTQ"
      },
    ],
  },
  {
    id: "gb-project-charter",
    title: "Project Charter & Team Dynamics",
    shortTitle: "Project Charter",
    description: "Master the creation of effective project charters including problem statements, goal statements, scope definition, and the formation and management of high-performing project teams.",
    icon: "FileText",
    phase: "define",
    belt: "green",
    duration: "2 hours",
    keyTopics: ["Problem Statement", "Goal Statement", "Scope (In/Out)", "Business Case", "Team Formation", "Stakeholder Analysis"],
    content: `The Project Charter is the single most important document in a Six Sigma project. It serves as a formal agreement between the project team and leadership, establishing the project's purpose, scope, goals, resources, and timeline. A well-crafted charter prevents scope creep and ensures alignment with organizational strategy.

**Essential Elements of a Project Charter:**

1. **Problem Statement**: A clear, data-driven description of the problem that answers: What is wrong? Where does it occur? When does it occur? How big is it? The problem statement must be specific and quantifiable. Avoid solutions in the problem statement.
   - *Weak*: "Customer service is bad."
   - *Strong*: "Customer complaint rate for Product X has increased from 2.3% to 5.8% over Q1-Q3 2024, representing an estimated $1.2M in lost revenue and 340 customer defections."

2. **Goal Statement**: A SMART (Specific, Measurable, Achievable, Relevant, Time-bound) target that defines success.
   - *Example*: "Reduce customer complaint rate for Product X from 5.8% to ≤2.0% by March 31, 2025, yielding an estimated annual savings of $800K."

3. **Project Scope**: Defines the boundaries of the project using In-Scope and Out-of-Scope elements. This prevents scope creep and focuses team efforts.
   - In-Scope: Order fulfillment process from order entry through shipping
   - Out-of-Scope: Product design changes, supplier qualification

4. **Business Case / Financial Impact**: ROI, NPV, Cost of Poor Quality (COPQ), or revenue impact. Leadership uses this to prioritize projects. COPQ categories include:
   - Internal Failure Costs (scrap, rework)
   - External Failure Costs (warranty, returns, complaints)
   - Appraisal Costs (inspection, testing)
   - Prevention Costs (training, process design)

5. **Team Members & Roles**: Champion/Sponsor, Black Belt/Green Belt, Team Members, Subject Matter Experts (SMEs).

**Stakeholder Analysis**: A power-interest grid maps stakeholders by their influence (power) and vested interest. High-power, high-interest stakeholders require active management and regular communication. Low-power, high-interest stakeholders need to be kept informed. This analysis shapes the communication plan.`,
    tools: ["Project Charter Template", "Stakeholder Analysis Matrix", "SIPOC Diagram", "Communication Plan"],
    videos: [
      { title: "Introduction to the Lean Six Sigma Project Charter", youtubeId: "QMp5MDAgghc", duration: "10:02", channel: "Six Sigma Development Solutions Inc." },
      { title: "Project Charter: The Critical Foundation Every Project Needs to Succeed", youtubeId: "v33MyHxc7p4", duration: "13:21", channel: "LEARN & APPLY : Lean and Six Sigma" },
    ],
    quizQuestions: [
      {
        id: "q-pc1",
        question: "Which of the following is the BEST problem statement for a Six Sigma project?",
        options: [
          "We need to improve the process.",
          "The defect rate in the assembly line is 8.3%, costing $2.1M annually, and has increased 40% since January 2024.",
          "We should implement a new ERP system.",
          "Customers are unhappy with delivery times."
        ],
        correctIndex: 1,
        explanation: "An effective problem statement is data-driven, specific, and quantifiable. It should describe what is wrong, where, when, and the magnitude of impact — without proposing solutions. Option B meets all these criteria.",
        difficulty: "green",
        topic: "Project Charter"
      },
      {
        id: "q-pc2",
        question: "Which Cost of Poor Quality (COPQ) category does 'scrap and rework' belong to?",
        options: ["Prevention Costs", "Appraisal Costs", "Internal Failure Costs", "External Failure Costs"],
        correctIndex: 2,
        explanation: "Scrap and rework are Internal Failure Costs — costs incurred when defects are detected before the product reaches the customer. External Failure Costs (warranty, returns) occur after the customer receives the product.",
        difficulty: "green",
        topic: "Project Charter"
      },
    ],
  },
  {
    id: "gb-sipoc",
    title: "SIPOC & Process Mapping",
    shortTitle: "SIPOC & Process Maps",
    description: "Create high-level process maps using SIPOC diagrams and detailed process maps with swimlane diagrams, value stream mapping basics, and process documentation standards.",
    icon: "GitBranch",
    phase: "define",
    belt: "green",
    duration: "2 hours",
    keyTopics: ["SIPOC Diagram", "Process Flowcharts", "Swimlane Diagrams", "Value Stream Basics", "Process Documentation"],
    content: `Process mapping is the visual representation of a process that helps teams understand the current state, identify waste, and locate opportunities for improvement. SIPOC (Suppliers, Inputs, Process, Outputs, Customers) is the most commonly used high-level process map in Six Sigma Define phase.

**SIPOC Diagram:**
A SIPOC provides a high-level view of a process in a single table format:
- **S — Suppliers**: Who provides the inputs? (internal/external)
- **I — Inputs**: What materials, information, or resources enter the process?
- **P — Process**: What are the high-level steps? (typically 4-7 major steps)
- **O — Outputs**: What products, services, or information result?
- **C — Customers**: Who receives the outputs?

The SIPOC ensures all team members share a common understanding of process boundaries and stakeholders. It is particularly useful early in a project when the team is forming and process knowledge is fragmented.

**Process Flowcharts**: More detailed than SIPOC, flowcharts show decision points, loops, rework paths, and parallel activities. Standard flowchart symbols include:
- Oval/Oval: Start/End (Terminal)
- Rectangle: Process step
- Diamond: Decision point
- Parallelogram: Input/Output
- Arrow: Flow direction

**Swimlane Diagrams**: Also called cross-functional flowcharts, these allocate process steps to different departments, roles, or teams in horizontal or vertical lanes. They are invaluable for identifying handoff points, delays, and responsibility gaps.

**Key Process Metrics to Identify During Mapping:**
- Cycle Time: Total elapsed time from start to finish
- Lead Time: Cycle time plus waiting/queue time
- Takt Time: Available production time divided by customer demand rate (Pace = Demand / Time)
- Value-Added vs. Non-Value-Added Time: Only steps that transform the product/service toward customer requirements are value-added (typically <25% of total lead time in most processes)`,
    tools: ["SIPOC Diagram", "Process Flowchart", "Swimlane Diagram", "Spaghetti Diagram"],
    videos: [
      { title: "Master SIPOC Diagrams: 5 Steps to Process Perfection", youtubeId: "zn5qnS-iSW4", duration: "12:15", channel: "Rahul Iyer | AIGPE®" },
      { title: "Six Sigma Process Mapping Explained", youtubeId: "mbaYoxVvJNU", duration: "12:00", channel: "Invensis Learning" },
    ],
    quizQuestions: [
      {
        id: "q-sp1",
        question: "What does SIPOC stand for?",
        options: ["Standard Input Process Output Chart", "Suppliers, Inputs, Process, Outputs, Customers", "System Integration Process Optimization Chart", "Statistical Input Process Output Control"],
        correctIndex: 1,
        explanation: "SIPOC stands for Suppliers, Inputs, Process, Outputs, Customers. It is a high-level process mapping tool used in the Define phase to establish process boundaries and key stakeholders.",
        difficulty: "green",
        topic: "Process Mapping"
      },
      {
        id: "q-sp2",
        question: "What is Takt Time?",
        options: ["The time it takes to complete one unit", "Available production time divided by customer demand rate", "The average cycle time of a process", "The time between defects occurring"],
        correctIndex: 1,
        explanation: "Takt Time = Available Time / Customer Demand. It represents the pace at which you need to produce to meet customer demand. For example, if customers demand 480 units per 8-hour shift, Takt Time = 480 minutes / 480 units = 1 minute per unit.",
        difficulty: "green",
        topic: "Process Mapping"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  GREEN BELT — MEASURE PHASE
  // ═══════════════════════════════════════════════════════
  {
    id: "gb-measure-basics",
    title: "Measurement Systems Analysis (MSA)",
    shortTitle: "MSA / Gage R&R",
    description: "Evaluate measurement system quality through Gage R&R studies, accuracy, precision, linearity, stability, and resolution to ensure data reliability for decision making.",
    icon: "Ruler",
    phase: "measure",
    belt: "green",
    duration: "3 hours",
    keyTopics: ["Accuracy vs Precision", "Gage R&R", "Bias & Linearity", "Stability", "Attribute Agreement Analysis"],
    content: `Before collecting process data, you must verify that your measurement system is reliable. A measurement system that produces unreliable data will lead to incorrect conclusions regardless of how sophisticated your analysis is. Measurement Systems Analysis (MSA) quantifies the variation introduced by the measurement system itself.

**Key Concepts:**
- **Accuracy**: The closeness of the average measured value to the true (reference) value. Accuracy consists of:
  - **Bias**: Systematic difference between observed average and reference value. (Accuracy = Lack of Bias)
  - **Linearity**: Consistency of bias across the operating range of the measurement device.
  - **Stability**: Consistency of bias over time (drift detection).

- **Precision**: The closeness of repeated measurements to each other. Precision consists of:
  - **Repeatability**: Variation when the same operator measures the same part multiple times with the same device. (Equipment variation)
  - **Reproducibility**: Variation when different operators measure the same parts. (Appraiser variation)

**Gage R&R (Repeatability & Reproducibility) Study:**
The most common MSA method for continuous data. The study involves:
1. Selecting 5-10 parts that represent the process variation range
2. Having 2-3 appraisers measure each part 2-3 times (in random order)
3. Calculating the percentage of total variation attributable to the measurement system

**Acceptance Criteria (AIAG Guidelines):**
- %GRR < 10%: Measurement system is acceptable
- 10% ≤ %GRR < 30%: May be acceptable depending on application (cost of measurement vs. improvement importance)
- %GRR ≥ 30%: Measurement system is NOT acceptable — must improve before proceeding

**Number of Distinct Categories (ndc):**
This metric tells you how many groups your measurement system can reliably distinguish. ndc ≥ 5 is acceptable; ndc < 5 indicates the measurement system cannot adequately discriminate between parts.

**Attribute Agreement Analysis:**
For pass/fail or categorical data, use Attribute Agreement Analysis (also called kappa analysis). It measures:
- Within-Appraiser agreement (repeatability for attribute data)
- Between-Appraiser agreement (reproducibility)
- Appraiser vs. Standard agreement (accuracy)`,
    tools: ["Gage R&R Study", "Bias & Linearity Study", "Attribute Agreement Analysis", "Control Chart for Stability"],
    videos: [
      { title: "Measurement System Analysis (MSA) Explained", youtubeId: "k8NLd5linfw", duration: "15:42", channel: "LEARN & APPLY : Lean and Six Sigma" },
      { title: "GRR - Gage R&R Study (Crossed): MSA Tools with Examples", youtubeId: "6sRN1lCTqSM", duration: "18:24", channel: "LEARN & APPLY : Lean and Six Sigma" },
    ],
    quizQuestions: [
      {
        id: "q-msa1",
        question: "According to AIAG guidelines, what is the maximum acceptable %GRR for a measurement system?",
        options: ["5%", "10%", "30%", "50%"],
        correctIndex: 2,
        explanation: "Per AIAG (Automotive Industry Action Group) guidelines: <10% is ideal, 10-30% may be acceptable depending on the application, and ≥30% is unacceptable. The measurement system must be improved before relying on its data.",
        difficulty: "green",
        topic: "MSA"
      },
      {
        id: "q-msa2",
        question: "What does Repeatability in a Gage R&R study measure?",
        options: ["Variation between different operators", "Variation when the same operator measures the same part multiple times", "The difference between measured and true value", "Consistency over time"],
        correctIndex: 1,
        explanation: "Repeatability (equipment variation) measures how consistently the same operator gets the same result when measuring the same part repeatedly with the same gage. Reproducibility measures variation between different operators.",
        difficulty: "green",
        topic: "MSA"
      },
    ],
  },
  {
    id: "gb-basic-stats",
    title: "Basic Statistics & Probability",
    shortTitle: "Statistics Fundamentals",
    description: "Build a solid foundation in descriptive statistics, probability distributions, the Central Limit Theorem, and statistical inference concepts essential for Six Sigma analysis.",
    icon: "BarChart3",
    phase: "measure",
    belt: "green",
    duration: "4 hours",
    keyTopics: ["Descriptive Statistics", "Normal Distribution", "Central Limit Theorem", "Probability", "Sampling Strategies"],
    content: `Statistical literacy is the foundation of data-driven decision making in Six Sigma. This module covers the essential statistical concepts that underpin every subsequent analytical tool.

**Descriptive Statistics:**
- **Mean (μ for population, x̄ for sample)**: The arithmetic average. Sensitive to outliers.
- **Median**: The middle value when data is sorted. Robust to outliers.
- **Mode**: The most frequently occurring value. Useful for categorical data.
- **Range**: Maximum - Minimum. Simple but only uses two data points.
- **Variance (σ² or s²)**: Average of squared deviations from the mean. Measures spread.
- **Standard Deviation (σ or s)**: Square root of variance. Same units as the data.
- **Skewness**: Measures asymmetry. Positive skew = right tail; Negative skew = left tail.
- **Kurtosis**: Measures tail heaviness. Excess kurtosis > 0 = heavy tails (leptokurtic).

**The Normal Distribution:**
The bell-shaped curve described by f(x) = (1/σ√2π) × e^(-(x-μ)²/2σ²). Key properties:
- 68.27% of data falls within ±1σ
- 95.45% of data falls within ±2σ
- 99.73% of data falls within ±3σ
- Mean = Median = Mode (perfectly symmetrical)

**Central Limit Theorem (CLT):**
The CLT states that the sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the shape of the population distribution. This is arguably the most important theorem in statistics because it justifies the use of parametric tests.

Practical rule: For n ≥ 30, the sampling distribution is approximately normal even for highly skewed populations. For n ≥ 60, it works for virtually any population distribution.

**Sampling Strategies:**
- **Simple Random Sampling**: Every member has equal probability of selection.
- **Stratified Sampling**: Population divided into strata; random samples taken from each. Ensures representation of subgroups.
- **Systematic Sampling**: Every kth item selected from a sorted list. Simple but vulnerable to periodic patterns.
- **Cluster Sampling**: Population divided into clusters; entire clusters are randomly selected. Cost-effective for geographically dispersed populations.

**Sample Size Determination:**
For estimating a mean: n = (Z × σ / E)² where Z = Z-score for desired confidence, σ = population std dev, E = margin of error.
For estimating a proportion: n = (Z² × p × (1-p)) / E² where p = estimated proportion.`,
    tools: ["Histogram", "Box Plot", "Normal Probability Plot", "Descriptive Statistics Summary"],
    videos: [
      { title: "Six Sigma Green Belt Full Course Training", youtubeId: "KfFez57ay6E", duration: "7:12:00", channel: "Simplilearn" },
      { title: "Central Limit Theorem Explained", youtubeId: "JNm3M9cqWyc", duration: "10:08", channel: "Khan Academy" },
    ],
    quizQuestions: [
      {
        id: "q-st1",
        question: "According to the Central Limit Theorem, for sample sizes ≥ 30, what can be assumed about the sampling distribution of the mean?",
        options: [
          "It follows a binomial distribution",
          "It is approximately normal regardless of the population distribution shape",
          "It has the same standard deviation as the population",
          "It is always exactly normal"
        ],
        correctIndex: 1,
        explanation: "The CLT states that the sampling distribution of the mean approximates a normal distribution as n increases, regardless of the population's distribution. For n ≥ 30, this approximation is generally considered sufficient for most practical purposes.",
        difficulty: "green",
        topic: "Statistics"
      },
      {
        id: "q-st2",
        question: "In a normal distribution, approximately what percentage of data falls within ±2 standard deviations of the mean?",
        options: ["68.27%", "95.45%", "99.73%", "99.99%"],
        correctIndex: 1,
        explanation: "The empirical rule (68-95-99.7 rule) states: ~68.27% within ±1σ, ~95.45% within ±2σ, and ~99.73% within ±3σ of the mean in a normal distribution.",
        difficulty: "green",
        topic: "Statistics"
      },
    ],
  },
  {
    id: "gb-process-capability",
    title: "Process Capability Analysis (Cp, Cpk, Pp, Ppk)",
    shortTitle: "Process Capability",
    description: "Assess process performance against specifications using capability indices, understand short-term vs long-term capability, and learn to interpret capability results for process improvement decisions.",
    icon: "Gauge",
    phase: "measure",
    belt: "green",
    duration: "3 hours",
    keyTopics: ["Cp & Cpk", "Pp & Ppk", "Sigma Level", "Specification Limits", "Process Performance vs Capability"],
    content: `Process capability analysis compares the voice of the process (actual process performance) to the voice of the customer (specification limits). It answers the fundamental question: "Is my process capable of consistently meeting customer requirements?"

**Specification Limits:**
- **Upper Specification Limit (USL)**: Maximum acceptable value
- **Lower Specification Limit (LSL)**: Minimum acceptable value
- These are set by the customer or engineering requirements, NOT by the process itself.

**Short-Term Capability Indices (Cp, Cpk):**
Use within-subgroup (short-term) variation. Reflects the process's best potential performance.

- **Cp (Process Capability)** = (USL - LSL) / (6 × σ_within)
  Measures the potential capability if the process is perfectly centered. Cp does NOT consider process centering.
  - Cp < 1: Process is NOT capable (spec width < 6σ)
  - Cp = 1: Process is just barely capable
  - Cp = 1.33: Generally considered minimum acceptable for many industries
  - Cp ≥ 1.67: Excellent capability (Six Sigma target is Cp = 2.0)

- **Cpk (Process Capability Index)** = min[(USL - μ) / (3σ), (μ - LSL) / (3σ)]
  Accounts for process centering. Cpk ≤ Cp always. A process with Cp = 2.0 but Cpk = 0.8 is off-center and producing defects despite having the potential to be excellent.

**Long-Term Performance Indices (Pp, Ppk):**
Use overall (long-term) variation including between-subgroup variation. Reflects actual process performance over time.

- **Pp** = (USL - LSL) / (6 × σ_overall)
- **Ppk** = min[(USL - x̄) / (3σ_overall), (x̄ - LSL) / (3σ_overall)]

**Cp vs Pp and Cpk vs Ppk:**
- If Cp ≈ Pp and Cpk ≈ Ppk: Process is stable over time (good!)
- If Cp > Pp significantly: Process has shifts or drifts between subgroups (special cause variation present)
- The difference reveals whether the process is statistically stable.

**Defect Rate Calculation from Cpk:**
- Cpk = 1.00 → ~2,700 PPM defective (0.27%)
- Cpk = 1.33 → ~63 PPM defective
- Cpk = 1.67 → ~0.6 PPM defective
- Cpk = 2.00 → ~0.002 PPM defective (Six Sigma level)`,
    tools: ["Capability Study", "Histogram with Spec Limits", "Control Chart", "Normal Probability Plot"],
    videos: [
      { title: "What is Process Capability Cp Cpk? Explained with Animated Examples", youtubeId: "33sfW_MJJpE", duration: "12:15", channel: "Digital E-Learning" },
      { title: "What is the difference Between Cpk and Ppk?", youtubeId: "DgDOUFYDrio", duration: "8:40", channel: "Green Belt Academy" },
    ],
    quizQuestions: [
      {
        id: "q-pc1",
        question: "What is the primary difference between Cp and Cpk?",
        options: [
          "Cp uses long-term variation, Cpk uses short-term",
          "Cpk accounts for process centering while Cp does not",
          "Cpk is only used for attribute data",
          "Cp is for normal distributions, Cpk for non-normal"
        ],
        correctIndex: 1,
        explanation: "Cp measures potential capability assuming perfect centering (only uses spec width and spread). Cpk accounts for where the process is actually centered relative to specifications. Cpk = Cp only when the process is perfectly centered.",
        difficulty: "green",
        topic: "Process Capability"
      },
      {
        id: "q-pc2",
        question: "A process has Cp = 1.8 but Cpk = 0.9. What does this indicate?",
        options: [
          "The process is highly capable",
          "The process has high short-term variation",
          "The process is off-center — it has the potential to be capable but is shifted",
          "The specification limits are too wide"
        ],
        correctIndex: 2,
        explanation: "A high Cp with low Cpk indicates the process has low variation (good potential) but is not centered between the specification limits. The process needs to be shifted to be centered, which would improve Cpk toward Cp.",
        difficulty: "green",
        topic: "Process Capability"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  GREEN BELT — ANALYZE PHASE
  // ═══════════════════════════════════════════════════════
  {
    id: "gb-hypothesis-testing",
    title: "Hypothesis Testing Fundamentals",
    shortTitle: "Hypothesis Testing",
    description: "Master the framework of statistical hypothesis testing including Type I/II errors, p-values, confidence intervals, and common parametric and non-parametric tests.",
    icon: "FlaskConical",
    phase: "analyze",
    belt: "green",
    duration: "4 hours",
    keyTopics: ["Null & Alternative Hypotheses", "Type I & II Errors", "p-Values", "Confidence Intervals", "t-Tests", "ANOVA Basics"],
    content: `Hypothesis testing is the statistical method used to make decisions about population parameters based on sample data. It is the backbone of the Analyze phase, allowing you to determine whether observed differences or relationships are statistically significant or merely due to random variation.

**The Hypothesis Testing Framework:**
1. **Formulate Hypotheses**:
   - H₀ (Null Hypothesis): The status quo — no difference, no effect, no change. (e.g., "The mean processing time is 45 minutes.")
   - H₁ or Hₐ (Alternative Hypothesis): What you want to prove — there IS a difference or effect. (e.g., "The mean processing time differs from 45 minutes.")

2. **Select Significance Level (α)**: Typically α = 0.05 (5% risk of Type I error). This is the threshold below which we reject H₀.

3. **Choose the Appropriate Test**: Depends on data type, number of groups, and assumptions (normality, equal variances).

4. **Calculate Test Statistic & p-value**: The p-value is the probability of observing a test statistic as extreme as (or more extreme than) the one calculated, assuming H₀ is true.

5. **Make a Decision**:
   - If p-value < α → Reject H₀ (statistically significant)
   - If p-value ≥ α → Fail to reject H₀ (not statistically significant)

**Type I and Type II Errors:**
- **Type I Error (α)**: Rejecting H₀ when it is actually true (False Positive). Probability = α.
- **Type II Error (β)**: Failing to reject H₀ when it is actually false (False Negative). Probability = β.
- **Power (1-β)**: The probability of correctly rejecting a false H₀ (True Positive). Typically aim for power ≥ 0.80.

**Common Hypothesis Tests for Six Sigma:**

| Test | Purpose | Data Type | Groups |
|------|---------|-----------|--------|
| 1-Sample t-test | Compare mean to target | Continuous | 1 vs. reference |
| 2-Sample t-test | Compare two means | Continuous | 2 |
| Paired t-test | Compare paired observations | Continuous | 2 (paired) |
| One-Way ANOVA | Compare multiple means | Continuous | 3+ |
| Chi-Square Test | Test independence | Categorical | 2+ |
| F-Test | Compare variances | Continuous | 2 |
| Mann-Whitney U | Non-parametric 2-group | Continuous/Ordinal | 2 |

**Confidence Intervals:**
A confidence interval provides a range of plausible values for a population parameter. A 95% CI means: if we repeated the study 100 times, approximately 95 of those intervals would contain the true population parameter. It does NOT mean there is a 95% probability the true value is in the interval.`,
    tools: ["Hypothesis Testing Flowchart", "t-Test", "ANOVA", "Chi-Square Test", "Minitab/JMP"],
    videos: [
      { title: "Understanding Hypothesis Testing in Six Sigma", youtubeId: "IpTyww3zpps", duration: "15:20", channel: "Lean Six Sigma Bureau" },
      { title: "p-values: What they are and how to interpret them", youtubeId: "vemZtEM63GY", duration: "7:31", channel: "StatQuest with Josh Starmer" },
    ],
    quizQuestions: [
      {
        id: "q-ht1",
        question: "If you reject the null hypothesis when it is actually true, what type of error have you committed?",
        options: ["Type II Error", "Type I Error", "Sampling Error", "Measurement Error"],
        correctIndex: 1,
        explanation: "A Type I Error (false positive) occurs when you reject H₀ when it is actually true. The probability of a Type I Error equals the significance level α (typically 0.05). A Type II Error is failing to reject H₀ when it is false.",
        difficulty: "green",
        topic: "Hypothesis Testing"
      },
      {
        id: "q-ht2",
        question: "Which test would you use to compare the means of three or more independent groups?",
        options: ["2-Sample t-test", "Paired t-test", "One-Way ANOVA", "Chi-Square Test"],
        correctIndex: 2,
        explanation: "One-Way ANOVA (Analysis of Variance) is used to compare means across 3 or more independent groups. Using multiple t-tests for 3+ groups inflates the Type I error rate (multiple comparisons problem).",
        difficulty: "green",
        topic: "Hypothesis Testing"
      },
    ],
  },
  {
    id: "gb-root-cause",
    title: "Root Cause Analysis & FMEA",
    shortTitle: "RCA & FMEA",
    description: "Apply structured root cause analysis techniques including the 5 Whys, Cause-and-Effect (Fishbone/Ishikawa) diagrams, and Failure Mode and Effects Analysis (FMEA) to identify and prioritize risks.",
    icon: "Search",
    phase: "analyze",
    belt: "green",
    duration: "3 hours",
    keyTopics: ["5 Whys Analysis", "Fishbone Diagram", "FMEA", "Fault Tree Analysis", "Pareto Analysis"],
    content: `Root Cause Analysis (RCA) is the systematic process of identifying the fundamental reason(s) for a problem. In Six Sigma, the goal is not to treat symptoms but to find and eliminate root causes to prevent problem recurrence.

**5 Whys Analysis:**
Developed by Sakichi Toyoda (Toyota Production System), the 5 Whys is a simple but powerful technique:
- Ask "Why?" five times (or until the root cause is revealed)
- Each answer forms the basis for the next question
- The final "why" should point to a process or system failure, not a person

Example:
1. Why did the order ship late? → It was not packed on time.
2. Why was it not packed on time? → The picking list was delayed.
3. Why was the picking list delayed? → The inventory system showed incorrect stock levels.
4. Why were stock levels incorrect? → The cycle count process was skipped for 3 weeks.
5. Why was cycle counting skipped? → There is no scheduled audit for the cycle count process. (Root Cause)

**Fishbone (Ishikawa) Diagram:**
Also called a Cause-and-Effect diagram, it organizes potential causes into categories:
- **6M Framework**: Man, Machine, Method, Material, Measurement, Mother Nature (Environment)
- **4P Framework (Service)**: Policies, Procedures, People, Plant/Technology
- **8P Framework**: Prices, Promotion, Processes, People, Product, Place, Productivity, Physical Evidence

The diagram is constructed with the effect (problem) at the fish head and causes branching into the major categories. Brainstorming sessions with cross-functional teams produce the most comprehensive diagrams.

**FMEA (Failure Mode and Effects Analysis):**
FMEA is a systematic, proactive method for evaluating a process to identify where and how it might fail, and to assess the relative impact of different failures. Two main types:
- **Process FMEA (PFMEA)**: Analyzes manufacturing/assembly processes
- **Design FMEA (DFMEA)**: Analyzes product designs

**FMEA Risk Priority Number (RPN):**
RPN = Severity (S) × Occurrence (O) × Detection (D)
- Each rated on a scale of 1-10
- Severity: Impact of the failure on the customer (1 = no effect, 10 = safety hazard)
- Occurrence: Likelihood of the failure mode occurring (1 = remote, 10 = very high)
- Detection: Ability of current controls to detect the failure before reaching the customer (1 = almost certain to detect, 10 = no detection capability)
- Higher RPN = Higher priority for corrective action

**Pareto Analysis (80/20 Rule):**
The Pareto principle states that roughly 80% of effects come from 20% of causes. A Pareto chart is a bar chart ordered by frequency/magnitude with a cumulative percentage line. This helps prioritize which root causes to address first for maximum impact.`,
    tools: ["5 Whys", "Fishbone Diagram", "FMEA Worksheet", "Pareto Chart", "Fault Tree Analysis"],
    videos: [
      { title: "Fishbone Diagram Or Ishikawa Diagram | Lean Six Sigma", youtubeId: "MTDWgv_f7s8", duration: "14:52", channel: "Anexas" },
      { title: "Mastering FMEA | Failure Modes and Effects Analysis Explained", youtubeId: "EaD1qgsRNr0", duration: "20:11", channel: "Anexas" },
    ],
    quizQuestions: [
      {
        id: "q-rca1",
        question: "In FMEA, how is the Risk Priority Number (RPN) calculated?",
        options: ["Severity + Occurrence + Detection", "Severity × Occurrence × Detection", "Severity × Occurrence / Detection", "(Severity + Occurrence) × Detection"],
        correctIndex: 1,
        explanation: "RPN = Severity (S) × Occurrence (O) × Detection (D). Each factor is rated 1-10, so the maximum RPN is 1000. Higher RPNs indicate higher risk and should be prioritized for corrective action.",
        difficulty: "green",
        topic: "Root Cause Analysis"
      },
      {
        id: "q-rca2",
        question: "In a Fishbone diagram using the 6M framework, which category relates to environmental factors?",
        options: ["Machine", "Method", "Mother Nature", "Measurement"],
        correctIndex: 2,
        explanation: "In the 6M framework (Man, Machine, Method, Material, Measurement, Mother Nature), 'Mother Nature' refers to environmental factors such as temperature, humidity, dust, vibration, and lighting that may affect the process.",
        difficulty: "green",
        topic: "Root Cause Analysis"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  GREEN BELT — IMPROVE PHASE
  // ═══════════════════════════════════════════════════════
  {
    id: "gb-doe-basics",
    title: "Design of Experiments (DOE) Fundamentals",
    shortTitle: "DOE Basics",
    description: "Learn the principles of designed experiments including full factorial and fractional factorial designs, main effects, interaction effects, and how to interpret DOE results for process optimization.",
    icon: "Beaker",
    phase: "improve",
    belt: "green",
    duration: "3.5 hours",
    keyTopics: ["Full Factorial Design", "Fractional Factorial", "Main Effects", "Interactions", "Screening Designs"],
    content: `Design of Experiments (DOE) is a powerful statistical method for planning, conducting, and analyzing controlled tests to evaluate the factors that may influence a response variable. Unlike One-Factor-At-A-Time (OFAT) experimentation, DOE varies multiple factors simultaneously, revealing interactions that OFAT methods miss entirely.

**Why DOE beats OFAT:**
OFAT changes one factor at a time while holding others constant. This approach:
- Misses interaction effects between factors
- Requires many more experimental runs for the same information
- Cannot detect optimal factor combinations
- Is statistically inefficient

**Key DOE Terminology:**
- **Factor (X)**: An independent variable that may influence the response (e.g., temperature, pressure, concentration)
- **Level**: The specific values a factor can take (e.g., "low" and "high" or specific numeric values)
- **Response (Y)**: The dependent variable being measured (e.g., yield, strength, defect rate)
- **Run**: A single experimental condition (a specific combination of factor levels)
- **Replication**: Repeating the same experimental condition to estimate experimental error
- **Randomization**: Running experimental conditions in random order to minimize bias from lurking variables

**Full Factorial Design (2^k):**
Tests ALL possible combinations of factor levels. For k factors at 2 levels each, this requires 2^k runs.
- 2 factors: 4 runs (2²)
- 3 factors: 8 runs (2³)
- 4 factors: 16 runs (2⁴)
- 5 factors: 32 runs (2⁵)

**Fractional Factorial Design (2^(k-p)):**
Tests a carefully selected fraction of the full factorial. For example, a 2^(5-1) half-fraction tests 5 factors in 16 runs instead of 32. This is possible because higher-order interactions (3-way, 4-way) are often negligible (Sparsity of Effects Principle).

**Main Effects and Interactions:**
- **Main Effect**: The average change in response when a factor moves from its low to high level, averaged across all levels of other factors.
- **Interaction Effect**: When the effect of one factor depends on the level of another factor. A 2-way interaction between Factor A and Factor B means A's effect changes depending on B's level.

**Analyzing DOE Results:**
1. Create a main effects plot: Plot the average response at each level of each factor
2. Create an interaction plot: Plot the response for each factor at each level of the other factor
3. Use ANOVA to determine which effects are statistically significant (p < 0.05)
4. Build a regression model: Y = β₀ + β₁A + β₂B + β₁₂AB + ...`,
    tools: ["Full Factorial Design", "Fractional Factorial Design", "Main Effects Plot", "Interaction Plot", "DOE Software (Minitab)"],
    videos: [
      { title: "Design of Experiment (DOE): Introduction, Terms and Concepts (PART 1)", youtubeId: "aWhIlCOImXg", duration: "18:15", channel: "LEARN & APPLY : Lean and Six Sigma" },
      { title: "Introduction to Design of Experiments (DOE) Part 1", youtubeId: "H-c-GR0DIPM", duration: "18:45", channel: "Learn With Dr. Hakeem-Ur-Rehman" },
    ],
    quizQuestions: [
      {
        id: "q-doe1",
        question: "What is the primary advantage of DOE over One-Factor-At-A-Time (OFAT) experimentation?",
        options: [
          "DOE requires fewer total runs",
          "DOE can detect interaction effects between factors",
          "DOE is easier to analyze",
          "DOE does not require randomization"
        ],
        correctIndex: 1,
        explanation: "The key advantage of DOE is its ability to detect interaction effects — situations where the effect of one factor depends on the level of another factor. OFAT completely misses these interactions, which are common in real-world processes.",
        difficulty: "green",
        topic: "DOE"
      },
      {
        id: "q-doe2",
        question: "A 2^3 full factorial design has how many experimental runs (without replication)?",
        options: ["3", "6", "8", "9"],
        correctIndex: 2,
        explanation: "A 2^k full factorial design requires 2^k runs. For 3 factors (k=3), this is 2³ = 8 runs. Each run represents a unique combination of the high and low levels of all three factors.",
        difficulty: "green",
        topic: "DOE"
      },
    ],
  },
  {
    id: "gb-improve-solutions",
    title: "Solution Selection & Implementation",
    shortTitle: "Solution Selection",
    description: "Evaluate and select improvement solutions using structured decision-making tools including Pugh Matrix, Impact-Effort Matrix, pilot planning, and Poka-Yoke (mistake-proofing) techniques.",
    icon: "Lightbulb",
    phase: "improve",
    belt: "green",
    duration: "2.5 hours",
    keyTopics: ["Pugh Matrix", "Impact-Effort Matrix", "Poka-Yoke", "Pilot Planning", "Cost-Benefit Analysis"],
    content: `Once root causes are identified and validated, the Improve phase focuses on generating, evaluating, and implementing solutions. A structured approach prevents jumping to the first solution and ensures optimal resource allocation.

**Solution Generation Techniques:**
- **Brainstorming**: Free-flowing idea generation without judgment. Use in sessions of 6-12 people with a trained facilitator. Follow the rules: defer judgment, quantity over quality, build on others' ideas, encourage wild ideas.
- **Benchmarking**: Studying best practices from other organizations or industries. Types include internal, competitive, functional, and generic benchmarking.
- **TRIZ (Theory of Inventive Problem Solving)**: A systematic innovation methodology developed by Genrich Altshuller based on analysis of 40,000+ patents. Uses 40 inventive principles and contradiction matrices.

**Pugh Matrix (Decision Matrix):**
A semi-quantitative tool for evaluating multiple alternatives against weighted criteria:
1. List solution alternatives as rows
2. List evaluation criteria as columns (derived from VOC and CTQs)
3. Assign weights to each criterion (total = 100%)
4. Rate each alternative against a baseline (datum) using: +1 (better), 0 (same), -1 (worse)
5. Calculate weighted scores to rank alternatives

**Impact-Effort Matrix:**
A 2×2 matrix plotting solutions by:
- Impact (High/Low): How much improvement does it deliver?
- Effort (High/Low): How much time, money, and resources does it require?

Quadrants:
- High Impact, Low Effort → "Quick Wins" (Do First)
- High Impact, High Effort → "Major Projects" (Plan Carefully)
- Low Impact, Low Effort → "Fill-Ins" (Do if Time Permits)
- Low Impact, High Effort → "Thankless Tasks" (Avoid)

**Poka-Yoke (Mistake-Proofing):**
Developed by Shigeo Shingo (Toyota), Poka-Yoke designs processes so that mistakes are impossible or immediately detected:
- **Prevention型**: Make the error physically impossible (e.g., USB plug design, SIM card orientation)
- **Control型**: Stop the process if an error occurs (e.g., safety interlock switches)
- **Warning型**: Alert the operator when a potential error is detected (e.g., seatbelt warning)

**Pilot Planning:**
Before full-scale implementation, conduct a pilot to:
- Validate the solution works in the real environment
- Identify unexpected issues on a small scale
- Build organizational confidence and support
- Refine the implementation plan
- Collect before/after data for statistical validation

A good pilot plan defines: scope, duration, success criteria, data collection methods, and escalation procedures.`,
    tools: ["Pugh Matrix", "Impact-Effort Matrix", "Poka-Yoke Analysis", "Pilot Plan Template", "Cost-Benefit Analysis"],
    videos: [
      { title: "Poka-Yoke | Mistake Proofing with Examples", youtubeId: "qALqGrzK140", duration: "8:55", channel: "AYT India Academy" },
      { title: "Pugh matrix : A Decision / Selection Matrix", youtubeId: "DdgSMNKmUwE", duration: "11:30", channel: "Performance Management in Manufacturing" },
    ],
    quizQuestions: [
      {
        id: "q-ss1",
        question: "In an Impact-Effort Matrix, which quadrant contains solutions that should be implemented first?",
        options: ["High Impact, High Effort", "High Impact, Low Effort", "Low Impact, Low Effort", "Low Impact, High Effort"],
        correctIndex: 1,
        explanation: "High Impact, Low Effort solutions are 'Quick Wins' — they deliver significant improvement with minimal resource investment. These should be prioritized first for maximum return. High Impact, High Effort solutions are planned as major projects.",
        difficulty: "green",
        topic: "Solution Selection"
      },
      {
        id: "q-ss2",
        question: "Which type of Poka-Yoke makes an error physically impossible to commit?",
        options: ["Warning Type", "Control Type", "Prevention Type", "Detection Type"],
        correctIndex: 2,
        explanation: "Prevention-type Poka-Yoke makes the error impossible to commit through physical design (e.g., asymmetric connectors that only fit one way). Control-type stops the process upon error detection. Warning-type provides an alert.",
        difficulty: "green",
        topic: "Solution Selection"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  GREEN BELT — CONTROL PHASE
  // ═══════════════════════════════════════════════════════
  {
    id: "gb-control-charts",
    title: "Statistical Process Control (SPC) & Control Charts",
    shortTitle: "SPC & Control Charts",
    description: "Implement Statistical Process Control using various control chart types to monitor process stability, detect special cause variation, and sustain improvements over time.",
    icon: "Activity",
    phase: "control",
    belt: "green",
    duration: "4 hours",
    keyTopics: ["Control Chart Selection", "X̄-R Charts", "p-Charts", "c-Charts", "Western Electric Rules", "Control Plans"],
    content: `Statistical Process Control (SPC) uses control charts to distinguish between common cause (inherent) variation and special cause (assignable) variation. This distinction is critical: attempting to fix common cause variation through tampering actually makes things worse (Deming's "funnel experiment").

**Control Chart Basics:**
Every control chart has:
- **Center Line (CL)**: The process average
- **Upper Control Limit (UCL)**: CL + 3σ (typically)
- **Lower Control Limit (LCL)**: CL - 3σ (typically)
- Data points plotted in time order

**Control Limits vs. Specification Limits:**
Control limits are calculated from the process data and represent the voice of the process. Specification limits come from customer requirements and represent the voice of the customer. Confusing these two is a fundamental error. A process can be in statistical control (stable) but still produce out-of-spec products, and vice versa.

**Control Chart Selection Guide:**

| Data Type | Subgroup Size | Chart Type |
|-----------|---------------|------------|
| Continuous | 1 (individual) | I-MR (Individual-Moving Range) |
| Continuous | 2-10 | X̄-R (Average-Range) |
| Continuous | 11-25 | X̄-S (Average-Standard Deviation) |
| Attribute (defective) | Variable | p-chart (proportion defective) |
| Attribute (defective) | Constant | np-chart (count defective) |
| Attribute (defects) | Constant area | c-chart (count of defects) |
| Attribute (defects) | Variable area | u-chart (defects per unit) |

**Western Electric Rules (for detecting non-random patterns):**
A process is considered out of control if ANY of these occur:
1. One point beyond 3σ (beyond UCL or LCL)
2. 2 out of 3 consecutive points beyond 2σ (same side)
3. 4 out of 5 consecutive points beyond 1σ (same side)
4. 8 consecutive points on the same side of the center line
5. 6 consecutive points trending up or down
6. 14 consecutive points alternating up and down
7. 15 consecutive points within 1σ (stratification)

**Control Plans:**
A Control Plan is a living document that summarizes:
- Process characteristics to be monitored
- Measurement methods and frequency
- Control methods (control charts, checklists, poka-yoke)
- Reaction plan when out-of-control signals occur
- Responsible personnel
- Reference documents (FMEA, process maps)`,
    tools: ["X̄-R Chart", "I-MR Chart", "p-Chart", "c-Chart", "Control Plan Template"],
    videos: [
      { title: "What is a Control Chart? | Statistical Process Control (SPC)", youtubeId: "G0AFZUWvIDE", duration: "10:15", channel: "Green Belt Academy" },
      { title: "Statistical Process Control (SPC) Explained | Control Charts", youtubeId: "aey2c0VsZNc", duration: "13:22", channel: "OSC & Management University" },
    ],
    quizQuestions: [
      {
        id: "q-cc1",
        question: "Which control chart is used to monitor the proportion of defective items when the subgroup size varies?",
        options: ["np-chart", "p-chart", "c-chart", "u-chart"],
        correctIndex: 1,
        explanation: "The p-chart monitors the proportion (fraction) of defective items and handles variable subgroup sizes. The np-chart is for constant subgroup sizes. The c-chart and u-chart are for defect counts, not defective proportions.",
        difficulty: "green",
        topic: "SPC"
      },
      {
        id: "q-cc2",
        question: "What is the fundamental difference between control limits and specification limits?",
        options: [
          "They are the same thing",
          "Control limits are set by the customer, spec limits by the process",
          "Control limits are calculated from process data; spec limits come from customer requirements",
          "Spec limits are wider than control limits"
        ],
        correctIndex: 2,
        explanation: "Control limits are derived from process data (typically ±3σ from the process mean) and represent the voice of the process. Specification limits come from customer or engineering requirements and represent the voice of the customer. They are fundamentally different concepts.",
        difficulty: "green",
        topic: "SPC"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  BLACK BELT — ADVANCED STATISTICS
  // ═══════════════════════════════════════════════════════
  {
    id: "bb-advanced-stats",
    title: "Advanced Statistical Methods",
    shortTitle: "Advanced Statistics",
    description: "Deep-dive into ANOVA, regression analysis (simple, multiple, logistic), non-parametric tests, and multivariate analysis techniques for complex data analysis.",
    icon: "Brain",
    phase: "advanced",
    belt: "black",
    duration: "6 hours",
    keyTopics: ["Multiple Regression", "Logistic Regression", "ANOVA (Two-Way+)", "Non-Parametric Tests", "Multivariate Analysis"],
    content: `Black Belts must master advanced statistical methods to analyze complex, multi-factor processes and build predictive models. This module extends the Green Belt foundation into sophisticated analytical territory.

**Multiple Regression Analysis:**
Multiple regression models the relationship between one dependent variable and two or more independent variables:
Y = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ + ε

Key concepts:
- **R² (Coefficient of Determination)**: Proportion of variance in Y explained by the model (0 to 1). Higher is better, but adding variables always increases R².
- **Adjusted R²**: Penalizes for adding non-contributing variables. More useful than R² for comparing models with different numbers of predictors.
- **Residual Analysis**: Residuals (actual - predicted) should be normally distributed, independent, and have constant variance (homoscedasticity). Patterns in residuals indicate model inadequacy.
- **Multicollinearity**: When independent variables are highly correlated with each other. Detected using VIF (Variance Inflation Factor). VIF > 10 indicates serious multicollinearity.
- **Stepwise Regression**: Automated variable selection (forward, backward, or both) based on statistical criteria (AIC, BIC, or p-values).

**Logistic Regression:**
Used when the dependent variable is binary (pass/fail, yes/no). Models the log-odds:
ln(p / (1-p)) = β₀ + β₁X₁ + β₂X₂ + ...

- Output: Odds ratios (exp(β)) — how much the odds change per unit increase in X
- Model Fit: Hosmer-Lemeshow test, ROC curve, AUC (Area Under Curve)
- Interpretation: An odds ratio of 2.5 means the event is 2.5 times more likely for each unit increase in that predictor

**Two-Way ANOVA:**
Extends One-Way ANOVA to test the effect of two factors simultaneously, plus their interaction:
- Main Effect of Factor A: Does Factor A affect the response?
- Main Effect of Factor B: Does Factor B affect the response?
- Interaction Effect (A×B): Does the effect of Factor A depend on the level of Factor B?

**Non-Parametric Tests (When assumptions are violated):**
| Parametric Test | Non-Parametric Alternative | When to Use |
|----------------|---------------------------|-------------|
| 2-Sample t-test | Mann-Whitney U | Non-normal data, 2 groups |
| Paired t-test | Wilcoxon Signed-Rank | Non-normal paired data |
| One-Way ANOVA | Kruskal-Wallis | Non-normal, 3+ groups |
| Two-Way ANOVA | Friedman Test | Non-normal, repeated measures |
| Pearson Correlation | Spearman Rank | Non-linear monotonic relationship |

**Principal Component Analysis (PCA):**
Reduces a large number of correlated variables into fewer uncorrelated components that explain the maximum variance. Used for:
- Data dimensionality reduction
- Identifying underlying factors in survey data
- Creating composite indices from multiple correlated measures`,
    tools: ["Multiple Regression", "Logistic Regression", "Two-Way ANOVA", "Kruskal-Wallis Test", "PCA", "Minitab/JMP/StatGraphics"],
    videos: [
      { title: "Nonlinear Regression Analysis: illustration with Example in Excel", youtubeId: "XgBpv5GpgSE", duration: "19:30", channel: "LEARN & APPLY : Lean and Six Sigma" },
      { title: "ANOVA: Crash Course Statistics", youtubeId: "oOuu8IBd-yo", duration: "22:15", channel: "CrashCourse" },
    ],
    quizQuestions: [
      {
        id: "q-as1",
        question: "Why is Adjusted R² preferred over R² when comparing regression models with different numbers of predictors?",
        options: [
          "Adjusted R² is always higher",
          "Adjusted R² penalizes for adding non-contributing variables",
          "R² cannot exceed 0.5",
          "Adjusted R² uses a different formula for simple regression"
        ],
        correctIndex: 1,
        explanation: "Adjusted R² adjusts the R² value downward when variables that don't meaningfully improve the model are added. This prevents the misleading impression that a model is better simply because it has more variables.",
        difficulty: "black",
        topic: "Advanced Statistics"
      },
      {
        id: "q-as2",
        question: "Which non-parametric test is the alternative to One-Way ANOVA?",
        options: ["Mann-Whitney U", "Wilcoxon Signed-Rank", "Kruskal-Wallis Test", "Friedman Test"],
        correctIndex: 2,
        explanation: "The Kruskal-Wallis test is the non-parametric alternative to One-Way ANOVA, used when comparing 3+ independent groups with non-normal distributions. Mann-Whitney U is for 2 groups (alternative to 2-sample t-test).",
        difficulty: "black",
        topic: "Advanced Statistics"
      },
      {
        id: "q-as3",
        question: "In logistic regression, what does an odds ratio of 3.0 for a predictor variable indicate?",
        options: [
          "The probability increases by 3%",
          "The odds of the event are 3 times higher per unit increase in that predictor",
          "The model accuracy is 3 times better",
          "The p-value is 0.03"
        ],
        correctIndex: 1,
        explanation: "An odds ratio (exp(β)) of 3.0 means that for each one-unit increase in the predictor variable, the odds of the event occurring are 3 times higher, holding all other variables constant.",
        difficulty: "black",
        topic: "Advanced Statistics"
      },
    ],
  },
  {
    id: "bb-advanced-doe",
    title: "Advanced DOE & Response Surface Methods",
    shortTitle: "Advanced DOE / RSM",
    description: "Master advanced experimental design techniques including fractional factorial resolution concepts, response surface methodology (RSM), central composite designs, and optimization.",
    icon: "Cuboid",
    phase: "advanced",
    belt: "black",
    duration: "5 hours",
    keyTopics: ["Resolution III-V Designs", "Response Surface Methods", "Central Composite", "Box-Behnken", "Optimization"],
    content: `Black Belts must design efficient experiments for complex processes with many factors. Advanced DOE techniques minimize experimental runs while maximizing information gained.

**Fractional Factorial Resolution:**
The resolution of a fractional factorial design determines which effects are confounded (aliased) with each other:
- **Resolution III**: Main effects are confounded with 2-way interactions. Only suitable for screening — assumes interactions are negligible.
- **Resolution IV**: Main effects are clear of 2-way interactions, but 2-way interactions are confounded with each other. Good for identifying main effects.
- **Resolution V**: Main effects and 2-way interactions are all clear. 2-way interactions are only confounded with 3-way interactions (usually negligible). The gold standard for most applications.

**Confounding (Aliasing) Structure:**
In a 2^(5-1) half-fraction, the generator I = ABCDE determines the confounding pattern. The defining relation is I = ABCDE, meaning:
- A = BCDE, B = ACDE, C = ABDE, etc. (main effects aliased with 4-way interactions — OK)
- AB = CDE, AC = BDE, etc. (2-way interactions aliased with 3-way interactions — usually OK)
This is a Resolution V design, which is excellent.

**Response Surface Methodology (RSM):**
RSM is used when the goal is to optimize a response variable by finding the ideal combination of factor levels. It models the relationship between several input variables and one or more response variables.

Types of RSM designs:
1. **Central Composite Design (CCD)**: The most popular RSM design. Consists of:
   - Factorial points (2^k or a fraction)
   - Axial (star) points at distance α from the center
   - Center points (for estimating pure error and curvature)
   - Three types: Circumscribed (CCC), Inscribed (CCI), Face-Centered (CCF)

2. **Box-Behnken Design (BBD)**: An alternative to CCD that avoids extreme factor levels:
   - Does NOT have corner points (safer for processes where extreme conditions are risky)
   - Requires fewer runs than CCD for 3-4 factors
   - Excellent for fitting second-order models

**Second-Order Model:**
Y = β₀ + Σβᵢxᵢ + Σβᵢᵢxᵢ² + ΣΣβᵢⱼxᵢxⱼ + ε

The quadratic terms (xᵢ²) allow the model to capture curvature — essential for finding maxima, minima, or saddle points in the response surface.

**Optimization Methods:**
- **Desirability Functions**: Transform multiple responses into a single desirability value (0 to 1) for multi-response optimization
- **Contour Plots**: 2D visualizations showing response values across two factors while holding others constant
- **Ridge Analysis**: Follows the path of steepest ascent/descent from the current operating point toward the optimum`,
    tools: ["Fractional Factorial Design", "Central Composite Design", "Box-Behnken Design", "Contour Plot", "Desirability Function", "Minitab/JMP"],
    videos: [
      { title: "Response Surface Methodology (RSM) with Design Expert", youtubeId: "QWWgL3no9a0", duration: "18:12", channel: "Teaching Junction" },
      { title: "Design of Experiment (DOE): Terms and Concepts (PART 2)", youtubeId: "pRdG01y-0rI", duration: "14:50", channel: "LEARN & APPLY : Lean and Six Sigma" },
    ],
    quizQuestions: [
      {
        id: "q-adoe1",
        question: "In a Resolution IV fractional factorial design, which effects are confounded?",
        options: [
          "Main effects with 2-way interactions",
          "2-way interactions with other 2-way interactions",
          "Main effects with 3-way interactions",
          "Both B and C are correct"
        ],
        correctIndex: 3,
        explanation: "In Resolution IV designs: main effects are confounded with 3-way interactions (essentially clear), and 2-way interactions are confounded with other 2-way interactions. So both B and C are correct statements.",
        difficulty: "black",
        topic: "Advanced DOE"
      },
      {
        id: "q-adoe2",
        question: "What advantage does a Box-Behnken Design have over a Central Composite Design?",
        options: [
          "It can model higher-order interactions",
          "It avoids extreme factor level combinations (corner points)",
          "It requires no center points",
          "It always has higher resolution"
        ],
        correctIndex: 1,
        explanation: "Box-Behnken Designs avoid the extreme corner points of the experimental region, making them safer for processes where operating at extreme factor level combinations could be risky, destructive, or costly.",
        difficulty: "black",
        topic: "Advanced DOE"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  BLACK BELT — LEAN TOOLS
  // ═══════════════════════════════════════════════════════
  {
    id: "bb-lean-tools",
    title: "Advanced Lean Tools & Value Stream Mapping",
    shortTitle: "Lean & VSM",
    description: "Master comprehensive Lean methodology including Value Stream Mapping (VSM), 5S, Kaizen, Kanban, Heijunka, Total Productive Maintenance (TPM), and Theory of Constraints (TOC).",
    icon: "Workflow",
    phase: "lean",
    belt: "black",
    duration: "5 hours",
    keyTopics: ["Value Stream Mapping", "5S Implementation", "Kaizen Events", "Kanban Systems", "TPM", "Theory of Constraints"],
    content: `Lean methodology focuses on eliminating waste (muda), unevenness (mura), and overburden (muri) to maximize customer value while minimizing resources. Black Belts must be proficient in a comprehensive toolkit of Lean techniques.

**The 8 Wastes (TIMWOODS):**
1. **Transportation**: Unnecessary movement of materials/products
2. **Inventory**: Excess raw materials, WIP, or finished goods
3. **Motion**: Unnecessary movement of people (reaching, walking, bending)
4. **Waiting**: Idle time waiting for materials, information, equipment
5. **Overproduction**: Producing more than needed, faster than needed, or before needed (the worst waste — it generates all other wastes)
6. **Overprocessing**: Performing work beyond customer requirements
7. **Defects**: Producing defective products/services requiring rework or scrap
8. **Skills (underutilized)**: Not leveraging employees' talents and creativity

**Value Stream Mapping (VSM):**
VSM is a comprehensive visualization tool that maps all steps (both value-adding and non-value-adding) in a process from raw material to customer delivery. It goes far beyond simple flowcharts.

Current State VSM captures:
- Process steps with cycle time (C/T), changeover time (C/O), and uptime
- Inventory buffers between steps (converted to days of supply)
- Information flow (how orders, schedules, and communication flow)
- Key metrics: Total Lead Time, Value-Added Time, Process Cycle Efficiency

Future State VSM designs the ideal process by:
- Implementing continuous flow where possible
- Establishing pull systems (Kanban) at supermarket locations
- Leveling production (Heijunka)
- Setting takt time for pacemaking processes

**5S Workplace Organization:**
1. **Sort (Seiri)**: Remove all unnecessary items from the workplace
2. **Set in Order (Seiton)**: Organize remaining items for easy access (a place for everything)
3. **Shine (Seiso)**: Clean the workplace and equipment; identify abnormalities
4. **Standardize (Seiketsu)**: Create standards and visual controls to maintain the first 3Ss
5. **Sustain (Shitsuke)**: Build discipline and habit through audits and continuous training

**Kaizen Events (Blitzes):**
Intensive 3-5 day focused improvement workshops targeting specific process areas. Structure:
- Day 1: Training and current state analysis
- Day 2: Root cause analysis and solution design
- Day 3-4: Implementation of improvements
- Day 5: Results validation, standardization, and presentation

**Theory of Constraints (TOC) — Five Focusing Steps:**
1. IDENTIFY the system's constraint (bottleneck)
2. EXPLOIT the constraint (maximize its utilization)
3. SUBORDINATE everything else to the constraint
4. ELEVATE the constraint (increase its capacity)
5. REPEAT — the constraint may have moved to a new location`,
    tools: ["Value Stream Map", "5S Audit Checklist", "Kanban Board", "Spaghetti Diagram", "TPM Metrics", "Bottleneck Analysis"],
    videos: [
      { title: "Value Stream Map - What is it? How do we use it?", youtubeId: "MVbZkRjNO4Q", duration: "20:45", channel: "Communication for Geeks" },
      { title: "Funny Introduction To The 8 Wastes Of Lean Manufacturing", youtubeId: "c2nBKRKKWXk", duration: "11:33", channel: "Lean Smarts" },
      { title: "Introduction to 5S Methodology Training - Lean Principles", youtubeId: "SODLdxMkVAM", duration: "9:28", channel: "Lean Smarts" },
    ],
    quizQuestions: [
      {
        id: "q-lean1",
        question: "According to the TIMWOODS framework, which waste is considered the 'worst' waste because it generates all other wastes?",
        options: ["Defects", "Inventory", "Overproduction", "Waiting"],
        correctIndex: 2,
        explanation: "Overproduction is considered the fundamental waste in Lean thinking because producing more than needed, faster than needed, or before needed creates excess inventory, which in turn causes waiting, transportation, motion, defects, and other wastes.",
        difficulty: "black",
        topic: "Lean Tools"
      },
      {
        id: "q-lean2",
        question: "In Value Stream Mapping, what is Process Cycle Efficiency (PCE)?",
        options: [
          "Total lead time divided by value-added time",
          "Value-added time divided by total lead time",
          "The number of value-adding steps divided by total steps",
          "Takt time divided by cycle time"
        ],
        correctIndex: 1,
        explanation: "PCE = Value-Added Time / Total Lead Time. A world-class process typically has PCE > 25%. Most manufacturing processes operate at 5-10% PCE, and administrative/service processes often have PCE < 5%, indicating enormous improvement opportunity.",
        difficulty: "black",
        topic: "Lean Tools"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  BLACK BELT — LEADERSHIP & CHANGE MANAGEMENT
  // ═══════════════════════════════════════════════════════
  {
    id: "bb-change-management",
    title: "Change Management & Leadership",
    shortTitle: "Change Management",
    description: "Develop leadership skills for driving organizational change, managing stakeholder dynamics, overcoming resistance, and ensuring sustainable Six Sigma deployment across the enterprise.",
    icon: "Users",
    phase: "leadership",
    belt: "black",
    duration: "3 hours",
    keyTopics: ["Kotter's 8-Step Model", "ADKAR Model", "Stakeholder Management", "Team Dynamics", "Financial Analysis"],
    content: `Black Belts are change agents. Technical skills alone are insufficient — the ability to lead teams, manage resistance, and drive organizational change is what separates effective Black Belts from mere statisticians. Studies show that 70% of change initiatives fail, primarily due to people and culture issues, not technical shortcomings.

**Kotter's 8-Step Change Model:**
1. **Create Urgency**: Build a compelling case for change using data (COPQ, competitive pressure, customer complaints)
2. **Form a Powerful Coalition**: Assemble a guiding team with enough power, expertise, credibility, and leadership to drive change
3. **Create a Vision for Change**: Develop a clear, compelling vision and supporting strategies
4. **Communicate the Vision**: Use every vehicle possible to communicate the new vision and strategies (10x communication needed; people need to hear it 7+ times)
5. **Remove Obstacles**: Eliminate barriers to change, including resistant individuals, outdated structures, and conflicting incentive systems
6. **Create Short-Term Wins**: Plan for and create visible performance improvements; recognize and reward contributors
7. **Build on the Change**: Use credibility from short-term wins to drive more changes; hire, promote, and develop people who can implement the vision
8. **Anchor Changes in Corporate Culture**: Embed the changes in organizational norms, values, and behaviors; ensure leadership succession supports the new direction

**ADKAR Model (Prosci):**
A goal-oriented change management model focusing on individual transitions:
- **Awareness** of the need for change
- **Desire** to participate and support the change
- **Knowledge** of how to change
- **Ability** to implement desired skills and behaviors
- **Reinforcement** to sustain the change

Each person must progress through all five stages. If someone is "stuck" at a particular stage, targeted interventions are applied.

**Financial Analysis for Black Belts:**
- **Net Present Value (NPV)**: Sum of discounted future cash flows minus initial investment. NPV > 0 = project adds value.
- **Internal Rate of Return (IRR)**: The discount rate that makes NPV = 0. Compare to cost of capital.
- **Payback Period**: Time required to recover the initial investment.
- **Cost of Poor Quality (COPQ)**: Typically 20-35% of revenue in non-Six Sigma organizations. A well-executed Black Belt project should target a minimum 5:1 ROI (savings 5x the project cost).

**Managing Resistance:**
Common sources of resistance: fear of the unknown, loss of control, concern about competence, past failed initiatives, organizational politics. Strategies: involve resistors early, listen empathetically, provide training, celebrate early adopters, address concerns with data.`,
    tools: ["Kotter's 8-Step Assessment", "ADKAR Diagnostic", "Stakeholder Power-Interest Grid", "NPV/ROI Calculator", "Force Field Analysis"],
    videos: [
      { title: "What is Change Management in Lean Six Sigma?", youtubeId: "gUZbxf3yEKo", duration: "15:18", channel: "Anexas" },
      { title: "Kotter's 8-Step Change Model Explained", youtubeId: "iaz0jPLTTC4", duration: "8:44", channel: "Simplilearn" },
    ],
    quizQuestions: [
      {
        id: "q-cm1",
        question: "According to research, approximately what percentage of organizational change initiatives fail?",
        options: ["30%", "50%", "70%", "90%"],
        correctIndex: 2,
        explanation: "Research consistently shows approximately 70% of change initiatives fail to achieve their objectives. The primary causes are people and cultural issues — not technical problems. This underscores the importance of change management skills for Black Belts.",
        difficulty: "black",
        topic: "Change Management"
      },
      {
        id: "q-cm2",
        question: "In the ADKAR model, which element represents the individual's personal motivation to support the change?",
        options: ["Awareness", "Desire", "Knowledge", "Ability"],
        correctIndex: 1,
        explanation: "Desire is the personal motivation to participate and support the change. Awareness is understanding why change is needed; Knowledge is knowing how to change; Ability is being able to implement the change; Reinforcement is sustaining it.",
        difficulty: "black",
        topic: "Change Management"
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  BLACK BELT — DFSS (DESIGN FOR SIX SIGMA)
  // ═══════════════════════════════════════════════════════
  {
    id: "bb-dfss",
    title: "Design for Six Sigma (DFSS) & DMADV",
    shortTitle: "DFSS / DMADV",
    description: "Learn the DMADV methodology for designing new products, services, and processes at Six Sigma quality levels from the ground up, including QFD, robust design, and tolerance analysis.",
    icon: "PenTool",
    phase: "advanced",
    belt: "black",
    duration: "4 hours",
    keyTopics: ["DMADV Framework", "Quality Function Deployment", "Robust Design (Taguchi)", "Tolerance Analysis", "Reliability Engineering"],
    content: `While DMAIC improves existing processes, Design for Six Sigma (DFSS) creates new products, services, or processes designed to perform at Six Sigma levels from inception. The DMADV methodology is the DFSS counterpart to DMAIC.

**DMADV Framework:**
- **Define**: Identify customer needs, project goals, and design requirements
- **Measure**: Measure customer needs and specifications; benchmark competitors
- **Analyze**: Analyze design options; develop conceptual designs; evaluate alternatives
- **Design**: Detailed design of the product, service, or process; prototype and test
- **Verify**: Verify the design meets customer requirements; pilot and launch

**Quality Function Deployment (QFD) / House of Quality:**
QFD is a structured method for translating VOC into technical design requirements through a matrix-based approach. The "House of Quality" matrix includes:
- **Customer Requirements (Whats)**: From VOC analysis
- **Technical Requirements (Hows)**: Engineering/technical specifications
- **Relationship Matrix**: How strongly each technical requirement fulfills each customer requirement
- **Correlation Matrix (Roof)**: How technical requirements interact (synergy or conflict)
- **Competitive Benchmarking**: How you compare to competitors on customer requirements
- **Priorities & Targets**: Final numerical targets for each technical requirement

**Robust Design (Taguchi Methods):**
Developed by Genichi Taguchi, the philosophy is to design products/processes that perform consistently despite environmental and manufacturing variations. Key concepts:
- **Signal-to-Noise Ratio (S/N)**: A metric that combines mean and variation. Higher S/N = more robust. Three types:
  - Nominal-the-Best: S/N = 10 log(ȳ²/s²)
  - Larger-the-Better: S/N = -10 log(Σ(1/yᵢ²)/n)
  - Smaller-the-Better: S/N = -10 log(Σyᵢ²/n)
- **Parameter Design**: Finding optimal factor settings that minimize sensitivity to noise
- **Tolerance Design**: Determining tolerances that balance manufacturing cost with performance

**Tolerance Analysis & Stack-Up:**
- **Worst-Case Analysis**: Sum of all tolerances at their maximum limits (conservative, expensive)
- **Root-Sum-Square (RSS)**: Statistical tolerance analysis: T_assembly = √(T₁² + T₂² + ... + Tₙ²) (realistic, assumes normal distribution)
- **Monte Carlo Simulation**: Simulate thousands of random combinations to predict assembly variation (most accurate)

**Reliability Engineering Basics:**
- **MTBF (Mean Time Between Failures)**: Average time between system failures
- **MTTR (Mean Time To Repair)**: Average time to restore the system
- **Availability = MTBF / (MTBF + MTTR)**
- **Weibull Distribution**: Most versatile life distribution; shape parameter β indicates failure pattern (β < 1: infant mortality; β = 1: random; β > 1: wear-out)`,
    tools: ["House of Quality", "Taguchi Design", "Tolerance Stack-Up", "Monte Carlo Simulation", "Weibull Analysis", "FMEA (Design)"],
    videos: [
      { title: "Statistical Tolerancing using Monte Carlo Simulation", youtubeId: "f4eEgNPGG0I", duration: "12:30", channel: "Institute of Quality and Reliability" },
      { title: "Quality Function Deployment & the House of Quality", youtubeId: "iRMsd-X_e-0", duration: "16:45", channel: "Mister Simplify" },
    ],
    quizQuestions: [
      {
        id: "q-dfss1",
        question: "Which methodology is used in Design for Six Sigma for creating NEW products or processes?",
        options: ["DMAIC", "DMADV", "PDCA", "A3"],
        correctIndex: 1,
        explanation: "DMADV (Define, Measure, Analyze, Design, Verify) is the DFSS methodology for new product/process design. DMAIC is for improving existing processes. PDCA (Plan-Do-Check-Act) is Deming's cycle for continuous improvement.",
        difficulty: "black",
        topic: "DFSS"
      },
      {
        id: "q-dfss2",
        question: "In Taguchi's Robust Design, what does a higher Signal-to-Noise (S/N) ratio indicate?",
        options: [
          "The process is louder",
          "The process is less robust",
          "The process performs more consistently despite noise factors",
          "The process has higher variance"
        ],
        correctIndex: 2,
        explanation: "A higher S/N ratio indicates that the process output is less sensitive to noise (uncontrollable) factors, meaning it performs more consistently across varying conditions. This is the essence of robust design.",
        difficulty: "black",
        topic: "DFSS"
      },
    ],
  },
];

// ── DMAIC Phase Info ──
export const dmaicPhases = [
  {
    id: "define",
    name: "Define",
    letter: "D",
    description: "Define the problem, project scope, and customer requirements. Establish the project charter and identify stakeholders.",
    objectives: ["Clarify the business problem", "Identify VOC and CTQs", "Create project charter", "Build high-level process map (SIPOC)"],
    keyDeliverables: ["Project Charter", "SIPOC Diagram", "VOC/CTQ Analysis", "Stakeholder Map"],
    color: phaseColors.define,
  },
  {
    id: "measure",
    name: "Measure",
    letter: "M",
    description: "Measure the current process performance, validate the measurement system, and establish a baseline.",
    objectives: ["Validate measurement system (MSA)", "Collect baseline data", "Calculate process capability", "Define detailed process metrics"],
    keyDeliverables: ["MSA Results", "Data Collection Plan", "Baseline Metrics", "Process Capability Study"],
    color: phaseColors.measure,
  },
  {
    id: "analyze",
    name: "Analyze",
    letter: "A",
    description: "Analyze data to identify root causes of defects and verify relationships between inputs and outputs.",
    objectives: ["Identify potential root causes", "Verify root causes with data", "Perform hypothesis testing", "Prioritize vital few factors"],
    keyDeliverables: ["Root Cause Analysis", "Statistical Test Results", "Validated X-Y Relationships", "Prioritized Cause List"],
    color: phaseColors.analyze,
  },
  {
    id: "improve",
    name: "Improve",
    letter: "I",
    description: "Develop and implement solutions to address root causes, optimize the process, and validate improvements.",
    objectives: ["Generate potential solutions", "Evaluate and select solutions", "Design experiments (DOE)", "Pilot and validate improvements"],
    keyDeliverables: ["Solution Evaluation Matrix", "DOE Results", "Pilot Results", "Implementation Plan"],
    color: phaseColors.improve,
  },
  {
    id: "control",
    name: "Control",
    letter: "C",
    description: "Sustain improvements through control plans, monitoring systems, and standardization.",
    objectives: ["Implement control charts", "Develop control plan", "Standardize new procedures", "Hand off to process owner"],
    keyDeliverables: ["Control Charts", "Control Plan", "Updated SOPs", "Lessons Learned Document"],
    color: phaseColors.control,
  },
];

// ── Learning Path Milestones ──
export const learningPath = [
  {
    id: "milestone-1",
    title: "Six Sigma Foundations",
    description: "Understand the history, principles, and DMAIC framework",
    belt: "green" as const,
    moduleIds: ["gb-define-overview"],
    estimatedHours: 2,
  },
  {
    id: "milestone-2",
    title: "Customer-Driven Define",
    description: "Capture VOC, define CTQs, and create your project charter",
    belt: "green" as const,
    moduleIds: ["gb-voice-of-customer", "gb-project-charter", "gb-sipoc"],
    estimatedHours: 7,
  },
  {
    id: "milestone-3",
    title: "Data-Driven Measurement",
    description: "Validate measurement systems, understand statistics, assess capability",
    belt: "green" as const,
    moduleIds: ["gb-measure-basics", "gb-basic-stats", "gb-process-capability"],
    estimatedHours: 10,
  },
  {
    id: "milestone-4",
    title: "Root Cause Analysis",
    description: "Hypothesis testing, root cause tools, and FMEA",
    belt: "green" as const,
    moduleIds: ["gb-hypothesis-testing", "gb-root-cause"],
    estimatedHours: 7,
  },
  {
    id: "milestone-5",
    title: "Solution Design & Pilot",
    description: "DOE fundamentals, solution selection, and pilot implementation",
    belt: "green" as const,
    moduleIds: ["gb-doe-basics", "gb-improve-solutions"],
    estimatedHours: 6,
  },
  {
    id: "milestone-6",
    title: "SPC & Sustainment",
    description: "Control charts, SPC, and control plans for sustainability",
    belt: "green" as const,
    moduleIds: ["gb-control-charts"],
    estimatedHours: 4,
  },
  {
    id: "milestone-7",
    title: "Green Belt Certification Ready",
    description: "Complete Green Belt exam preparation and practice assessments",
    belt: "green" as const,
    moduleIds: [],
    estimatedHours: 4,
  },
  {
    id: "milestone-8",
    title: "Advanced Statistical Mastery",
    description: "Multiple regression, ANOVA, non-parametric methods, and multivariate analysis",
    belt: "black" as const,
    moduleIds: ["bb-advanced-stats"],
    estimatedHours: 6,
  },
  {
    id: "milestone-9",
    title: "Advanced DOE & Optimization",
    description: "Response surface methods, central composite, and process optimization",
    belt: "black" as const,
    moduleIds: ["bb-advanced-doe"],
    estimatedHours: 5,
  },
  {
    id: "milestone-10",
    title: "Lean Enterprise Mastery",
    description: "VSM, 5S, Kaizen, Kanban, TPM, and Theory of Constraints",
    belt: "black" as const,
    moduleIds: ["bb-lean-tools"],
    estimatedHours: 5,
  },
  {
    id: "milestone-11",
    title: "Change Leadership",
    description: "Change management, stakeholder dynamics, and financial analysis",
    belt: "black" as const,
    moduleIds: ["bb-change-management"],
    estimatedHours: 3,
  },
  {
    id: "milestone-12",
    title: "DFSS & Design Excellence",
    description: "DMADV, QFD, Robust Design, and reliability engineering",
    belt: "black" as const,
    moduleIds: ["bb-dfss"],
    estimatedHours: 4,
  },
  {
    id: "milestone-13",
    title: "Black Belt Certification Ready",
    description: "Complete Black Belt exam preparation, case study, and practice assessments",
    belt: "black" as const,
    moduleIds: [],
    estimatedHours: 8,
  },
];

// ── Sigma Level Data for Charts ──
export const sigmaLevelData = [
  { sigma: 1, dpmo: 691462, yield: 30.85, cplabel: "1σ" },
  { sigma: 2, dpmo: 308538, yield: 69.15, cplabel: "2σ" },
  { sigma: 3, dpmo: 66807, yield: 93.32, cplabel: "3σ" },
  { sigma: 4, dpmo: 6210, yield: 99.38, cplabel: "4σ" },
  { sigma: 5, dpmo: 233, yield: 99.977, cplabel: "5σ" },
  { sigma: 6, dpmo: 3.4, yield: 99.99966, cplabel: "6σ" },
];