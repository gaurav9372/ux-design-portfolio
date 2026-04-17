# EduSpark — Case Study Content
Edit this file to update the EduSpark case study page. Save and refresh to see changes.

---

## hero-eyebrow
UX Case Study

## hero-title
EduSpark

## hero-tagline
Taking course completion rates from 18% to 61% by redesigning the learning experience around how working professionals actually find time to study.

## meta-role
UX Designer

## meta-duration
10 weeks

## meta-team
3 people

## meta-tools
Figma, Maze, FigJam

## meta-platform
Web & Mobile

---

## overview-summary
EduSpark is an edtech platform offering short-form professional development courses for working adults — UX design, product management, data analytics, and similar tracks. Despite a library of 200+ courses and strong enrolment numbers, course completion rates sat at 18%. Most users dropped off after the second lesson. I led a full redesign of the course player, learner dashboard, and progress system to understand and fix this retention collapse.

## overview-contribution
I led user research, experience design, and information architecture for the project. I worked alongside a product manager who owned the stakeholder relationship and a developer who joined for the handoff sprint. The visual system was refined in collaboration with EduSpark's in-house designer in the final week.

## metric-1-value
+61%

## metric-1-label
Course completion rate (up from 18%)

## metric-2-value
−38%

## metric-2-label
Mid-course abandonment rate

## metric-3-value
+29%

## metric-3-label
Daily active users (measured 8 weeks post-launch)

---

## problem-heading
The Problem

## problem-statement
Users weren't abandoning EduSpark because the content was bad — they were abandoning it because the product made it too easy to put off studying until tomorrow, and "tomorrow" never came.

## problem-body
The course player presented all lessons at once with no structure around time commitment. A user enrolling in a 24-lesson course had no sense of how long each lesson would take, no weekly target, and no visible streak or progress milestone to work toward. The dashboard showed all enrolled courses simultaneously, with no prioritisation — a user with 4 in-progress courses had no guidance on what to open next. Every session started with a decision instead of continuing where they'd left off.

## problem-pain-1
The course player had no indication of lesson length — users started lessons without knowing if they had 5 minutes or 25 minutes free, and abandoned mid-lesson when time ran out rather than reaching a natural stopping point.

## problem-pain-2
Progress was tracked as a percentage of videos watched, not lessons completed — watching 30 seconds of a 10-minute video counted as "progress." This made the progress bar meaningless and stopped it from functioning as a motivator.

## problem-pain-3
There was no "resume" experience — every time a user opened the app, they landed on the dashboard with all their courses showing. Finding where they'd left off required navigating into each course individually.

---

## goals-intro
Three design goals were set after research, each targeting a specific failure point in the learning habit loop.

## goal-1
Redesign the course player to show lesson duration upfront and introduce natural stopping points — so users can make an informed decision about starting a lesson rather than abandoning mid-way.

## goal-2
Build a "continue learning" landing experience that brings users directly back to their last lesson within 2 seconds of opening the app — eliminating the dashboard-first decision every session.

## goal-3
Redesign progress tracking around lesson completion and weekly streaks rather than video watch percentage — giving users a motivating metric that reflects real learning effort.

---

## research-intro
I combined quantitative funnel analysis with qualitative user interviews to understand both where users dropped off and the mental models around self-directed learning that shaped their behaviour.

## research-method-1
Funnel Drop-off Analysis (Mixpanel)

## research-method-2
User Interviews (14 participants, current and churned users)

## research-method-3
Maze Usability Testing (existing course player)

## research-method-4
Benchmarking (Coursera, Skillshare, Duolingo, LinkedIn Learning)

## research-insight-1
Funnel analysis showed that 62% of drop-offs occurred between lesson 2 and lesson 3 — not at the beginning. This suggested users were initially motivated but lost momentum at the first friction point after the novelty wore off. The "lesson 2 cliff" became the primary focus of the redesign.

## research-insight-2
User interviews revealed a consistent mental model: users treated online courses like gym memberships — they enrolled with good intentions and then felt guilty when they didn't use them, which made them avoid the app because it reminded them of something they were failing at. The design needed to reduce guilt and lower the bar for re-engagement.

## research-insight-3
Duolingo's streak mechanic was mentioned unprompted by 7 of 14 interview participants as "the thing that makes me actually open the app." This directly informed the weekly streak system in the redesign — adapted to a professional learning context where daily usage isn't always realistic.

---

## persona-1-name
Priyanka Joshi

## persona-1-role
Product Manager, 30

## persona-1-quote
"I enrol in courses with the best intentions. Then work gets busy and I open the app three weeks later feeling too behind to start again."

## persona-1-pain
Priyanka is highly motivated to upskill but has an unpredictable work schedule. She studies in short windows — 15–20 minutes on a commute or before bed. She needs a product that works around her schedule rather than demanding consistent long sessions. The gap between enrolling and completing feels insurmountable, so she often abandons rather than resuming.

