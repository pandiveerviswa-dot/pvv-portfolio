import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  PieChart,
  BarChart2,
  Calendar,
  Search,
  Smartphone,
  Monitor,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Filter,
  ExternalLink,
  Github,
  Receipt,
  HelpCircle,
  Scale,
  Cpu,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const ExplainMyBankingCaseStudy = ({ project, onClose }) => {
  const liveUrl = "https://explain-my-banking.vercel.app/";
  const githubUrl = "https://github.com/pandiveerviswa-dot/explain-my-banking";

  return (
    <div className="space-y-12 text-white animate-fadeIn font-sans">
      {/* ========================================================= */}
      {/* 01 — PROJECT OVERVIEW & METADATA                          */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 text-lime font-mono text-[11px] font-bold uppercase tracking-wider">
            <span>INDEPENDENT FINTECH UX CONCEPT &amp; WORKING PROTOTYPE</span>
          </div>
          <span className="font-mono text-xs text-white/50">
            UI/UX DESIGN • FINTECH UX • TRANSACTION EXPLAINABILITY • REACT 19
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="editorial-headline text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            EXPLAIN MY BANKING
          </h1>
          <p className="font-mono text-sm sm:text-base text-lime tracking-wider uppercase font-semibold">
            FINANCIAL EXPLAINABILITY &amp; EVIDENCE ENGINE
          </p>
        </div>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl">
          An independent banking UX concept and working prototype engineered to explain month-over-month spending changes through structured financial insights and verifiable transaction evidence.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-lime text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg group"
          >
            <span>LAUNCH LIVE DEMO</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white hover:text-lime border border-white/20 hover:border-lime/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            <span>VIEW GITHUB REPOSITORY</span>
          </a>
        </div>

        {/* High-Fidelity Preview */}
        <div className="border border-white/15 bg-black/80 overflow-hidden relative group rounded-lg shadow-2xl">
          <img
            src="/images/projects/explain-my-banking-preview.png"
            alt="Explain My Banking Dashboard Application Screenshot"
            className="w-full h-auto object-contain max-h-[580px] sm:max-h-[640px] mx-auto block"
          />
          <div className="p-3 bg-[#0a0c13] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/60">
            <span>FINANCIAL EXPLAINABILITY COCKPIT // REAL APPLICATION DASHBOARD</span>
            <span className="text-lime font-bold">WORKING PROTOTYPE</span>
          </div>
        </div>

        {/* Strict Disclaimers & Integrity Banner */}
        <div className="p-4 bg-lime/[0.04] border border-lime/30 text-xs font-mono text-white/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-lime shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-lime font-bold">PROJECT ATTRIBUTION &amp; DATA NOTICE: </span>
            <span>
              This is an independent personal product design concept and working prototype. It is not affiliated with, endorsed by, or an official product of the State Bank of India (SBI) or any banking institution. All figures and account balances use fictional demonstration data, and all variance insights are computed using deterministic client-side logic.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 — THE UX PROBLEM & PRIMARY QUESTION                    */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>02 // THE UX PROBLEM &amp; PRIMARY QUESTION</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white leading-tight">
            TRADITIONAL BANKING FEEDS SHOW WHAT HAPPENED.<br />
            <span className="text-lime">THEY DON'T EXPLAIN WHY.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-3xl font-sans leading-relaxed">
            When banking customers notice their account balance dropped faster than usual, their immediate question is simple and urgent. Yet traditional mobile banking apps offer only chronological statement tables, forcing users to conduct manual mental arithmetic across 60+ transaction lines.
          </p>
        </div>

        {/* Primary Customer Question Focal Banner */}
        <div className="p-6 bg-[#0f131d] border border-lime/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-2xl pointer-events-none" />
          <span className="font-mono text-xs text-lime uppercase font-bold tracking-widest block mb-2">
            THE PRIMARY CUSTOMER QUESTION
          </span>
          <div className="text-xl sm:text-2xl font-extrabold uppercase text-white">
            "Why did my spending increase this month?"
          </div>
          <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-2xl">
            The customer does not want raw database exports. They need a clear, respectful explanation grounded in concrete evidence that helps them take control of their budget.
          </p>
        </div>

        {/* User Struggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-[#12141c] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-white/50 uppercase block font-semibold">CORE INTERACTION BOTTLENECKS</span>
            <div className="space-y-2 font-mono text-xs text-white/85">
              {[
                'CHRONOLOGICAL STATEMENT DUMPS WITH NO MONTH-OVER-MONTH VARIANCE',
                'MANUAL CALCULATION REQUIRED TO PINPOINT WHICH CATEGORIES EXPANDED',
                'UNCERTAINTY ABOUT ONE-OFF PURCHASES VS LIFESTYLE CREEP',
                'ABSTRACT FINANCIAL CHARTS DISCONNECTED FROM LINE-ITEM TRANSACTIONS',
                'PATRONIZING BUDGET ADVICE INSTEAD OF OBJECTIVE EXPLANATIONS'
              ].map((item, i) => (
                <div key={item} className="p-2.5 bg-[#181a24] border border-white/10 flex items-center gap-2">
                  <span className="text-rose-400 font-bold">0{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-lime/[0.08] border border-lime/30 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-lime uppercase font-bold block">CORE UX PRINCIPLE</span>
              <h3 className="text-base sm:text-lg font-bold uppercase text-white mt-1">
                EXPLAIN → SHOW EVIDENCE → LET THE CUSTOMER DECIDE
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed mt-2">
                A respectful FinTech interface answers the question upfront with narrative clarity, surfaces the mathematical receipt evidence immediately below, and respects user autonomy without unsolicited financial preaching.
              </p>
            </div>
            <div className="p-3 bg-[#0a0b10] border border-lime/40 font-mono text-xs text-lime space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Explain: Clear driver narrative in plain language</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Show Evidence: Itemized receipts backing every rupee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Let Decide: Empower user actions without paternalism</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 — VERIFIED SPENDING COMPARISON ENGINE                  */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>03 // VERIFIED DEMO SPENDING COMPARISON</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white">
            AUGUST 2026 VS SEPTEMBER 2026 ANALYSIS
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-3xl leading-relaxed">
            The working prototype models a realistic month-over-month variance dataset. Comparing August 2026 to September 2026 demonstrates exactly how raw spend differences are reconciled into driver categories.
          </p>
        </div>

        {/* Macro Month Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-[#12141c] border border-white/15 space-y-1">
            <span className="font-mono text-xs text-white/50 uppercase block font-semibold">BASELINE MONTH (AUG 2026)</span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">₹28,250</div>
            <span className="font-mono text-[11px] text-white/60">Total Baseline Outflow</span>
          </div>

          <div className="p-5 bg-[#12141c] border border-white/15 space-y-1">
            <span className="font-mono text-xs text-white/50 uppercase block font-semibold">CURRENT MONTH (SEP 2026)</span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">₹36,650</div>
            <span className="font-mono text-[11px] text-white/60">Total Current Outflow</span>
          </div>

          <div className="p-5 bg-rose-500/10 border border-rose-500/30 space-y-1">
            <span className="font-mono text-xs text-rose-400 uppercase font-bold block">NET SPENDING VARIANCE</span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-rose-400">+₹8,400</div>
            <span className="font-mono text-[11px] text-rose-300">▲ +29.7% Increase Month-over-Month</span>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="border border-white/15 bg-black/40 overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-white/80">
            <span className="font-bold text-lime uppercase">WHERE DID THE +₹8,400 GO? // CATEGORY RECONCILIATION</span>
            <span className="text-white/50">100% RECONCILED ATTRIBUTION</span>
          </div>

          <div className="divide-y divide-white/10 font-mono text-xs">
            {[
              {
                category: 'Shopping',
                increase: '+₹3,300',
                share: '39.3% of increase',
                context: 'Festive apparel purchases and electronic accessories',
                status: 'Primary Driver'
              },
              {
                category: 'Food & Dining',
                increase: '+₹2,500',
                share: '29.8% of increase',
                context: 'Weekend family dining and weekday delivery orders',
                status: 'Secondary Driver'
              },
              {
                category: 'Transport',
                increase: '+₹1,300',
                share: '15.5% of increase',
                context: 'Commute cab rides and inter-city toll charges',
                status: 'Supporting Shift'
              },
              {
                category: 'Other',
                increase: '+₹1,300',
                share: '15.5% of increase',
                context: 'Quarterly subscription renewals and utility dues',
                status: 'Recurring Delta'
              }
            ].map((row) => (
              <div key={row.category} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{row.category}</span>
                    <span className="px-2 py-0.5 bg-white/10 text-[10px] text-white/60">{row.status}</span>
                  </div>
                  <p className="font-sans text-xs text-white/70">{row.context}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="font-bold text-rose-400 text-base">{row.increase}</div>
                  <div className="text-[11px] text-white/40">{row.share}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#0c1017] border-t border-white/10 font-mono text-xs text-lime flex items-center justify-between">
            <span>SUM OF DRIVER CATEGORIES:</span>
            <span className="font-bold">₹3,300 + ₹2,500 + ₹1,300 + ₹1,300 = ₹8,400</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 — CORE UX PRINCIPLE IN ACTION                          */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>04 // THE THREE-TIER EXPLAINABILITY ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: EXPLAIN */}
          <div className="p-6 bg-[#12141c] border border-white/15 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-display text-3xl font-black text-lime">01</span>
              <h3 className="font-mono text-sm font-bold uppercase text-white mt-1">EXPLAIN</h3>
              <p className="text-xs text-white/85 font-sans leading-relaxed mt-2">
                Presents a human-readable synthesis answering why spending grew. Avoids dense percentages; focuses on category drivers and situational context.
              </p>
            </div>
            <div className="p-3 bg-[#181a24] border border-white/10 font-mono text-[11px] text-lime/90 mt-4">
              "Your spending rose ₹8,400 this month, driven primarily by Shopping (+₹3,300) and Food (+₹2,500)."
            </div>
          </div>

          {/* Step 2: SHOW EVIDENCE */}
          <div className="p-6 bg-[#12141c] border border-white/15 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-display text-3xl font-black text-lime">02</span>
              <h3 className="font-mono text-sm font-bold uppercase text-white mt-1">SHOW EVIDENCE</h3>
              <p className="text-xs text-white/85 font-sans leading-relaxed mt-2">
                Every statement insight connects directly to verifiable transaction line items. Users can inspect merchant details, dates, and amounts with zero opacity.
              </p>
            </div>
            <div className="p-3 bg-[#181a24] border border-white/10 font-mono text-[11px] text-white/95 mt-4 space-y-1">
              <div>• Urban Trend Store: ₹2,800</div>
              <div>• The Grand Bistro: ₹1,450</div>
              <div>• RideWave Mobility: ₹650</div>
            </div>
          </div>

          {/* Step 3: LET DECIDE */}
          <div className="p-6 bg-[#12141c] border border-white/15 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-display text-3xl font-black text-lime">03</span>
              <h3 className="font-mono text-sm font-bold uppercase text-white mt-1">LET CUSTOMER DECIDE</h3>
              <p className="text-xs text-white/85 font-sans leading-relaxed mt-2">
                Instead of moralizing about budgeting, the interface offers empowering user controls: mark as expected, set a guardrail, or flag for review.
              </p>
            </div>
            <div className="p-3 bg-[#181a24] border border-white/10 font-mono text-[11px] text-emerald-400 mt-4 space-y-1">
              <div>[✓] Mark as one-off festive event</div>
              <div>[+] Set soft Shopping guardrail</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 — FIGMA DESIGN & FRONT-END IMPLEMENTATION COMPARISON    */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>05 // DESIGN SPECIFICATIONS &amp; IMPLEMENTATION COMPARISON</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white">
            FROM FIGMA BLUEPRINT TO REACT 19 IMPLEMENTATION
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-3xl font-sans leading-relaxed">
            The transition from conceptual design tokens to modern front-end code prioritized accessibility, contrast ratios, and layout stability across desktop and mobile screens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Design Specs (Figma) */}
          <div className="p-5 bg-[#12141c] border border-white/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-lime uppercase">FIGMA DESIGN BLUEPRINT</span>
              <span className="font-mono text-[10px] text-white/50">DESIGN SYSTEM TOKENS</span>
            </div>

            <div className="space-y-3 font-sans text-xs text-white/85">
              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">TYPOGRAPHY HIERARCHY</span>
                <p>
                  <strong className="text-white">Display &amp; Primary UI:</strong> Inter (400, 500, 600) chosen for tabular numeral alignment and readability across financial figures.
                </p>
              </div>

              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">COLOR ARCHITECTURE</span>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-[#181a24] border border-white/10">
                    <span className="text-white font-semibold">Surface Page</span>: <span className="text-white/70">#F8FAFC / #0C0D12</span>
                  </div>
                  <div className="p-2 bg-[#181a24] border border-white/10">
                    <span className="text-teal-400 font-semibold">Accent Teal</span>: <span className="text-white/70">#0D9488</span>
                  </div>
                  <div className="p-2 bg-[#181a24] border border-white/10">
                    <span className="text-lime font-semibold">Accent Lime</span>: <span className="text-white/70">#CCFF00</span>
                  </div>
                  <div className="p-2 bg-[#181a24] border border-white/10">
                    <span className="text-rose-400 font-semibold">Variance Delta</span>: <span className="text-white/70">#E11D48</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">INTERACTION DESIGN DECISIONS</span>
                <p>
                  Zero modal jumps. The entire flow expands in-place via smooth height-contained drawers, keeping spatial continuity intact as users inspect supporting evidence.
                </p>
              </div>
            </div>
          </div>

          {/* Implementation Architecture */}
          <div className="p-5 bg-[#12141c] border border-white/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-lime uppercase">FRONT-END IMPLEMENTATION</span>
              <span className="font-mono text-[10px] text-white/50">PRODUCTION STACK</span>
            </div>

            <div className="space-y-3 font-sans text-xs text-white/85">
              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">ENGINEERING STACK</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['React 19', 'Vite 5', 'Tailwind CSS', 'Lucide React', 'Bunny Fonts (Inter)'].map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 bg-lime/10 border border-lime/30 text-lime font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">COMPONENT ARCHITECTURE</span>
                <div className="p-3 bg-[#181a24] border border-white/10 font-mono text-[11px] text-white/85 space-y-1">
                  <div>ExplainMyBankingApp</div>
                  <div>├── OverviewBanner (August vs September)</div>
                  <div>├── VarianceSummaryCard (Net Delta +₹8,400)</div>
                  <div>├── CategoryBreakdown (Shopping, Food, Transport, Other)</div>
                  <div>├── EvidenceTransactionDrawer (Itemized Receipts)</div>
                  <div>└── DecisionControlBar (Customer Action Triggers)</div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">ACCESSIBILITY &amp; PERFORMANCE</span>
                <p>
                  Strict semantic headings, `aria-expanded` attributes on evidence drawers, high-contrast text ratios exceeding WCAG AA, and instant client-side rendering with zero network latency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06 — IMPLEMENTATION HONESTY & ARCHITECTURAL REALITY       */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>06 // IMPLEMENTATION HONESTY &amp; ARCHITECTURAL REALITY</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white">
            TRANSPARENT DETERMINISTIC LOGIC VS OPAQUE EXTERNAL AI
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-3xl font-sans leading-relaxed">
            In FinTech engineering, accuracy and predictability are paramount. Below is an honest breakdown of the exact logic running in the live application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-lime/[0.08] border border-lime/30 space-y-3">
            <div className="flex items-center gap-2 text-lime font-mono text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>WHAT IS ACTUALLY IMPLEMENTED (DETERMINISTIC)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-white/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">•</span>
                <span><strong>Mathematical Rule Engine:</strong> Client-side algorithms calculate exact differences between August and September transaction sets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">•</span>
                <span><strong>Structured Category Attribution:</strong> Automatically categorizes variance into Shopping, Food &amp; Dining, Transport, and Other.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">•</span>
                <span><strong>Deterministic Templating:</strong> Natural-language explanations are generated using structured templates guaranteed to match real numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">•</span>
                <span><strong>Zero Hallucination:</strong> Because analysis is deterministic, there is zero risk of fictitious numbers or ungrounded claims.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-[#12141c] border border-white/15 space-y-3">
            <div className="flex items-center gap-2 text-white/70 font-mono text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>WHAT IS NOT PRESENT (NO BLACK-BOX LLM)</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-white/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Remote Generative LLM API:</strong> Does not pipe private banking records to external cloud LLM APIs (OpenAI/Anthropic).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Non-Deterministic Text Generation:</strong> No random temperature seeds or speculative financial advice.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Real Bank API Integrations:</strong> Does not connect to live core-banking databases or live user credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Data Privacy Preserved:</strong> All state processing occurs strictly within the user's browser memory.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07 — LIMITATIONS & FUTURE IMPROVEMENTS                    */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>07 // LIMITATIONS &amp; FUTURE ROADMAP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-[#12141c] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase block">
              CURRENT PROTOTYPE LIMITATIONS
            </span>
            <ul className="space-y-2 font-sans text-xs text-white/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">01.</span>
                <span><strong>Fixed Dataset Scope:</strong> Currently analyzes a curated mock two-month transaction scenario (August vs September 2026).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">02.</span>
                <span><strong>Static Merchant Taxonomy:</strong> Relies on predefined transaction category mapping rather than dynamic NLP classification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">03.</span>
                <span><strong>Single Account View:</strong> Does not currently support joint accounts or multi-bank aggregated portfolios.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-[#12141c] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-lime font-bold uppercase block">
              POSSIBLE FUTURE IMPROVEMENTS
            </span>
            <ul className="space-y-2 font-sans text-xs text-white/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">01.</span>
                <span><strong>Account Aggregator (AA) Integration:</strong> Connecting with RBI-regulated Account Aggregators to import real user statements securely with explicit consent.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">02.</span>
                <span><strong>On-Device Local NLP Categorization:</strong> Using lightweight on-device WebAssembly models to parse obscure UPI merchant strings locally.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime font-bold">03.</span>
                <span><strong>Multi-Month Trend Trajectories:</strong> Expanding beyond pairwise month comparisons to highlight rolling 3-month and 6-month structural trends.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 — EXTERNAL ACTIONS & SUMMARY                           */}
      {/* ========================================================= */}
      <section className="pt-6 border-t border-white/10 space-y-6">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0d121c] to-[#121926] border border-lime/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs text-lime uppercase font-bold tracking-widest block">
              EXPLORE THE LIVE APPLICATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
              EXPERIENCE THE WORKING PROTOTYPE
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Interact directly with the Explain My Banking live build or review the source code on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-lime text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg group"
            >
              <span>LAUNCH LIVE DEMO</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white hover:text-lime border border-white/20 hover:border-lime/40 font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Github className="w-4 h-4" />
              <span>VIEW GITHUB REPOSITORY</span>
            </a>
          </div>
        </div>

        {/* Core Competency Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            'EXPLAINABILITY UX',
            'EVIDENCE-BASED CLARITY',
            'DETERMINISTIC FINTECH LOGIC',
            'CUSTOMER EMPOWERMENT',
            'RESPONSIVE ACCESSIBLE DESIGN'
          ].map((item) => (
            <div key={item} className="p-3 bg-white/[0.04] border border-white/15 text-center font-mono text-[11px] font-bold text-lime">
              {item}
            </div>
          ))}
        </div>

        {/* Back to Work Archive action if onClose provided */}
        {onClose && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-lime text-white/80 hover:text-lime font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← RETURN TO WORKS ARCHIVE</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplainMyBankingCaseStudy;
