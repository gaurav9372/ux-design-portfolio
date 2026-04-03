# MediTrack — Case Study Content
Edit this file to update the MediTrack case study page. Save and refresh to see changes.

---

## hero-eyebrow
UX Case Study

## hero-title
MediTrack — Healthcare Dashboard Redesign

## hero-tagline
Reducing patient review time by 38% and critical alert miss-rate by 82% through a redesigned clinical dashboard for outpatient nurses.

## meta-role
UX Designer & Researcher

## meta-duration
12 weeks

## meta-team
4 people

## meta-tools
Figma, Hotjar, Miro

## meta-platform
Web (Desktop)

---

## overview-summary
MediTrack is a patient health monitoring dashboard used daily by nurses and clinical coordinators at outpatient clinics. The existing interface displayed 40+ data points on a single screen with no visual hierarchy — critical alerts were styled identically to routine readings, and nurses were missing time-sensitive changes in patient vitals. I led the redesign with a focus on information hierarchy, alert clarity, and reducing time-on-task for the three most common nursing workflows.

## overview-contribution
I was responsible for the full research and design process: contextual inquiry in clinical settings, task analysis, information architecture restructure, interaction design, accessibility review, and usability testing. I collaborated with a UI designer for visual refinement and two developers for the handoff and QA phase.

## metric-1-value
−38%

## metric-1-label
Average time per patient review session

## metric-2-value
−82%

## metric-2-label
Critical alert miss-rate (observed in usability testing)

## metric-3-value
92%

## metric-3-label
Nursing staff satisfaction score (post-launch survey)

---

## problem-heading
The Problem

## problem-statement
Nurses were missing critical patient alerts not because they weren't paying attention — but because the dashboard treated a blood pressure spike exactly the same as a routine weight measurement. Everything looked equally important, so nothing felt urgent.

## problem-body
The legacy dashboard had grown organically over 5 years, with new data fields added as they were requested — with no information architecture review. By the time I joined the project, the main screen had 43 data fields, 6 action buttons, and 4 navigation tabs, all presented in the same visual weight. Nurses were spending 8–12 minutes per patient review, and clinical managers had flagged two near-miss incidents in the previous quarter attributed to missed alerts on the dashboard.

## problem-pain-1
Critical alerts (dangerously high readings) used the same visual styling as routine data — nurses had to scan every field on every patient card to check for anything urgent, instead of being drawn to it instantly.

## problem-pain-2
The "Add Note" and "Escalate" actions were buried in a dropdown menu — two of the most time-sensitive actions required 4 clicks and a scroll on a 1080p monitor.

## problem-pain-3
The patient list and the patient detail view were on separate screens — nurses had to navigate back and forth constantly, losing context between the list and the individual patient record.

---

## goals-intro
Three goals were defined with clinical managers and signed off before any design work, with direct input from the nursing staff who used the system daily.

## goal-1
Design a visual hierarchy system that makes critical alerts immediately visible without any scanning — a nurse should be able to triage a 10-patient list in under 60 seconds.

## goal-2
Surface the three most-used actions (Add Note, Escalate, Mark Reviewed) as persistent, always-visible controls — removing the need to navigate into dropdowns or secondary screens.

## goal-3
Redesign the layout as a split-panel: patient list on the left, active patient detail on the right — eliminating the back-and-forth navigation between screens.

---

## research-intro
Healthcare UX requires research methods that account for high-stakes, time-pressured environments. I focused on observational methods over self-reported data — what nurses said they did was often different from what I observed in context.

## research-method-1
Contextual Inquiry (5 clinic visits, 2 days each)

## research-method-2
Task Analysis & Workflow Mapping

## research-method-3
Stakeholder Interviews (Clinical Managers, IT Leads)

## research-method-4
Hotjar Session Recording Review (40 sessions)

## research-insight-1
During contextual inquiry, I observed nurses using sticky notes on their monitors as a "priority queue" for patients needing attention — a clear workaround for the lack of visual priority in the dashboard. This became the brief for the alert hierarchy redesign.

## research-insight-2
Task analysis revealed that 78% of nursing time on the dashboard was spent across just 3 workflows: reviewing vitals, adding notes, and escalating to a doctor. The redesign prioritised these three tasks above everything else.

## research-insight-3
Session recordings showed nurses frequently right-clicking to open patient records in a new tab — an unofficial workaround to see the patient list and detail simultaneously. This directly informed the split-panel layout decision.

---

## persona-1-name
Meera Nair

## persona-1-role
Staff Nurse, Outpatient Clinic, 32

## persona-1-quote
"I'm managing 10 patients at once. I don't have time to read every line on every card looking for something urgent — it should jump out at me."

## persona-1-pain
Meera's shift involves constant context-switching. She needs to process status changes across all her patients in the shortest time possible. The current dashboard forces her to review every field on every card — with no quick way to identify who needs attention first.

## persona-2-name
Dr. Vikram Rao

## persona-2-role
Clinic Coordinator, 45

## persona-2-quote
"By the time I get an escalation, I need the full patient history in front of me immediately. I shouldn't have to click through three screens to get context."

## persona-2-pain
Dr. Rao receives escalated cases from nurses and needs to review patient history quickly before making a clinical decision. The current system requires him to navigate across multiple screens to assemble a complete patient picture — wasting critical minutes.

---

## wireframes-caption
Low-fidelity wireframes exploring the split-panel layout: patient list left, patient detail right, with a persistent alert tray at the top. Three alert severity levels were explored — critical (red), warning (amber), and routine (default) — tested in greyscale to ensure contrast wasn't load-bearing.

## screens-caption
Final screens designed for 1920×1080 desktop resolution with WCAG 2.1 AA contrast compliance. Delivered with a component library covering all data states: normal, warning, critical, loading, and empty.

---

## results-metric-1-value
−38%

## results-metric-1-label
Average patient review time (12 min → 7.4 min)

## results-metric-2-value
−82%

## results-metric-2-label
Critical alert miss-rate in post-launch usability testing

## results-metric-3-value
0

## results-metric-3-label
Escalation-related near-miss incidents in 6 months post-launch

## results-body
The redesigned dashboard launched across 14 pilot clinics before rolling out to the full network. The split-panel layout alone reduced the average patient review session by 38% — nurses no longer navigated between screens, cutting context-switching entirely. The tiered alert system (critical, warning, routine) was validated in usability testing with 8 nurses: in 60-patient triage scenarios, miss-rate dropped from 23% to 4%. In the 6 months after launch, no escalation-related near-miss incidents were attributed to the dashboard.

---

## reflections-body
This was the most consequential project I've worked on — the stakes of getting it wrong were genuinely high. That raised the standard for every research and design decision in a way I haven't experienced in other domains.

The biggest lesson was the value of direct observation in context. Reading session recordings told me *where* problems occurred; sitting with nurses in the clinic told me *why*. The sticky-note discovery — nurses building their own triage system on top of the dashboard — wouldn't have appeared in any survey or analytics report.

I also learned that accessibility in healthcare UX isn't optional. Building WCAG AA compliance into the design from the start, rather than retrofitting it at the end, saved significant rework. Colour alone can never carry critical information in a clinical setting — a lesson that shaped every alert design decision.

---

## next-label
Next Project

## next-title
Flavor Street — Food Discovery App

## next-href
/pages/project/flavor-street.html
