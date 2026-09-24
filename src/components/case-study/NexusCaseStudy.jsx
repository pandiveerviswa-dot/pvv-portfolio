import React from 'react';
import { ArrowRight, Check, CheckCircle2, Layers, Layout, Search, ShieldCheck, Terminal, Smartphone, Monitor, Tablet, FileText, Users, Eye, AlertCircle } from 'lucide-react';

export const NexusCaseStudy = ({ project }) => {
  return (
    <div className="space-y-12 text-white animate-fadeIn">
      {/* ========================================================= */}
      {/* 01 — PROJECT OVERVIEW                                     */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 text-lime font-mono text-[11px] font-bold uppercase tracking-wider">
            <span>SELF-INITIATED PRODUCT DESIGN CASE STUDY</span>
          </div>
          <span className="font-mono text-xs text-white/50">
            UI/UX DESIGN • PRODUCT DESIGN • ENTERPRISE UX • DESIGN SYSTEM
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="editorial-headline text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            NEXUS
          </h1>
          <p className="font-mono text-sm sm:text-base text-lime tracking-wider uppercase font-semibold">
            ENTERPRISE WORKFLOW &amp; KNOWLEDGE EXPERIENCE
          </p>
        </div>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl">
          A conceptual enterprise workspace that connects projects, tasks, knowledge, approvals and team activity into one structured digital experience. Designed to eliminate context-switching by establishing a unified operational surface.
        </p>

        {/* High-Fidelity Interface Composition Preview */}
        <div className="border border-white/15 bg-black/60 overflow-hidden relative group">
          <img
            src="/images/projects/nexus-preview.svg"
            alt="NEXUS Enterprise Interface Composition"
            className="w-full h-auto object-cover max-h-[480px]"
          />
          <div className="p-3 bg-[#0a0c13] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/60">
            <span>HIGH-FIDELITY INTERFACE COMPOSITION // WORKSPACE DASHBOARD &amp; KNOWLEDGE SEARCH</span>
            <span className="text-lime font-bold">CONCEPTUAL DEMO</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 — PROBLEM: FRAGMENTED WORKFLOW                         */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>02 // THE UX PROBLEM</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
            THE FRAGMENTED WORKFLOW
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-3xl font-sans leading-relaxed">
            Modern enterprise teams often work across multiple disconnected tools. Users must constantly switch between systems to understand project status, locate documentation, update tasks, and coordinate sign-offs.
          </p>
        </div>

        {/* Fragmented vs Unified Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-white/40 uppercase block">FRAGMENTED ECOSYSTEM</span>
            <div className="space-y-2 font-mono text-xs text-white/70">
              <div className="p-2.5 bg-black/40 border border-white/10 flex items-center justify-between">
                <span>TASKS</span>
                <span className="text-white/40">Tool A (Jira / Asana)</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10 flex items-center justify-between">
                <span>DOCUMENTS</span>
                <span className="text-white/40">Tool B (Confluence / Drive)</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10 flex items-center justify-between">
                <span>COMMUNICATION</span>
                <span className="text-white/40">Tool C (Slack / Teams)</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10 flex items-center justify-between">
                <span>APPROVALS</span>
                <span className="text-white/40">Tool D (Email / PRs)</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10 flex items-center justify-between">
                <span>STATUS REPORTING</span>
                <span className="text-white/40">Manual Status Sheets</span>
              </div>
            </div>
            <p className="font-mono text-[11px] text-rose-400/80 pt-1">
              Result: Cognitive overload, stale documentation, lost context, delayed approvals.
            </p>
          </div>

          <div className="p-5 bg-lime/[0.04] border border-lime/30 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-lime uppercase block font-bold">THE NEXUS PARADIGM</span>
              <h3 className="text-xl font-bold uppercase text-white mt-1">
                ONE CONNECTED WORKSPACE
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed mt-2">
                NEXUS anchors every task to its corresponding documentation, review pipeline, and team stream. Moving a ticket automatically updates its knowledge page and triggers the approval workflow without leaving the workspace.
              </p>
            </div>
            <div className="p-3 bg-black/60 border border-lime/30 font-mono text-xs text-lime space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Context-Switching</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Bi-Directional Knowledge Linking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>In-Context Multi-Tier Sign-Offs</span>
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
            { num: '01', title: 'REDUCE INFORMATION FRICTION', desc: 'Eliminate multi-tab app hopping with instant search and inline document inspectors.' },
            { num: '02', title: 'MAKE WORK STATUS VISIBLE', desc: 'Real-time telemetry radars highlighting blockers, review queues, and sprint velocity.' },
            { num: '03', title: 'CONNECT TASKS WITH KNOWLEDGE', desc: 'Tasks natively link to active markdown specs, preventing desynchronized requirements.' },
            { num: '04', title: 'SIMPLIFY COMPLEX WORKFLOWS', desc: 'Multi-stage sign-offs broken into transparent 2-step verification cards.' },
            { num: '05', title: 'CREATE A SCALABLE INTERFACE SYSTEM', desc: 'Modular design tokens and atomic primitives allowing seamless feature expansions.' },
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
      {/* 04 — CONCEPTUAL USER JOURNEY                              */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
            <span>04 // USER JOURNEY</span>
          </div>
          <span className="font-mono text-[11px] text-white/40 uppercase">
            LABEL: CONCEPTUAL USER JOURNEY (NOT REAL-USER TELEMETRY)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          {[
            { stage: 'DISCOVER', desc: 'Scan multi-project radar and incoming action queues.' },
            { stage: 'UNDERSTAND', desc: 'Inspect contextual documents, task goals, and history.' },
            { stage: 'PLAN', desc: 'Structure milestones into interactive boards & dependency trees.' },
            { stage: 'EXECUTE', desc: 'Write, design, and code with inline linked documentation.' },
            { stage: 'REVIEW', desc: 'Trigger approval flow with side-by-side asset/spec diffs.' },
            { stage: 'COMPLETE', desc: 'Archive release, notify stakeholders, and update audit trail.' },
          ].map((s, idx) => (
            <div key={s.stage} className="p-3.5 bg-white/[0.02] border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-lime font-bold">STAGE 0{idx + 1}</span>
                <span className="text-white/30 text-xs">→</span>
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase">{s.stage}</h4>
              <p className="text-[11px] text-white/70 font-sans leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05 — INFORMATION ARCHITECTURE                             */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>05 // INFORMATION ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Global Primary Navigation */}
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono text-xs text-white/50 uppercase block">PRIMARY GLOBAL NAVIGATION NODES</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['HOME', 'PROJECTS', 'TASKS', 'KNOWLEDGE', 'APPROVALS', 'TEAM', 'SEARCH'].map((nav) => (
                <div key={nav} className="p-3 bg-white/[0.03] border border-white/10 font-mono text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime rounded-none" />
                  <span>{nav}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/60 font-sans pt-1">
              Top-level nodes guarantee predictable navigation depth, preventing deep modal nesting.
            </p>
          </div>

          {/* Project Node Tree Hierarchy */}
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono text-xs text-white/50 uppercase block">PROJECT WORKSPACE HIERARCHY TREE</span>
            <div className="p-4 bg-black/60 border border-white/15 font-mono text-xs text-white/90 space-y-1">
              <div className="text-lime font-bold">PROJECT</div>
              <div className="text-white/80">├── Overview (Telemetry &amp; Health Radar)</div>
              <div className="text-white/80">├── Tasks (Milestones, Kanban &amp; Sprint Lists)</div>
              <div className="text-white/80">├── Documents (Linked Specs &amp; Token Guidelines)</div>
              <div className="text-white/80">├── Activity (Audit Stream &amp; State Logs)</div>
              <div className="text-white/80">├── Team (Role Permissions &amp; Ownership)</div>
              <div className="text-white/80">└── Approvals (Two-Stage Verification Center)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06 — WIREFRAMES                                           */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>06 // WIREFRAME SPECIFICATIONS &amp; DESIGN DECISIONS</span>
        </div>

        <div className="space-y-3">
          {[
            { num: '01', title: 'Dashboard Wireframe', desc: 'Tri-column layout with quick global search, active projects radar, and action priority queue.', decision: 'Keeps critical action items in top viewport fold without requiring vertical scrolling.' },
            { num: '02', title: 'Project Overview Wireframe', desc: 'Dual split-pane balancing milestone timelines on the left with linked documentation on the right.', decision: 'Eliminates separate doc tabs by embedding specifications alongside execution tasks.' },
            { num: '03', title: 'Task Detail Wireframe', desc: 'Slide-over inspector connecting checklist items with related knowledge base documents.', decision: 'Slide-over drawer prevents user from losing their current position in large task lists.' },
            { num: '04', title: 'Knowledge Search Wireframe', desc: 'Command-K modal with instant filters across docs, tickets, and team comments.', decision: 'Universal keyboard accelerator allows power users to traverse any entity in under 3 keystrokes.' },
            { num: '05', title: 'Approval Flow Wireframe', desc: 'Two-stage verification card highlighting requester context, asset diffs, and sign-off actions.', decision: 'Side-by-side asset diffs prevent erroneous approvals by highlighting modifications clearly.' },
          ].map((w) => (
            <div key={w.num} className="p-4 bg-white/[0.02] border border-white/15 space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-lime font-bold">{w.num}</span>
                <span className="font-mono text-xs text-white uppercase font-bold">{w.title}</span>
              </div>
              <p className="text-xs text-white/80 font-sans">{w.desc}</p>
              <div className="text-[11px] font-mono text-lime/90 flex items-start gap-1 pt-1">
                <span className="font-bold">DESIGN DECISION:</span>
                <span>{w.decision}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07 — HIGH-FIDELITY UI SCREENS                             */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>07 // HIGH-FIDELITY PRODUCT SCREENS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: '01 NEXUS Dashboard', focus: 'Global workspace telemetry, priority task drawer, and recent team deliverables.' },
            { name: '02 Project Workspace', focus: 'Milestone kanban integrated with linked specifications and git/deploy status.' },
            { name: '03 Task Detail View', focus: 'Rich markdown editor with inline task mentions, subtasks, and dependency tree.' },
            { name: '04 Knowledge Search', focus: 'Fuzzy-indexed documentation search with syntax-highlighted snippets.' },
            { name: '05 Approval Center', focus: 'Review queue with side-by-side diff previews, risk flags, and one-click sign-offs.' },
            { name: '06 Team Activity Feed', focus: 'Real-time audit log of commits, reviews, status promotions, and approvals.' },
          ].map((screen) => (
            <div key={screen.name} className="p-4 bg-white/[0.02] border border-white/15 space-y-2">
              <div className="h-28 bg-[#11131b] border border-white/10 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span>SCREENSHOT</span>
                  <span className="text-lime">HIGH-FI</span>
                </div>
                <div className="font-mono text-xs font-bold text-white uppercase">{screen.name}</div>
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed">{screen.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08 — DESIGN SYSTEM & TOKENS                               */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>08 // DESIGN SYSTEM ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Typography Scale */}
          <div className="lg:col-span-6 p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-lime uppercase font-bold">TYPOGRAPHY TOKENS</span>
            <div className="space-y-2">
              <div>
                <div className="text-xl font-extrabold uppercase font-display text-white">Syne Display (Headings)</div>
                <span className="font-mono text-[10px] text-white/40">Weights: 700 / 800 • Tracking: -0.04em</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="text-sm font-sans font-medium text-white/90">Plus Jakarta Sans (Interface &amp; Tables)</div>
                <span className="font-mono text-[10px] text-white/40">Weights: 400 / 500 / 600 • Body &amp; Data Grids</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="font-mono text-xs text-lime font-bold">Space Mono (Telemetry &amp; Badges)</div>
                <span className="font-mono text-[10px] text-white/40">Weights: 400 / 700 • Fixed-width numeric metrics</span>
              </div>
            </div>
          </div>

          {/* Color Tokens Palette */}
          <div className="lg:col-span-6 p-5 bg-white/[0.02] border border-white/15 space-y-3">
            <span className="font-mono text-xs text-lime uppercase font-bold">COLOR SYSTEM TOKENS</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Canvas Dark', hex: '#0C0D12' },
                { name: 'Surface Card', hex: '#141721' },
                { name: 'Accent Lime', hex: '#CCFF00', darkText: true },
                { name: 'Status Live', hex: '#10B981', darkText: true },
                { name: 'Status Alert', hex: '#F59E0B', darkText: true },
                { name: 'Border Subtle', hex: 'rgba(255,255,255,0.12)' },
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

        {/* Component Primitives Strip */}
        <div className="p-4 bg-black/60 border border-white/15 space-y-2">
          <span className="font-mono text-xs text-white/50 uppercase block">CORE COMPONENT PRIMITIVES</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Buttons', 'Inputs', 'Cards', 'Tables', 'Badges', 'Status Indicators', 'Navigation', 'Modals'].map((comp) => (
              <span key={comp} className="font-mono text-xs px-3 py-1 bg-white/[0.05] border border-white/15 text-white/90">
                {comp}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09 — RESPONSIVE DESIGN STRATEGY                           */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>09 // RESPONSIVE ADAPTATION MATRIX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
              <Monitor className="w-4 h-4" />
              <span>DESKTOP (1440px+)</span>
            </div>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Full 3-column panoramic layout with persistent command rail, expandable task inspector, and high-density data tables.
            </p>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
              <Tablet className="w-4 h-4" />
              <span>TABLET (768px - 1024px)</span>
            </div>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Adaptive 2-column view with collapsible left rail converted into an off-canvas drawer and touch-friendly targets.
            </p>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/15 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
              <Smartphone className="w-4 h-4" />
              <span>MOBILE (375px - 640px)</span>
            </div>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Single-column bottom-sheet architecture with simplified summary cards, swipeable tab headers, and 48px+ tap targets.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10 — ACCESSIBILITY AUDIT                                  */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
            <span>10 // ACCESSIBILITY CONSIDERATIONS</span>
          </div>
          <span className="font-mono text-[11px] text-white/40 uppercase">
            NOTE: DESIGN ACCESSIBILITY HIGHLIGHTS (NOT CERTIFIED AUDIT)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Keyboard Traversal', desc: 'Complete Tab, Shift+Tab, and Arrow key navigation with visible high-contrast focus rings.' },
            { title: 'Contrast Verification', desc: 'All critical text and border tokens meet high-contrast readability against dark canvas.' },
            { title: 'Semantic Hierarchy', desc: 'Valid landmark roles (<main>, <nav>, <aside>, <section>) and strictly sequential H1-H4 headings.' },
            { title: 'Accessible Form States', desc: 'Clear, persistent form labels with explicit aria-invalid error descriptions and states.' },
          ].map((a11y) => (
            <div key={a11y.title} className="p-4 bg-white/[0.02] border border-white/15 space-y-1">
              <span className="font-mono text-xs font-bold text-lime uppercase block">{a11y.title}</span>
              <p className="text-xs text-white/75 font-sans leading-relaxed">{a11y.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11 — FRONT-END CONNECTION                                 */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>11 // FRONT-END ARCHITECTURE CONNECTION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs text-white/50 uppercase block">CORE WEB TECHNOLOGY STACK</span>
            <div className="flex flex-wrap gap-2">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS'].map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 bg-lime/10 border border-lime/30 text-lime font-bold">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/70 font-sans leading-relaxed pt-2">
              Demonstrates front-end awareness: UI component states directly reflect React props and Tailwind token mappings.
            </p>
          </div>

          <div className="lg:col-span-7 p-4 bg-black/60 border border-white/15 font-mono text-xs text-white/90 space-y-1">
            <div className="text-lime font-bold pb-1">CONCEPTUAL IMPLEMENTATION ARCHITECTURE</div>
            <div className="text-white/80">App</div>
            <div className="text-white/80">├── Navigation</div>
            <div className="text-white/80">├── Dashboard</div>
            <div className="text-white/80">├── ProjectWorkspace</div>
            <div className="text-white/80">├── TaskPanel</div>
            <div className="text-white/80">├── KnowledgeSearch</div>
            <div className="text-white/80">├── ApprovalCenter</div>
            <div className="text-white/80">└── DesignSystem</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12 — FINAL SUMMARY                                        */}
      {/* ========================================================= */}
      <section className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest font-bold">
          <span>12 // FINAL CORE COMPETENCY SUMMARY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            'USER-CENTERED THINKING',
            'INFORMATION ARCHITECTURE',
            'VISUAL INTERFACE DESIGN',
            'SYSTEM-BASED DESIGN',
            'FRONT-END AWARENESS'
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

export default NexusCaseStudy;
