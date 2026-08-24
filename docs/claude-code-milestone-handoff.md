# Claude Code Milestone Handoff: Cuban Missile Crisis Security Council Game

## Purpose

This file is a milestone-based build handoff for Claude Code for a first playable browser prototype of an educational strategy and role-play game focused on the Cuban Missile Crisis through a Model United Nations / Security Council lens.[cite:2] The prototype should prioritize clarity, seriousness, replayability through perspective, and a tight classroom-friendly scope.[cite:2]

## Product summary

Build a browser-based single-scenario educational diplomacy game that lasts about 20 to 25 minutes and allows the player to choose one of three historical figures: Robert Kennedy, Anatoly Dobrynin, or U Thant.[cite:2] The game unfolds over multiple in-game days and combines authored dialogue choices, dossiers, country and actor perspective cards, map-based visualization, incremental diplomatic drafting, branching outcomes, and a final debrief comparing the player's path with historical events.[cite:2]

## Product principles

- Treat the crisis as serious historical subject matter, not entertainment spectacle.[cite:2]
- Keep the interface visually rich but not text heavy.[cite:2]
- Use layered information design: cards, maps, dossier panels, short scene text, and clear consequence indicators.[cite:2]
- Scaffold students from easy choices toward a short culminating writing task.[cite:2]
- Ensure role choice meaningfully changes perspective, tone, and available strategy.[cite:2]
- Preserve MVP discipline: one crisis, one polished scenario, one strong debrief.[cite:2]

## Technical assumptions

The target should be a browser-playable prototype suited to static deployment. The app should be modular enough to expand later into additional crises, but the first pass should focus entirely on the Cuban Missile Crisis.[cite:2]

Suggested stack direction:

- React + Vite.
- Clean component structure.
- Local state only for MVP unless a compelling reason appears.
- Mock JSON data for scenes, characters, dossiers, cards, and outcomes.
- Accessible keyboard-friendly UI.

## Milestone structure

### Milestone 1: App foundation and visual shell

Build the overall application shell and art direction for the game.[cite:2] The goal is not full functionality yet, but a believable and coherent prototype frame.

Deliverables:

- Landing / intro screen.
- Role selection screen for Robert Kennedy, Anatoly Dobrynin, and U Thant.[cite:2]
- Core layout with main scene panel, dossier panel, tracker panel, drafting tray, and top or side navigation.
- Visual design that feels documentary-editorial, not cartoonish.[cite:2]
- Placeholder map panel and placeholder archival media module.
- Light/dark handling only if it does not dilute the tone; otherwise prioritize one polished mode first.

Constraints:

- Do not overbuild logic yet.
- Focus on structure, readability, and tone.
- Avoid generic SaaS/dashboard aesthetics.

### Milestone 2: Scene engine and day progression

Implement the core scenario flow across multiple in-game days.[cite:2] The game should now feel playable in structure even if content is still partly placeholder.

Deliverables:

- Day-based scene engine.
- Support for five main days plus final debrief.[cite:2]
- Scene data structure that can define title, summary, speaker, choices, unlocks, and effects.
- Forward progression between scenes and days.
- Role-sensitive scene variations where possible.
- Short scene summaries that keep text manageable.[cite:2]

Constraints:

- Keep the content concise.
- Prioritize consistency and maintainability of the scene schema.

### Milestone 3: Dialogue choices and consequence tracking

Add the main decision-making layer.[cite:2] This is where the game starts to feel strategic.

Deliverables:

- Authored dialogue choice component.[cite:2]
- Choice effects wired into trackers.
- Trackers for escalation, legitimacy, council trust, diplomatic leverage, and civilian risk.[cite:2]
- Choice history storage for later scene references.
- Relationship or trust modifiers for major actors.
- Visible consequence feedback after major decisions.

Constraints:

- Feedback should feel serious and understated, not gamey.
- Trackers should be legible but not resemble arcade bars if possible.

### Milestone 4: Dossiers and country/actor cards

Build the information layer that supports learning and strategic interpretation.[cite:2]

Deliverables:

- Unlockable dossier system.[cite:2]
- Dossier viewer with portrait, role, priorities, style, red lines, and “why this matters now.”[cite:2]
- Country and actor perspective cards for at least United States, Soviet Union, United Nations, and Cuba.[cite:2]
- Unlock logic tied to scene progression or choice triggers.
- Smooth UI for consulting dossiers without losing scene context.