## persona-2-name
Sameer Bhat

## persona-2-role
Graphic Designer (transitioning to UX), 26

## persona-2-quote
"I'm paying for this course but I've watched 4 lessons out of 32. I keep opening it, feeling overwhelmed by how much is left, and closing it again."

## persona-2-pain
Sameer is motivated by a career goal — he wants to transition into UX design. But the volume of content is paralyzing. Seeing a 32-lesson course with 8 hours of video makes him feel like he can't make meaningful progress in a short session, so he doesn't start at all. He needs the product to break the course into manageable, time-bounded chunks.

---

## wireframes-caption
Wireframes exploring three concepts for the "continue learning" landing screen — card-based (showing the last lesson with a resume CTA), list-based (recent courses prioritised), and full-screen (one course takes the entire screen with a single action). Card-based tested highest in Maze across 48 participants.

## screens-caption
Final screens for web and iOS delivered in Figma with a complete component library, including the redesigned course player, streak system, lesson card, and progress visualisation. Responsive layouts for tablet and mobile included.

---

## results-metric-1-value
61%

## results-metric-1-label
Course completion rate (up from 18%), measured at 8 weeks

## results-metric-2-value
−38%

## results-metric-2-label
Mid-course abandonment between lessons 2 and 3

## results-metric-3-value
+29%

## results-metric-3-label
Daily active users 8 weeks after launch

## results-body
The redesigned experience launched to all users in a single release. Within 8 weeks, course completion had risen from 18% to 61% — a 3.4x improvement. The "continue learning" landing experience was the highest-impact single change: session start time (from opening app to beginning a lesson) dropped from an average of 2.5 minutes to 18 seconds, because users no longer had to navigate to find where they'd left off. The weekly streak feature had an 84% opt-in rate among users who saw it on their second session.

---

---

## work-process
I took a participatory design approach — involving both teachers and students throughout the process. Education products fail when they are designed for one group without understanding the other, so every major decision was validated with both audiences.

## work-research
I conducted 10 interviews with teachers and 8 with students (ages 14-18), observed 4 classroom sessions to understand how digital tools fit into existing workflows, and reviewed 5 competing edtech platforms. The key insight: teachers needed less content creation work, and students needed clearer progress signals to stay motivated.

## work-ideation
I mapped the learning journey from both teacher and student perspectives and found 5 friction points where the two experiences needed to connect better. I prototyped a shared progress dashboard, a simplified assignment builder, and a gamified learning path. Testing showed the progress dashboard was the most impactful feature for both groups.

## work-solutions
The platform featured a drag-and-drop assignment builder for teachers (reducing creation time from 20 minutes to 5), a student dashboard with visual progress tracking and streak counters, and a shared view where teachers could see class-wide understanding gaps in real time. I also designed an adaptive quiz system that adjusted difficulty based on student performance.

---


---

## ds-color-1
#7C4DFF

## ds-color-1-name
Learning Purple

## ds-color-1-hex
#7C4DFF

## ds-color-2
#FF6D00

## ds-color-2-name
Energy Orange

## ds-color-2-hex
#FF6D00

## ds-color-3
#40C4FF

## ds-color-3-name
Sky Blue

## ds-color-3-hex
#40C4FF

## ds-color-4
#FFF8E1

## ds-color-4-name
Soft Cream

## ds-color-4-hex
#FFF8E1

## ds-color-5
#37474F

## ds-color-5-name
Dark Graphite

## ds-color-5-hex
#37474F

## ds-font-1
Outfit

## ds-font-1-preview
Aa Bb Cc 123

## ds-font-1-name
Outfit — Headings & Display

## ds-font-2
Manrope

## ds-font-2-preview
Aa Bb Cc 123

## ds-font-2-name
Manrope — Body & Interface

---

## reflections-body
The most important research finding in this project didn't come from the funnel data — it came from the guilt pattern in user interviews. Realising that users were avoiding the app because it reminded them of their failure changed the entire emotional brief for the product. The goal shifted from "how do we make learning more efficient" to "how do we make it feel safe to come back after a gap." That's a very different design problem.

The Duolingo benchmark was also a productive discussion. The team was initially resistant to streak mechanics — "we're a professional learning platform, not a game." But the interview data made it clear that the underlying psychology was the same regardless of content category. Adapting the mechanic (weekly rather than daily, with "streak shields" for busy periods) addressed the concern while preserving the motivational effect.

One thing I'd change: I'd advocate for a longer testing period before launch. 8 weeks of post-launch data is good, but course completion is a lagging metric — some users take 3–4 months to finish. The 61% figure is likely to change as we track longer cohorts, and I'd want that longer-term data before drawing firm conclusions.

---

## next-label
Next Project

## next-title
Care Naturals — Skincare Redesign

## next-href
/pages/project/care-naturals.html
