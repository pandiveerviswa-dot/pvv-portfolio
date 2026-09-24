import React from 'react';
import { ArrowRight, Check, CheckCircle2, TrendingUp, DollarSign, PieChart, BarChart2, Calendar, Search, Smartphone, Monitor, ShieldCheck, AlertCircle, Sparkles, Filter, ChevronDown } from 'lucide-react';

export const PulseCaseStudy = ({ project }) => {
  return (
    <div className="space-y-12 text-white animate-fadeIn">
      {/* ========================================================= */}
      {/* 01 — PROJECT COVER                                        */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 text-lime font-mono text-[11px] font-bold uppercase tracking-wider">
            <span>SELF-INITIATED PRODUCT DESIGN CASE STUDY</span>
          </div>
          <span className="font-mono text-xs text-white/50">
            UI/UX DESIGN • DATA VISUALIZATION • DASHBOARD UX • RESPONSIVE DESIGN
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="editorial-headline text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            PULSE
          </h1>
          <p className="font-mono text-sm sm:text-base text-lime tracking-wider uppercase font-semibold">
            PERSONAL FINANCIAL INSIGHTS EXPERIENCE
          </p>
        </div>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl">
          A conceptual personal finance platform designed to help users understand spending, budgets, recurring expenses and financial patterns through a clear visual experience.
        </p>

        {/* High-Fidelity Dashboard Composition Preview */}
        <div className="border border-white/15 bg-black/60 overflow-hidden relative group">
          <img
            src="/images/projects/pulse-preview.svg"
            alt="PULSE Personal Finance Dashboard Preview"
            className="w-full h-auto object-cover max-h-[480px]"
          />
          <div className="p-3 bg-[#0a0c13] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/60">
            <span>FINANCIAL DASHBOARD COCKPIT // BALANCES, VELOCITY CURVES &amp; RECENT TRANSACTIONS</span>
            <span className="text-lime font-bold">SAMPLE DATA / DEMO</span>
          </div>
        </div>

        {/* Sample Data Disclaimer Banner */}
        <div className="p-4 bg-lime/[0.04] border border-lime/30 text-xs font-mono text-white/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-lime shrink-0 mt-0.5" />
          <div>
            <span className="text-lime font-bold">DATA INTEGRITY NOTICE: </span>
            <span>This is a conceptual self-initiated product design study. All account balances, figures, charts, and transaction line-items use fictional sample data for demonstration purposes only.</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 — THE UX PROBLEM                                       */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>02 // THE UX PROBLEM</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white leading-tight">
            FINANCIAL DATA IS EASY TO COLLECT.<br />
            <span className="text-lime">HARDER TO UNDERSTAND.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-3xl font-sans leading-relaxed">
            Raw banking tables provide lists of numbers, but users still struggle to deduce their financial reality. Without structured visual hierarchy, answering fundamental questions requires manual mental arithmetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-white/40 uppercase block">CORE USER STRUGGLES</span>
            <div className="space-y-2 font-mono text-xs text-white/75">
              {[
                'WHERE MONEY GOES',
                'WHAT CHANGED MONTH-OVER-MONTH',
                'WHICH CATEGORIES ARE GROWING',
                'WHETHER THEY ARE WITHIN A BUDGET',
                'WHAT REQUIRES IMMEDIATE ATTENTION'
              ].map((item, i) => (
                <div key={item} className="p-2.5 bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="text-rose-400 font-bold">0{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-lime/[0.04] border border-lime/30 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-lime uppercase font-bold block">DESIGN OBJECTIVE</span>
              <h3 className="text-xl font-bold uppercase text-white mt-1">
                TURN FINANCIAL DATA INTO UNDERSTANDABLE INFORMATION
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed mt-2">
                PULSE transforms flat transaction feeds into scannable curves, proportional ring allocations, and non-advisory pattern cards that answer these questions at a single glance.
              </p>
            </div>
            <div className="p-3 bg-black/60 border border-lime/30 font-mono text-xs text-lime space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Instant Orientation (Net Position in 1s)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Pacing Relative to Target Budgets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Visual Anomaly Detection Without Advice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 — DESIGN OBJECTIVES                                     */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>03 // DESIGN OBJECTIVES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: '01', title: 'MAKE COMPLEX DATA EASY TO SCAN', desc: 'Structure numbers into high-contrast primary, secondary, and supporting tiers.' },
            { num: '02', title: 'CREATE CLEAR FINANCIAL HIERARCHY', desc: 'Emphasize net balance and monthly burn velocity before showing line items.' },
            { num: '03', title: 'MAKE SPENDING PATTERNS VISIBLE', desc: 'Replace raw spreadsheets with interactive curves and category ring breakdowns.' },
            { num: '04', title: 'REDUCE COGNITIVE LOAD', desc: 'Surface automated pattern insights to eliminate manual financial calculations.' },
            { num: '05', title: 'DESIGN FOR DESKTOP AND MOBILE', desc: 'Ensure equal analytical capability on wide screens and handheld touch devices.' },
          ].map((obj) => (
            <div key={obj.num} className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
              <span className="font-display text-2xl font-black text-lime">{obj.num}</span>
              <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wide">{obj.title}</h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 — INFORMATION ARCHITECTURE                             */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>04 // INFORMATION ARCHITECTURE &amp; SECTION RELATIONS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { name: 'OVERVIEW', role: 'Telemetry Cockpit', desc: 'High-level financial baseline and pacing velocity.' },
            { name: 'TRANSACTIONS', role: 'Line-Item Audit', desc: 'Searchable, filterable ledger with inline drawers.' },
            { name: 'BUDGETS', role: 'Target Limits', desc: 'Category-by-category constraint progress meters.' },
            { name: 'INSIGHTS', role: 'Pattern Analysis', desc: 'Automated trend and anomaly detection cards.' },
            { name: 'GOALS', role: 'Trajectory Mapping', desc: 'Future pacing projections for savings milestones.' },
            { name: 'PROFILE', role: 'Account Settings', desc: 'Security, connected institutions, and preferences.' },
          ].map((nav) => (
            <div key={nav.name} className="p-3.5 bg-white/[0.02] border border-white/15 space-y-1.5">
              <span className="font-mono text-[10px] text-lime font-bold block">{nav.role}</span>
              <h4 className="font-mono text-xs font-bold text-white uppercase">{nav.name}</h4>
              <p className="text-[11px] text-white/70 font-sans leading-snug">{nav.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 — DASHBOARD INFORMATION HIERARCHY                      */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>05 // DASHBOARD INFORMATION HIERARCHY</span>
        </div>

        <div className="space-y-3">
          {[
            {
              tier: 'PRIMARY TIER',
              color: 'text-lime',
              metric: 'TOTAL NET BALANCE ($24,850.00)',
              rationale: 'Establishes the user’s overall financial health immediately upon landing. Designed in large Syne typography so it anchors the eye within 1 second.',
            },
            {
              tier: 'SECONDARY TIER',
              color: 'text-white',
              metric: 'MONTHLY SPENDING ($3,420) • BUDGET STATUS (85%) • SAVINGS (+$640)',
              rationale: 'Answers the velocity question: "Am I on track this month?" Presented directly below the primary balance to evaluate speed and runway.',
            },
            {
              tier: 'SUPPORTING TIER',
              color: 'text-white/60',
              metric: 'RECENT TRANSACTIONS • CATEGORY BREAKDOWN • UPCOMING RENEWALS',
              rationale: 'Granular details for verification and drill-down. Placed in structured sub-cards to avoid overwhelming the initial scan.',
            },
          ].map((t) => (
            <div key={t.tier} className="p-4 bg-white/[0.02] border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-bold uppercase ${t.color}`}>{t.tier}</span>
                <span className="font-mono text-[10px] text-white/40">SAMPLE DATA MATRIX</span>
              </div>
              <div className="font-mono text-xs font-bold text-white">{t.metric}</div>
              <p className="text-xs text-white/70 font-sans leading-relaxed pt-0.5">{t.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06 — DATA VISUALIZATION                                   */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
            <span>06 // DATA VISUALIZATION SYSTEMS</span>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 bg-lime/10 text-lime font-bold">
            SAMPLE DATA / CONCEPTUAL VISUALIZATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'Monthly Spending Velocity',
              type: 'Curved Area Trend Line',
              desc: 'Compares daily cumulative spend against a linear target pacing line ($3,420 vs $4,000 budget), making pace acceleration visible immediately.',
            },
            {
              name: 'Category Allocation Donut',
              type: 'Proportional Ring Matrix',
              desc: 'Visualizes category share (Housing 38%, Food 24%, Subscriptions 18%, Transport 20%) with interactive hover slice isolation.',
            },
            {
              name: 'Budget Progress Bars',
              type: 'Segmented Progress Meters',
              desc: 'Color-graded horizontal bars indicating consumed vs remaining allowances per category, with safety threshold warnings.',
            },
            {
              name: 'Recurring Subscriptions Grid',
              type: 'Pacing Calendar Timeline',
              desc: 'Visual schedule flagging upcoming renewal dates (e.g. Oct 18, Oct 24) and highlighting month-over-month rate modifications.',
            },
          ].map((viz) => (
            <div key={viz.name} className="p-4 bg-white/[0.02] border border-white/15 space-y-2">
              <span className="font-mono text-[10px] text-lime uppercase font-bold">{viz.type}</span>
              <h3 className="font-mono text-xs font-bold text-white uppercase">{viz.name}</h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed">{viz.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07 — TRANSACTION EXPERIENCE                               */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>07 // TRANSACTION AUDIT EXPERIENCE</span>
        </div>

        <div className="p-5 bg-white/[0.02] border border-white/15 space-y-4">
          <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
            Engineered for frictionless ledger management through instant fuzzy search, multidimensional filters, and inline receipt expanders.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-black/40 border border-white/10 space-y-1 font-mono text-xs">
              <span className="text-lime font-bold">1. REAL-TIME SEARCH</span>
              <p className="text-[11px] text-white/70">Instant filtering across merchant names, notes, and tags without page reloads.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/10 space-y-1 font-mono text-xs">
              <span className="text-lime font-bold">2. MULTI-AXIS FILTERS</span>
              <p className="text-[11px] text-white/70">Category, date span, amount ranges, and payment methods combined seamlessly.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/10 space-y-1 font-mono text-xs">
              <span className="text-lime font-bold">3. INLINE EXPANSION</span>
              <p className="text-[11px] text-white/70">Row expansion exposes receipt attachments, re-categorization, and merchant history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 — INSIGHTS EXPERIENCE (NON-ADVISORY)                    */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>08 // PATTERN INSIGHTS (NON-ADVISORY VISUALIZER)</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
            The interface detects spending anomalies and recurring trends without offering subjective financial advice. It presents objective patterns for user awareness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'SPENDING TREND', text: 'Food & Dining spending is 18% higher than your previous 3-month rolling median.', type: 'Velocity Anomaly' },
              { title: 'MONTHLY CATEGORY CHANGE', text: 'Utility expenses decreased by $42 following seasonal billing cycle adjustment.', type: 'Seasonal Shift' },
              { title: 'RECURRING EXPENSE', text: 'Cloud software subscription renewed at $49/mo (scheduled next on Oct 18).', type: 'Subscription Audit' },
              { title: 'BUDGET STATUS', text: 'Groceries budget is at 64% utilization with 12 days remaining in cycle.', type: 'Pacing Guardrail' },
            ].map((insight) => (
              <div key={insight.title} className="p-4 bg-white/[0.02] border border-white/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-lime font-bold">{insight.title}</span>
                  <span className="font-mono text-[10px] text-white/40">{insight.type}</span>
                </div>
                <p className="text-xs text-white/90 font-sans leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 — MOBILE EXPERIENCE                                    */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>09 // DESKTOP TO MOBILE RESPONSIVE TRANSFORMATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
              <Monitor className="w-4 h-4" />
              <span>DESKTOP EXPERIENCE</span>
            </div>
            <ul className="text-xs text-white/80 font-sans space-y-1.5 list-disc pl-4">
              <li>Expansive panoramic dashboard with side navigation rail.</li>
              <li>Multi-metric visualizer with interactive hover curve scrubbers.</li>
              <li>Comprehensive transaction data tables with multi-column sorting.</li>
              <li>Simultaneous display of primary, secondary, and supporting tiers.</li>
            </ul>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
              <Smartphone className="w-4 h-4" />
              <span>MOBILE EXPERIENCE</span>
            </div>
            <ul className="text-xs text-white/80 font-sans space-y-1.5 list-disc pl-4">
              <li>Bottom thumb-zone navigation for one-handed operation.</li>
              <li>Stacked swipeable metric cards with condensed sparklines.</li>
              <li>Transaction table converted into tap-to-expand card rows.</li>
              <li>Bottom-sheet drawers for filters and receipt attachments.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 — DESIGN SYSTEM                                        */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>10 // FINANCIAL DESIGN SYSTEM</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-lime uppercase font-bold">TYPOGRAPHY &amp; MONETARY SCALE</span>
            <div className="space-y-2 font-sans text-xs">
              <div>
                <span className="font-display text-lg font-bold text-white block">Syne Display</span>
                <span className="text-white/60 font-mono text-[10px]">Used for large currency balances ($24,850.00) and headers.</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="font-bold text-white block">Plus Jakarta Sans</span>
                <span className="text-white/60 font-mono text-[10px]">Used for category labels, descriptions, and UI controls.</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="font-mono text-lime font-bold block">Space Mono</span>
                <span className="text-white/60 font-mono text-[10px]">Tabular numbers, transaction amounts, and timestamps.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-lime uppercase font-bold">SEMANTIC COLOR SYSTEM</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Obsidian', hex: '#08090D' },
                { name: 'Surface Card', hex: '#11131A' },
                { name: 'Accent Lime', hex: '#CCFF00', darkText: true },
                { name: 'Inflow (+)', hex: '#10B981', darkText: true },
                { name: 'Outflow (−)', hex: '#F43F5E', darkText: true },
                { name: 'Muted Text', hex: 'rgba(255,255,255,0.6)' },
              ].map((c) => (
                <div key={c.name} className="p-2 border border-white/15 bg-black/40 space-y-1">
                  <div className="w-full h-8" style={{ backgroundColor: c.hex }} />
                  <div className="font-mono text-[10px] text-white font-bold truncate">{c.name}</div>
                  <div className="font-mono text-[9px] text-white/40">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/60 border border-white/15 space-y-2">
          <span className="font-mono text-xs text-white/50 uppercase block">COMPONENT PRIMITIVES</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Cards', 'Buttons', 'Inputs', 'Charts', 'Tables', 'Badges', 'Navigation', 'Empty States', 'Error States'].map((c) => (
              <span key={c} className="font-mono text-xs px-3 py-1 bg-white/[0.05] border border-white/15 text-white/90">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11 — ACCESSIBILITY                                        */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
            <span>11 // ACCESSIBILITY HIGHLIGHTS</span>
          </div>
          <span className="font-mono text-[11px] text-white/40 uppercase">
            NOTE: DESIGN ACCESSIBILITY HIGHLIGHTS (NOT FORMAL CERTIFICATION)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Accessible Contrast', desc: 'All critical monetary text meets high-contrast readability against dark canvas.' },
            { title: 'Non-Color-Only Coding', desc: 'Outflows include minus signs "−" and directional markers; inflows include plus signs "+".' },
            { title: 'Keyboard & Focus Rings', desc: 'Interactive charts and transaction rows support arrow navigation with visible focus states.' },
            { title: 'Screen Reader Labels', desc: 'Monetary amounts formatted with explicit aria-label descriptions (e.g. "Negative forty-two dollars").' },
          ].map((a11y) => (
            <div key={a11y.title} className="p-4 bg-white/[0.02] border border-white/15 space-y-1">
              <span className="font-mono text-xs font-bold text-lime uppercase block">{a11y.title}</span>
              <p className="text-xs text-white/75 font-sans leading-relaxed">{a11y.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12 — INTERACTION DESIGN                                   */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>12 // INTERACTION DESIGN &amp; MICRO-STATES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Chart Scrubbing', desc: 'Hovering or dragging across the timeline reveals exact day-by-day spend tooltips without UI lag.' },
            { title: 'Accordion Drawers', desc: 'Smooth expanding containers reveal itemized receipts without triggering layout reflow jumps.' },
            { title: 'Filter Transitions', desc: 'Subtle crossfade state updates when toggling date ranges or transaction categories.' },
          ].map((inter) => (
            <div key={inter.title} className="p-4 bg-white/[0.02] border border-white/15 space-y-1">
              <span className="font-mono text-xs font-bold text-lime uppercase block">{inter.title}</span>
              <p className="text-xs text-white/75 font-sans leading-relaxed">{inter.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13 — FRONT-END ARCHITECTURE                               */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>13 // FRONT-END IMPLEMENTATION ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs text-white/50 uppercase block">IMPLEMENTATION STACK</span>
            <div className="flex flex-wrap gap-2">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS'].map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 bg-lime/10 border border-lime/30 text-lime font-bold">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/70 font-sans leading-relaxed pt-2">
              Component boundaries designed to reflect single-responsibility architecture in React with responsive Tailwind utility tokens.
            </p>
          </div>

          <div className="lg:col-span-7 p-4 bg-black/60 border border-white/15 font-mono text-xs text-white/90 space-y-1">
            <div className="text-lime font-bold pb-1">CONCEPTUAL IMPLEMENTATION ARCHITECTURE</div>
            <div className="text-white/80">App</div>
            <div className="text-white/80">├── Navigation</div>
            <div className="text-white/80">├── Dashboard</div>
            <div className="text-white/80">├── SpendingChart</div>
            <div className="text-white/80">├── BudgetCard</div>
            <div className="text-white/80">├── TransactionTable</div>
            <div className="text-white/80">├── Insights</div>
            <div className="text-white/80">└── DesignSystem</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14 — FINAL SUMMARY                                        */}
      {/* ========================================================= */}
      <section className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>14 // FINAL CORE COMPETENCY SUMMARY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            'DATA VISUALIZATION',
            'INFORMATION HIERARCHY',
            'RESPONSIVE DESIGN',
            'ACCESSIBLE INTERACTION',
            'PRODUCT THINKING'
          ].map((item) => (
            <div key={item} className="p-3 bg-white/[0.04] border border-white/15 text-center font-mono text-[11px] font-bold text-lime">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PulseCaseStudy;
