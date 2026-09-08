/* What the person in your chair actually did.

   The debrief could say, in detail, what the student decided, and could say
   nothing whatever about what happened. The whole game was a rich "before" —
   the background tab's road from 1961 — a simulated middle, and no "after".
   This is the after, attached to the five decision points the run already
   quotes back, so the comparison sits beside the choice rather than in a
   separate essay the student has to hold five decisions in their head to read.

   TWO RULES, both easy to break here.

   The first is that this never becomes marking. The debrief refuses to score,
   and a historical comparison is the most natural place in the whole game to
   smuggle a score back in. So nothing below says the student was closer to or
   further from the record, and nothing implies the historical choice was the
   correct one. Several of these decisions were bad. Kennedy's own later view
   of the air-strike advice he received was that it would have started a war
   nobody could have stopped, and the men giving it were serious people. What
   the record offers a student is not a right answer but a second data point.

   The second is that this is per seat. Robert Kennedy, Anatoly Dobrynin and
   U Thant were in the same week and not in the same crisis: one was in the
   room where it was decided, one was representing a government that would not
   tell him its position, and one had no power to compel anybody and was trying
   to buy days. A single shared account would mean a student who played U Thant
   reading mostly about Kennedy, which answers "what happened" but not "how did
   what I did compare".

   PRESENTATION. Folded under each day by default, and opened by a click. A
   full playthrough measured the debrief at roughly 2,300 words — 43% of
   everything a student reads, arriving last, after half an hour of play —
   and these five blocks were five hundred of them. A tired student skims
   exactly the part meant to cement the learning. A disclosure keeps each one
   beside the decision it compares against without putting it in the way,
   and nothing is removed.

   SOURCING. This is factual prose, written here, summarising documented
   events — not reproduction of anyone's text, so it carries no rights line.
   Each entry names where it comes from so a teacher can check it, which is the
   same courtesy the archive's `whyItMatters` and the epigraphs' `provenance`
   already extend. Where the record is contested or thin, the entry says so
   rather than flattening it. */

/* Sources named more than once, so the strings stay identical. */
const THIRTEEN = 'Robert Kennedy, Thirteen Days (1969)';
const TAPES = 'The ExComm tapes, transcribed in May and Zelikow, The Kennedy Tapes (1997)';
const DOBRYNIN_CABLE = "Dobrynin's cable to the Soviet foreign ministry, 27 October 1962";
const UN_RECORD = 'UN Security Council official records, October 1962';

/* HISTORY[roleId][dayNumber] = { did, then, source }

   `did` is what the person actually did at this decision point. `then` is what
   followed from it — the part that makes it teach rather than merely inform. */