Constraints:

- Keep entries concise and visually scannable.
- Use real historical framing where possible; only limited fictionalization for aides and witnesses.[cite:2]

### Milestone 5: Drafting ladder and culminating writing task

Implement the gradual academic-rigor layer.[cite:2] This milestone is central to the educational value of the prototype.

Deliverables:

- Drafting tray that persists through the scenario.[cite:2]
- Day 1 tone selection.
- Day 2 wording-frame selection.
- Day 3 clause revision or amendment step.
- Day 4 assembly of multiple parts into a short draft.
- Day 5 short original writing box for a 2 to 4 sentence final justification, amendment, or closing statement.[cite:2]
- End-state view showing the built diplomatic draft.

Constraints:

- Keep early drafting low-friction.
- Do not make the game writing-heavy too early.[cite:2]

### Milestone 6: Map, archival media, and consequence visualization

Add the atmospheric and spatial understanding layer.[cite:2] This should increase immersion without overwhelming the prototype.

Deliverables:

- World map module with at least several scenario states.[cite:2]
- Ability to show key zones, routes, or crisis-related markers.
- Space for short archival radio/news snippets with captions and source placeholder.[cite:2]
- Optional scene-triggered audio playback control.
- A sober escalation or nuclear-consequence visualization for high-risk branches or debrief.[cite:2]

Constraints:

- No sensational destruction animation.
- Use restrained motion and educational framing.[cite:2]

### Milestone 7: Debrief and historical comparison

Build the closure and reflection layer.[cite:2] This is essential for making the game pedagogically complete.

Deliverables:

- Debrief screen comparing historical events with the player’s route.[cite:2]
- Summary of key choices and their effects.
- Explanation of where the scenario diverged from history.
- Reflection or discussion prompts for classroom use.
- Clear playthrough summary that a teacher or student can review quickly.

Constraints:

- Keep the debrief calm, clear, and historically grounded.[cite:2]
- Focus on interpretation, not on declaring simplistic win/lose judgments.

### Milestone 8: Polish, accessibility, and MVP packaging

Refine the prototype into something shareable and testable.

Deliverables:

- Accessibility pass on focus states, keyboard navigation, labels, and readability.
- Responsive layout support for laptop and tablet-class use.
- Tone pass to remove anything too playful or trivializing.
- Content cleanup for concise, readable historical text.
- Final seeded or deterministic content flow for consistent classroom testing.
- README-style build notes and project structure cleanup.

Constraints:

- Do not add large new features at this stage.
- Polish the MVP rather than expanding scope.

## Data model suggestions

Use content structures that can expand to future crisis packs later. Useful objects may include:

- roles
- scenes
- days
- choices
- trackerEffects
- dossiers
- actorCards
- mapStates
- archivalClips
- endings
- debriefEntries

## Key content needed for the prototype

The prototype will need:

- Three fully defined playable roles.[cite:2]
- Five main crisis-day scene groups plus debrief.[cite:2]
- Eight to twelve dossiers.[cite:2]
- Four to six actor/country cards.[cite:2]
- Several map states.[cite:2]
- A small pool of authored dialogue choices per scene.[cite:2]
- Several plausible endings driven by tracker combinations and major choices.[cite:2]

## Product guardrails

Do not turn this into a combat game, nation simulator, or generic branching visual novel. The identity of the project is an educational diplomatic crisis simulation with strong scaffolding and serious tone.[cite:2]

Do not add unnecessary systems such as inventory, random loot, combat turns, or exaggerated gamification. The strategic interest should emerge from roles, language, timing, pressure, and consequence.[cite:2]

## Suggested build order

Work milestone by milestone and do not jump ahead to polish before the scenario spine exists. The most important early success conditions are:

1. Strong shell and tone.
2. Stable day-based scene progression.
3. Meaningful dialogue plus consequence loop.
4. Dossiers and cards that make knowledge actionable.
5. Drafting ladder that culminates in short student writing.
6. Debrief that ties simulation back to real history.[cite:2]

## Definition of first playable success

The first playable version is successful if a student can choose a role, move through multiple in-game days, make consequential diplomatic choices, consult unlocked dossiers and cards, build a short diplomatic draft, see a branching ending, and complete a debrief comparing the run to history in one 20 to 25 minute session.[cite:2]
