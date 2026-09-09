/* For the person running the room.

   Deliberately two things and not four. The README already orients a teacher —
   how long it takes, the three seats, the five days, that there is no score —
   and repeating that here would only give it two places to go stale. What was
   missing is the part that needs the game in front of you: questions tied to a
   specific decision, and a way to read what a student came out with.

   The register is the same as everywhere else on the board: this is the
   present interface talking, not a 1962 document.

   Nothing here marks anything. The game refuses to score and so does this —
   the notes below say what a run reveals and what to ask about it, never
   whether it was any good. A teacher may of course assess the writing against
   whatever criteria the class already uses; that is their judgement to make
   and the game does not pretend to make it for them. */

/* Keyed to the five real decision points — first-response, back-channel,
   pressure, negotiation, final — so a teacher can stop the room on a day and
   have something specific to ask about it.

   `turns` names what the day actually hinges on, in one line, so a teacher
   skimming during a lesson can find the day they want. `weigh` is the part
   that keeps a discussion honest: every one of these questions has more than
   one defensible answer, and it says what a good answer has to account for
   rather than what it should conclude. */
export const DAY_PROMPTS = {
  1: {
    title: 'Discovery',
    dateline: 'Tuesday, 16 October 1962',
    turns: 'Whether to act on the photographs before anyone outside the room knows they exist.',
    questions: [
      'The evidence is certain and the response is not. What does a government owe itself before it decides — and how long can it wait while the sites are still being built?',
      'Kennedy said nothing publicly for six days. What did that silence buy, and what did it cost?',
    ],
    weigh:
      'Any answer has to hold two things at once: that acting early is acting on less, and that acting late is acting against more. Students who say only one of those have not finished the question.',
  },
  2: {
    title: 'Public pressure and private channels',
    dateline: 'Tuesday, 23 October 1962',
    turns: 'Saying one thing on the record and another in a room with no minute taken.',
    questions: [
      'Your seat says one thing in the chamber and something different in private. Is that dishonesty, or is it what makes a settlement possible?',
      'Who is the public position actually for? Name the audience — it is rarely the person you are speaking to.',
    ],
    weigh:
      'This is the day most likely to produce a flatly moral answer. The useful pushback is that the back channels of that week are a large part of why it ended, and that they worked precisely because neither government had to defend what was said in them.',
  },
  3: {
    title: 'Escalation and leverage',
    dateline: 'Thursday, 25 October 1962',
    turns: 'Pressing an advantage while the situation is still moving.',
    questions: [
      'Something reached your desk this morning and cost you something before you spoke. How much of a crisis is actually chosen?',
      'Leverage and danger rose together this week. Can you have the first without the second, and what would that require?',
    ],
    weigh:
      'The indicators make this visible: escalation and civilian risk are separate measures and they move together more often than not. A student who noticed that has found the argument of the whole simulation.',
  },
  4: {
    title: 'Negotiation under pressure',
    dateline: 'Saturday, 27 October 1962',
    turns: 'Agreeing to a course, then facing the room where it has to be carried out.',
    questions: [
      'You went in having agreed to something. Did you do it? If not, what gives a person in your seat the standing to depart from it?',
      'The real assurance about the missiles in Turkey was given privately and denied publicly for decades. Was that a lie, a necessity, or both?',
    ],
    weigh:
      'The strongest discussion here is not about honesty but about accountability: a concession nobody can see cannot be argued with, and it also cannot be blamed on anyone. Both of those are consequences of the same secrecy.',
  },
  5: {
    title: 'The answer',
    dateline: 'Sunday, 28 October 1962',
    turns: 'The last act before an answer arrives that you cannot influence.',
    questions: [
      'Your final act was taken without knowing what the answer would be. What is the right thing to do in the last hour of a crisis you no longer control?',
      'Read your closing paragraph back. Would the person who wrote it on Day 1 recognise the position it takes?',
    ],
    weigh:
      'The closing paragraph is the only text in the game the student wrote themselves, and it is the best evidence of what they actually concluded. It is worth reading aloud before anyone discusses the outcome.',
  },
};

/* One entry per pattern id in PATTERN_RULES (src/lib/debrief.js). The ids and
   the titles the student saw live in PATTERNS (src/data/debrief.js) and are
   not restated here — a teacher and a student should be looking at the same
   words, and two copies of a label is how they stop being the same words.

   `means` translates the pattern into a sentence about the run. `ask` is the
   question to put to that student, and it is a real question rather than a
   prompt with an answer hidden in it. */