export const HISTORY = {
  rfk: {
    1: {
      did: 'He spent the first day arguing against the thing almost everyone else in the room wanted. The initial ExComm consensus was an air strike on the missile sites; Robert Kennedy was among the few pressing the objection that a surprise attack on a small country was not something the United States could afterwards explain.',
      then: 'The argument held for six days, and it had to be won again every morning as the sites came closer to operational. The blockade was not chosen once. It was chosen repeatedly, against advice that grew more reasonable each day.',
      source: `${TAPES}; ${THIRTEEN}`,
    },
    2: {
      did: 'With the quarantine announced, he became the channel. The public position was delivered by his brother on television; the private one ran through Robert Kennedy, and through journalists and intelligence officers whose authority to speak for anyone was deliberately unclear.',
      then: 'Ambiguity about who spoke for whom was the point — it let both governments try positions without owning them. It is also why the record of that week is still argued over, and why several participants gave incompatible accounts afterwards.',
      source: THIRTEEN,
    },
    3: {
      did: 'He was not at the Security Council for the famous confrontation — Adlai Stevenson handled that — and spent the day on the pressure inside his own government instead. The military case for striking before the sites went live was getting stronger, not weaker.',
      then: 'The first Soviet ships turned back that morning, which relieved nothing: the ships were never the danger. The missiles already in Cuba were, and they were still being assembled.',
      source: `${TAPES}; ${UN_RECORD}`,
    },
    4: {
      did: 'On the evening of Saturday 27 October he met Dobrynin and gave an assurance that the Jupiter missiles would come out of Turkey — while stating plainly that it was not part of any agreement and that the United States would deny it if it were made public. Earlier that day a U-2 had been shot down over Cuba and Major Rudolf Anderson killed.',
      then: 'The assurance was honoured and stayed secret for decades, which let Washington claim an unreciprocated Soviet withdrawal. It is the single most consequential thing anyone in your chair did that week, and it worked partly because it was deniable.',
      source: `${DOBRYNIN_CABLE}; ${THIRTEEN}`,
    },
    5: {
      did: 'He did nothing decisive. The answer came from Moscow on the morning of the 28th, broadcast on Radio Moscow rather than delivered through any channel, and the people who had spent the week managing the crisis learned it had ended from the radio.',
      then: 'He wrote afterwards that the hardest part had been that at no point was anyone certain of anything. The account he left, published posthumously, is the version most people know — and it is a memoir by a participant, which is not the same as a record.',
      source: THIRTEEN,
    },
  },

  dobrynin: {
    1: {
      did: 'He did not know. The Soviet ambassador in Washington had not been told that missiles were being placed in Cuba, and spent the first days giving American officials assurances he believed were true.',
      then: 'When the photographs became public, those assurances read as lies. His government had spent his personal credibility without telling him, before the crisis properly began — and credibility was the tool he most needed in the week that followed.',
      source: 'Anatoly Dobrynin, In Confidence (1995)',
    },
    2: {
      did: 'He kept talking. With the quarantine in force and his position publicly undermined, he maintained the private contacts — including with Robert Kennedy — that the formal diplomatic channel could not carry.',
      then: 'The back channel worked because it was not the record. Neither government had to defend anything said in it, which is precisely what made it useful and what makes the history of that week so hard to establish.',
      source: 'Dobrynin, In Confidence (1995)',
    },
    3: {
      did: 'He watched his government humiliated in public. At the Security Council, Stevenson pressed Valerian Zorin on whether the missiles existed and produced the photographs when Zorin would not answer — a scene that played on television around the world.',
      then: 'Zorin had also not been told. Two Soviet diplomats were defending a position their own capital had concealed from them, in front of cameras. The scene is remembered as an American triumph; it is at least as good an illustration of what secrecy does to the people asked to speak for you.',
      source: UN_RECORD,
    },
    4: {
      did: 'He received Robert Kennedy on the evening of the 27th, was given the Turkey assurance and the condition that it remain unacknowledged, and cabled Moscow the same night. His cable is one of the closest things the record has to a transcript of that conversation.',
      then: 'He was believed, and he was right. It is the moment his week turned: an ambassador with no instructions and no credibility left was the person who carried the thing that ended it.',
      source: DOBRYNIN_CABLE,
    },
    5: {
      did: 'He learned of the acceptance as everyone else did. Khrushchev broadcast the answer on Radio Moscow rather than sending it through the embassy, because a broadcast was faster than a cable and the delay of a few hours was judged too dangerous.',
      then: 'The speed was the message. A government that puts its answer on the radio rather than through its own ambassador is saying it does not trust the time its own diplomacy takes — and by 28 October that was a reasonable thing to think.',
      source: 'Radio Moscow broadcast, 28 October 1962; Dobrynin, In Confidence (1995)',
    },
  },

  uthant: {
    1: {
      did: 'He knew nothing of it. U Thant had been Acting Secretary-General for less than a year, following Dag Hammarskjöld’s death, and the discovery was held in Washington for six days. The United Nations learned when the world did.',
      then: 'That is the structural position of the office rather than a failure of it. The Secretariat is told after the powers have decided what they are willing to say, which sets a limit on what it can ever do early.',
      source: 'UN Secretariat records; ' + UN_RECORD,
    },
    2: {
      did: 'He proposed a pause. With the quarantine in force, U Thant appealed to both governments to suspend arms shipments and the quarantine for two to three weeks to allow talks — and was criticised in Washington for treating the two sides as equivalent.',
      then: 'Khrushchev accepted; Kennedy did not. But the appeal gave Khrushchev a public reason to turn the ships around without it reading as retreat, which is the kind of thing the office can do and armies cannot.',
      source: 'U Thant’s appeals of 24 October 1962; ' + UN_RECORD,
    },
    3: {
      did: 'He worked while the confrontation played. On the day Stevenson and Zorin faced each other at the Security Council, U Thant’s appeal was quietly producing its effect: Soviet ships stopped short of the line rather than testing it.',
      then: 'The visible event was the argument. The consequential one was the ships turning, which nobody televised. A great deal of what the Secretariat achieves takes the form of something not happening.',
      source: UN_RECORD,
    },
    4: {
      did: 'He was asked to guarantee something he had no power to guarantee. As the terms took shape, the proposed settlement assumed UN verification of the removal of the missiles — inspection inside Cuba, which required Cuban consent.',
      then: 'Castro refused. U Thant flew to Havana at the end of October and could not obtain it; verification was ultimately done by American aerial photography and by Soviet ships uncovering their cargo at sea. The settlement was reached over Cuba’s head, and Cuba declined the one part that needed it.',
      source: 'U Thant’s Havana mission, 30–31 October 1962; ' + UN_RECORD,
    },
    5: {
      did: 'He received both governments’ thanks and no further authority. Kennedy and Khrushchev both credited the United Nations in their public messages of 28 October; neither proposed any continuing role for it.',
      then: 'Being thanked is what the office gets instead of power. Whether the mediation shortened the crisis is genuinely arguable — the decisive exchange was bilateral and secret — and that argument is the honest one to have about the position you held.',
      source: 'Exchange of messages, 28 October 1962; ' + UN_RECORD,
    },
  },
};

/* What followed, after the week ended. The same for every seat, because this
   part is not about the office — it is what the settlement turned out to have
   cost and bought, and several of the costs did not fall on the people who
   agreed to them. */
export const AFTERWARDS = {
  title: 'What followed',
  body: [
    'The Jupiter missiles came out of Turkey in April 1963, five months later, described publicly as obsolete and replaced by submarines already on station. The connection to Cuba was denied at the time and stayed denied for decades. That secrecy had a price the participants did not pay: it left a public record in which firmness alone had worked, and no visible evidence that the crisis was ended by a concession.',
    'The two governments installed a direct teletype link in June 1963 — the "hotline" — because the week had shown that the fastest available channel between them had been a radio broadcast. In August they signed the Partial Test Ban Treaty, the first arms-control agreement of the Cold War.',
    'Cuba was not consulted about the removal of the weapons on its territory, and Castro learned of the settlement from the radio. He was, by every account, furious. The relationship between Havana and Moscow did not recover its earlier warmth, and the Soviet Union spent years repairing it.',
    'Khrushchev was removed from power in October 1964. The handling of Cuba was among the charges laid against him by the colleagues who removed him — that he had gambled and then retreated. He wrote afterwards that the point had never been to fight, and that the missiles had been withdrawn because the objective, keeping Cuba, had been achieved.',
  ],
  note: 'This is a summary written for this simulation, not a source. It is here so the week has an ending, and so the parts of the settlement that were kept secret are visible — a class reading only the public record of 1962 would conclude something different from what the participants knew.',
};

export const historyFor = (roleId, dayNumber) => HISTORY[roleId]?.[dayNumber] ?? null;
