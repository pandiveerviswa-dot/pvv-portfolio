import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Check,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Bot,
  Terminal,
  Cpu,
  Layers,
  Smartphone,
  Server,
  Lock,
  FileText,
  HelpCircle,
  Clock,
  CreditCard,
  RefreshCw,
  Scale
} from 'lucide-react';

export const OpsPilotCaseStudy = ({ project, onClose }) => {
  const liveUrl = "https://opspilot-ecru.vercel.app/";
  const backendUrl = "https://opspilot-api-3ijk.onrender.com/";
  const githubUrl = "https://github.com/pandiveerviswa-dot/opspilot";

  return (
    <div className="space-y-16 text-white animate-fadeIn font-sans">
      {/* ========================================================= */}
      {/* 01 — HERO SECTION                                         */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI PRODUCT DESIGN · FINTECH · FULL-STACK PROTOTYPE</span>
          </div>
          <span className="font-mono text-xs text-white/50">
            REACT · TYPESCRIPT · NODE.JS · xAI GROK API · VERCEL · RENDER
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="editorial-headline text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            OPSPILOT
          </h1>
          <p className="font-mono text-sm sm:text-lg text-emerald-400 tracking-wider uppercase font-semibold">
            AI-POWERED BANKING PROBLEM-SOLVING ASSISTANT
          </p>
        </div>

        {/* Hero Statement Quote */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/30 via-[#0c0d12] to-[#0c0d12] border-l-4 border-emerald-500 border-y border-r border-white/10">
          <p className="text-base sm:text-xl text-white font-medium italic leading-relaxed">
            &ldquo;Don&rsquo;t just show users their transactions. Help them understand what happened and what to do next.&rdquo;
          </p>
        </div>

        {/* Role & Technology Metadata Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 font-bold block">
              MY CONTRIBUTION &amp; ROLE
            </span>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
              Product concept development, UX/UI design, frontend implementation, backend integration, AI integration, and safety-oriented interaction design.
            </p>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 font-bold block">
              TECHNOLOGY STACK
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'xAI Grok API', 'Vercel', 'Render', 'GitHub'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 bg-white/[0.05] border border-white/15 text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(16,185,129,0.3)] group"
          >
            <span>EXPLORE THE LIVE PROTOTYPE</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white hover:text-emerald-400 border border-white/20 hover:border-emerald-500/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            <span>VIEW GITHUB REPOSITORY</span>
          </a>
        </div>

        {/* Understated Disclosure Notice */}
        <div className="p-3.5 bg-white/[0.03] border border-white/15 flex items-center gap-2.5 font-mono text-xs text-white/70">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Independent portfolio project · Synthetic banking data · Not a real banking service.</span>
        </div>

        {/* Authentic Main Interface Screenshot */}
        <div className="border border-white/15 bg-black/60 overflow-hidden relative group mt-4">
          <img
            src="/images/projects/opspilot/01_opspilot_main.png"
            alt="OpsPilot Live Dashboard Interface showing synthetic accounts and attention items"
            className="w-full h-auto object-cover max-h-[520px]"
            loading="eager"
          />
          <div className="p-3 bg-[#0a0c13] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/60">
            <span>GENUINE LIVE INTERFACE // HOME DASHBOARD &amp; SIMULATED ACCOUNTS</span>
            <span className="text-emerald-400 font-bold">DEPLOYED APPLICATION SCREENSHOT</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 — PROJECT OVERVIEW                                     */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            02 // PROJECT OVERVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            From Banking Data to Actionable Understanding
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-4xl">
          <p>
            OpsPilot is an AI-assisted banking support prototype designed to help users investigate transaction problems, understand relevant banking records, and identify appropriate next steps.
          </p>
          <p>
            Rather than making users interpret transaction entries alone, OpsPilot brings together relevant transaction evidence, simulated case information, contextual explanations, and suggested actions.
          </p>
        </div>

        <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
          <span className="font-mono text-xs text-white/50 uppercase tracking-wider font-bold block">
            PROTOTYPE SCOPE &amp; BOUNDARIES
          </span>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-mono">
            A deployed portfolio prototype using synthetic banking records and simulated case information. It is not connected to a real bank or production financial network.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 — THE PROBLEM                                          */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            03 // THE PROBLEM
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Banking Data Doesn&rsquo;t Always Explain the Problem
          </h2>
        </div>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl">
          A banking app can display a transaction amount, date, and status without answering the question that matters most to the customer. When confusion strikes, flat numbers leave users anxious.
        </p>

        {/* 4 Illustrative Scenarios Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Pending Transfer",
              question: "Has the money gone through, or is it still processing?",
              desc: "Customers experience uncertainty about whether funds actually reached the intended recipient when balances decrement instantly but settlement remains pending."
            },
            {
              num: "02",
              title: "Card Hold",
              question: "Why does the available balance differ from the expected balance?",
              desc: "Temporary authorizations from hotel check-ins, automated fuel pumps, or security pre-holds tie up customer liquidity without transparent contextual distinction."
            },
            {
              num: "03",
              title: "Possible Duplicate Charge",
              question: "Are two entries separate transactions or a problem worth investigating?",
              desc: "Identical amounts at the same merchant within hours trigger acute fraud alarm, even when one might simply be an authorization and the other a final settlement."
            },
            {
              num: "04",
              title: "ATM Cash Issue",
              question: "What information should the customer check before deciding what to do?",
              desc: "When an automated teller dispenses cash incompletely or errors out, users need immediate step-by-step guidance on terminal numbers, dispute windows, and reversal timelines."
            }
          ].map((scenario) => (
            <div
              key={scenario.num}
              className="p-5 bg-white/[0.02] border border-white/10 space-y-2.5 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  SCENARIO {scenario.num}
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase">
                  ILLUSTRATIVE FRICTION
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase">
                {scenario.title}
              </h3>
              <p className="font-mono text-xs text-emerald-400/90 font-semibold italic">
                &ldquo;{scenario.question}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {scenario.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Design Challenge Banner */}
        <div className="p-5 sm:p-6 bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-bold block">
            CENTRAL DESIGN CHALLENGE
          </span>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
            How might a banking-support interface help a user move from confusion to an evidence-informed next step without pretending to know more than the available records establish?
          </p>
          <span className="font-mono text-[11px] text-white/50 block pt-1">
            *Note: The scenarios above are presented as illustrative design challenges, not empirical research findings or verified customer incident metrics.
          </span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 — PRODUCT VISION                                       */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            04 // PRODUCT VISION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            From Transaction Visibility to Transaction Understanding
          </h2>
        </div>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl">
          OpsPilot adds an explanatory and problem-solving layer to a banking-support experience. The concept bridges the gap between raw ledger records and human confidence.
        </p>

        {/* The 5 Conceptual Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Relevant synthetic transaction records.",
            "Existing simulated case information.",
            "Explanations grounded in available evidence.",
            "Clarifying questions when information is insufficient.",
            "Suggested next steps appropriate to the scenario."
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/[0.02] border border-white/15 flex items-start gap-3"
            >
              <span className="w-5 h-5 bg-emerald-500/10 border border-emerald-500 text-emerald-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm font-mono text-white/90 leading-relaxed">
                {pillar}
              </span>
            </div>
          ))}
        </div>

        {/* Closing Vision Quote */}
        <div className="p-5 bg-white/[0.02] border-l-2 border-emerald-400 border-white/10">
          <p className="font-mono text-xs sm:text-sm text-white/90 italic leading-relaxed">
            &ldquo;The goal is not to make the AI sound certain. It is to make the available information easier to understand and the next step easier to identify.&rdquo;
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 — DESIGN GOALS                                         */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            05 // DESIGN GOALS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Principles Guiding the Assistant
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Evidence Before Explanation",
              desc: "Present relevant transaction and case information so users can understand what supports an explanation.",
              icon: FileText
            },
            {
              num: "02",
              title: "Clarity Over Jargon",
              desc: "Use understandable language and request clarification when the available information is insufficient.",
              icon: Sparkles
            },
            {
              num: "03",
              title: "Trust Through Boundaries",
              desc: "Distinguish evidence from interpretation and avoid presenting an AI-generated explanation as a verified banking decision.",
              icon: ShieldCheck
            },
            {
              num: "04",
              title: "A Useful Next Step",
              desc: "Help users identify an appropriate follow-up instead of ending with an unexplained status.",
              icon: ArrowRight
            }
          ].map((goal) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.num}
                className="p-6 bg-white/[0.02] border border-white/15 hover:border-emerald-500/40 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    GOAL {goal.num}
                  </span>
                  <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {goal.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans">
                  {goal.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06 — KEY USER JOURNEY                                     */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            06 // KEY USER JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            From &ldquo;Where Did My Money Go?&rdquo; to &ldquo;What Should I Do Next?&rdquo;
          </h2>
        </div>

        {/* 6-Step Visual Journey Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              step: "01",
              name: "ASK",
              desc: "The user describes a banking problem, such as a transfer that appears to be missing or a card transaction discrepancy."
            },
            {
              step: "02",
              name: "INVESTIGATE",
              desc: "The system inspects relevant synthetic transaction entries, merchant records, and simulated case histories."
            },
            {
              step: "03",
              name: "EXPLAIN",
              desc: "OpsPilot presents available evidence and contextual explanation, subject to schema validation and provider availability."
            },
            {
              step: "04",
              name: "CLARIFY",
              desc: "If evidence is insufficient, the interaction requests more information rather than assuming the cause or hallucinating certainty."
            },
            {
              step: "05",
              name: "RECOMMEND",
              desc: "The system presents a structured next step based on the scenario and supported prototype actions."
            },
            {
              step: "06",
              name: "CONFIRM",
              desc: "A consequential simulated action (such as card freeze or dispute filing) requires explicit user confirmation before proceeding."
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 bg-white/[0.02] border border-white/15 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black text-emerald-400">
                  {item.step}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                  JOURNEY STAGE
                </span>
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07 — UX AND INTERFACE DECISIONS                           */}
      {/* ========================================================= */}
      <section className="space-y-8 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            07 // UX &amp; INTERFACE DECISIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Make the Reasoning Easier to Follow
          </h2>
        </div>

        {/* Decision 1: Ask OpsPilot Query Interface & Case Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold">
              01 // QUERY INTERFACE &amp; CONTEXTUAL STARTERS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white">
              Direct Starting Scenarios &amp; Transparent Stepper
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              Users arrive in distress; making them compose technical banking prompts from scratch increases cognitive load. OpsPilot provides instant categorized common-task chips across Payments, Cards, and Insights alongside an upfront stepper indicating exactly where in the resolution journey the user is located.
            </p>
            <div className="p-3 bg-white/[0.03] border border-white/10 font-mono text-xs text-white/70">
              Key Pattern: Transparent stepper (Describe &rarr; Understand &rarr; Check records &rarr; Plan &rarr; Confirm &rarr; Track).
            </div>
          </div>

          <div className="border border-white/15 bg-black/60 overflow-hidden relative">
            <img
              src="/images/projects/opspilot/02_opspilot_ask_interface.png"
              alt="Ask OpsPilot Query Interface with breadcrumbs, input box, and categorized starter prompts"
              className="w-full h-auto object-cover max-h-[380px]"
            />
            <div className="p-2 bg-[#0a0c13] border-t border-white/10 font-mono text-[10px] text-white/60 flex justify-between">
              <span>GENUINE INTERFACE // /resolve</span>
              <span className="text-emerald-400">QUERY INPUT &amp; STEPPER</span>
            </div>
          </div>
        </div>

        {/* Decision 2: Investigation Result & Consequential Confirmation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-6 border-t border-white/10">
          <div className="order-2 lg:order-1 border border-white/15 bg-black/60 overflow-hidden relative">
            <img
              src="/images/projects/opspilot/03_opspilot_investigation_result.png"
              alt="OpsPilot Investigation Reasoning and Action Confirmation Checkpoint"
              className="w-full h-auto object-cover max-h-[380px]"
            />
            <div className="p-2 bg-[#0a0c13] border-t border-white/10 font-mono text-[10px] text-white/60 flex justify-between">
              <span>GENUINE INTERFACE // ACTION CHECKPOINT</span>
              <span className="text-emerald-400">CONSEQUENTIAL CONFIRMATION</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-3">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold">
              02 // REASONING &amp; ACTION CHECKPOINTS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white">
              Confirmation for Consequential Simulated Actions
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              Recommendations should be understandable and actionable within the prototype&rsquo;s supported scope without implying real banking operations are authorized automatically. OpsPilot separates guidance from commitment: high-impact simulated steps (such as freezing a card) require a deliberate confirmation modal.
            </p>
            <div className="p-3 bg-white/[0.03] border border-white/10 font-mono text-xs text-white/70">
              Key Pattern: Explicit user confirmation checkpoint before any consequential state mutation.
            </div>
          </div>
        </div>

        {/* Decision 3: Responsive Mobile Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-6 border-t border-white/10">
          <div className="space-y-3">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold">
              03 // RESPONSIVE ADAPTATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white">
              Mobile-First Ergonomics
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              Banking problems are most acutely experienced on mobile devices while at a store or ATM. OpsPilot adapts the desktop dual-pane sidebar into an accessible thumb-driven layout with large touch targets, scannable cards, and full keyboard/screen-reader compliance.
            </p>
            <div className="p-3 bg-white/[0.03] border border-white/10 font-mono text-xs text-white/70">
              Touch targets &ge; 48px, vertical card stacking, and high-contrast status chips.
            </div>
          </div>

          <div className="border border-white/15 bg-black/60 overflow-hidden relative flex justify-center p-4">
            <img
              src="/images/projects/opspilot/06_opspilot_mobile.png"
              alt="OpsPilot Mobile Responsive Layout on iPhone form factor"
              className="w-auto h-auto object-contain max-h-[420px] shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 — SYSTEM ARCHITECTURE                                  */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            08 // SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            A Full-Stack Prototype with an AI Integration Layer
          </h2>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="p-6 bg-white/[0.02] border border-white/15 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Frontend */}
            <div className="p-5 bg-[#0a0c13] border border-white/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">TIER 01</span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-white/10 text-white/80">VERCEL</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">FRONTEND CLIENT</h3>
              <p className="font-mono text-xs text-white/50">React · TypeScript · Tailwind CSS</p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2 border-t border-white/10">
                <li>• User input &amp; problem descriptions</li>
                <li>• Evidence display &amp; inspection</li>
                <li>• Recommendations UI</li>
                <li>• Consequential confirmation modal</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="p-5 bg-[#0a0c13] border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">TIER 02</span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300">RENDER</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">BACKEND API</h3>
              <p className="font-mono text-xs text-white/50">Node.js · Express</p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2 border-t border-white/10">
                <li>• Request handling &amp; query parsing</li>
                <li>• Server-side schema validation</li>
                <li>• Supported-action boundary checks</li>
                <li>• Rules-based fallback engine</li>
              </ul>
            </div>

            {/* Data & AI */}
            <div className="p-5 bg-[#0a0c13] border border-white/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">TIER 03</span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-white/10 text-white/80">SYNTHETIC + AI</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">RECORDS &amp; MODEL</h3>
              <p className="font-mono text-xs text-white/50">Synthetic Data + xAI Grok API</p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2 border-t border-white/10">
                <li>• Synthetic ledger &amp; case records</li>
                <li>• xAI Grok API (subject to availability)</li>
                <li>• Strict JSON structured outputs</li>
                <li>• Fallback when AI unconfigured</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/75 leading-relaxed">
            <span className="text-emerald-400 font-bold">ARCHITECTURAL GROUNDING:</span> Verified against the actual repository and deployment endpoints. The client does not directly connect to third-party AI keys from the browser; all requests traverse the Express backend on Render for schema validation, logging, and rules fallback.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 — AI AND SAFETY                                        */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            09 // AI AND SAFETY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Useful Assistance Needs Clear Boundaries
          </h2>
        </div>

        <div className="space-y-3">
          {[
            "Server-side validation checks model output against supported response structures and actions.",
            "Available synthetic transaction and case records provide context, without implying access to a bank's full internal systems.",
            "A rules-based fallback provides an alternative path when AI-provider responses fail or are unavailable, where implemented.",
            "Consequential simulated actions require confirmation.",
            "Recommendations and simulated actions are not real financial operations."
          ].map((point, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/[0.02] border border-white/15 flex items-start gap-3 text-xs sm:text-sm font-sans text-white/85"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-yellow-500/[0.05] border border-yellow-500/30 text-xs font-mono text-white/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-yellow-400">SAFETY BOUNDARY DISCLOSURE:</span> These controls reduce certain risks but do not establish that every response is accurate, every failure scenario is covered, or the prototype is production-ready for banking.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 — ENGINEERING CHALLENGES                               */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            10 // ENGINEERING CHALLENGES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            Designing for More Than the Successful Response
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "AI Provider Failures",
              desc: "The product must account for unavailable or unsuccessful provider responses. The prototype includes a rules-based fallback path operating seamlessly when AI keys are unconfigured or external APIs time out."
            },
            {
              title: "Structured AI Output",
              desc: "Model-generated natural language requires strict server-side validation against pre-approved response schemas before being treated as supported UI actions."
            },
            {
              title: "Useful Error Handling",
              desc: "Error states are designed to aid troubleshooting for users without leaking raw server stack traces, API keys, internal credentials, or sensitive headers."
            },
            {
              title: "Action Boundaries",
              desc: "Generated recommendations must never automatically trigger financial operations. The interface enforces deliberate confirmation before any simulated account mutation."
            }
          ].map((challenge, idx) => (
            <div
              key={idx}
              className="p-5 bg-white/[0.02] border border-white/15 space-y-2 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  CHALLENGE 0{idx + 1}
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase">ENGINEERING</span>
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                {challenge.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {challenge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11 — FINAL OUTCOME                                        */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            11 // FINAL OUTCOME
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            A Deployed, End-to-End Portfolio Prototype
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-4xl">
          <p>
            OpsPilot brings together a React and TypeScript frontend, an Express backend, an AI-provider integration, synthetic banking evidence, simulated case information, validation, fallback handling, and confirmation-oriented interactions.
          </p>
          <p>
            The project demonstrates an approach to combining product thinking, interface design, full-stack implementation, and responsible AI interaction patterns.
          </p>
        </div>

        {/* Balanced Claims Notice */}
        <div className="p-4 bg-white/[0.02] border border-white/15 font-mono text-xs text-white/70 space-y-1">
          <span className="text-emerald-400 font-bold block">HONEST EVALUATION &amp; METRIC INTEGRITY:</span>
          <p>
            The frontend and backend have deployment URLs supplied for the project. Live AI response reliability has not yet been conclusively verified, so do not claim model accuracy, uptime, latency, customer satisfaction, conversion improvements, or production banking readiness.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12 — WHAT I LEARNED                                       */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            12 // RETROSPECTIVE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
            What Building OpsPilot Taught Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "AI Product UX",
              takeaway: "An answer is more useful when users can understand its supporting context and limitations rather than receiving opaque assertions."
            },
            {
              title: "Evidence-Grounded Interaction",
              takeaway: "Transaction and case information should guide explanations without being confused with model interpretation."
            },
            {
              title: "Full-Stack Integration",
              takeaway: "AI products require rigorous coordination between frontend presentation, backend validation layers, and external providers."
            },
            {
              title: "Failure-Aware Design",
              takeaway: "Provider errors and invalid responses must be considered as expected first-class product states, not edge-case crashes."
            },
            {
              title: "Responsible Action Design",
              takeaway: "Confirmation and server-side checks help separate AI-generated recommendations from executed, consequential actions."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white/[0.02] border border-white/15 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  TAKEAWAY 0{idx + 1}
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase">LEARNING</span>
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans">
                {item.takeaway}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13 — LIVE DEMO CTA & CLOSE                                */}
      {/* ========================================================= */}
      <section className="p-8 sm:p-10 bg-gradient-to-b from-[#11141d] to-[#0a0c13] border border-white/15 space-y-6 text-center max-w-4xl mx-auto">
        <div className="space-y-2">
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            13 // INTERACTIVE PROTOTYPE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Explore OpsPilot
          </h2>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl mx-auto font-sans leading-relaxed">
            Try the prototype using fictional scenarios and synthetic data. Do not enter real bank credentials, account details, card information, or other sensitive financial information.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black hover:bg-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl group"
          >
            <span>LAUNCH OPSPILOT PROTOTYPE</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white hover:text-emerald-400 border border-white/20 hover:border-emerald-500/40 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            <span>VIEW GITHUB REPOSITORY</span>
          </a>
        </div>

        <p className="font-mono text-[11px] text-white/50 pt-2">
          Independent portfolio prototype · Not an official banking product · AI responses may be unavailable or incorrect.
        </p>
      </section>
    </div>
  );
};

export default OpsPilotCaseStudy;