export const READING_A_RUN = {
  'trust-for-leverage': {
    means:
      'They were believed, and they arrived at the last day with almost nothing to press with. This is the mediator’s position, and U Thant runs finish here more often than the other two seats.',
    ask: 'Being trusted did not by itself move anybody. What would you have needed, and who would have had to supply it?',
  },
  'leverage-for-trust': {
    means:
      'They finished holding the strongest position in the room and the least benefit of the doubt. Common in Kennedy runs that pressed hard and early.',
    ask: 'You could still act at the end and fewer people took you at your word. Which of those mattered more on the last day, and would you know if you were wrong?',
  },
  'legitimate-but-doubted': {
    means:
      'Their conduct stands up to being described in public, and the people across the table stopped assuming the stated position was the real one. Those are separate assets and this run has one of them.',
    ask: 'Everything you did could be defended publicly. Why do you think it stopped being believed privately?',
  },
  'effective-but-indefensible': {
    means:
      'They got results by means that would not survive being written down. Worth noting without disapproval: a good deal of the real week was conducted this way.',
    ask: 'This worked. Could you have written it into the statement? If not, what does that tell you about how crises actually end?',
  },
  'cooled-and-protected': {
    means:
      'Escalation fell and so did the exposure of people with no part in the crisis. The hardest outcome to notice, because its evidence is a series of things that did not happen.',
    ask: 'Nothing dramatic happened on your watch. How would you persuade someone that this was an achievement rather than an absence?',
  },
  'held-by-danger': {
    means:
      'They finished strong in a situation that stayed hot. The position is real and it is borrowed against nobody miscalculating.',
    ask: 'Your advantage depended on the crisis continuing. What happens to it the moment the crisis ends — and did that shape what you wanted?',
  },
  'risk-carried': {
    means:
      'Whatever else the run achieved, the people who would have borne the consequences were closer to them at the end than the beginning. Those people were consulted at no point, which is historically accurate.',
    ask: 'Who paid for the position you reached, and at what point in the five days did anyone ask them?',
  },
  'quiet-throughout': {
    means:
      'The crisis never ran hot and they never accumulated much with which to shape it. The run to read most carefully, because restraint and absence look identical in the indicators.',
    ask: 'You kept it calm and you changed little. Was that the office you held, or a decision you made? Point to the day where you could tell.',
  },
};

export const TEACHING = {
  eyebrow: 'For teachers',
  title: 'Running it, and reading what comes back',
  standfirst:
    'The overview — how long it takes, what the three seats are, why splitting the room three ways is the strongest use of it — is in the project README. This is the part that needs the game in front of you.',
  promptsLabel: 'Questions, by day',
  promptsNote:
    'Tied to the decision each day actually turns on, so a session can be stopped on a day and still have something specific to talk about. All of these have more than one defensible answer.',
  turnsLabel: 'The day turns on',
  weighLabel: 'What a good answer has to weigh',
  readingLabel: 'Reading a student’s run',
  readingNote:
    'The debrief names up to two of these at the end of a run. They are trades, not scores — none of them is the good one. What follows is what each reveals, and something to ask the student who finished with it.',
  meansLabel: 'What it means',
  askLabel: 'Ask them',
  /* Length, and the two-lesson shape. The README carries the same note; this
     is the copy a teacher sees with the game in front of them. */
  lengthLabel: 'How long it takes',
  lengthNote:
    'A full run is about an hour: some 35 minutes of reading for a fluent reader, more for a slower one, plus the deciding and a paragraph of writing at the end. It sits better across two lessons than one. A run saves itself in the browser after every screen, so a student can stop at the end of any day and resume from the title screen — on the same device and the same browser, because that is where the run lives.',
  copyLabel: 'Collecting the work',
  copyNote:
    'At the end of the debrief there is a Save as PDF button. It produces a short record of the run — the seat, the outcome, the five decisions summarised and quoted, the trade the run made, the closing paragraph they wrote, and their answers to the discussion questions if they wrote any. Nothing is transmitted anywhere: the run lives in the student’s own browser, and they choose whether to hand the file over.',
  back: 'Back to the title',
};
