/* Archival media slots.

   Every item here is DECLARED before it exists. The app renders a designed
   empty state when `file` is absent, so the slice is fully playable with an
   empty public/archive directory — and gains its photographs and audio by
   dropping files in, with no code change.

   Rules this project holds itself to, because the game is intended for public
   deployment:

   - Only material that is verifiably public domain. In practice that means US
     federal works: CIA/NPIC reconnaissance frames, White House photography,
     and the President's own broadcast address, via NARA and the JFK Library.
   - Period commercial radio and television news (CBS, NBC, ABC) remains under
     copyright and is not used, however atmospheric it would be.
   - `source` and `rights` render visibly wherever the item renders. They are
     not optional metadata; they are part of the design.
   - `whyItMatters` is required. The design packet asks that every clip be
     followed by one sentence explaining its relevance, and a caption that only
     describes the picture does not do that job.

   PROVENANCE, NOT CUSTODY. A `.gov` URL says who is hosting a document, not
   who wrote it. Every rights determination here turns on authorship. Several
   of the most important documents of the crisis sit on history.state.gov and
   are nonetheless unusable: Khrushchev's letters of 26, 27 and 28 October are
   Soviet works, and the English text the Department of State prints is a
   translation — a translation being a federal work does not clear the work
   underneath it. Excluded on the same principle: the UN verbatim record of
   the Stevenson–Zorin exchange (a United Nations document), the Scali
   memorandum (written by an ABC correspondent, not a federal employee),
   Castro's letter, and the OAS resolution — though the recitals in
   Proclamation 3504 that summarise the OAS vote are federal and usable.

   The consequence is a real one and the game says so on the credits panel
   rather than letting it pass: this archive can hold a rights-clean
   negotiation arc across 22-28 October in which the Soviet side appears only
   as what American documents say it said. */

export const ARCHIVE = [
  {
    id: 'u2-mrbm-launch-site',
    kind: 'image',
    file: 'u2-mrbm-launch-site-1962-10-15.jpg',
    title: 'MRBM launch site, San Diego de los Baños',
    date: 'Readout board dated 15 October 1962',
    caption:
      'U-2 photography of western Cuba, marked up by photo interpreters: eight missile trailers, four probable erector/launcher units, tent areas and construction.',
    source: 'CIA / National Photographic Interpretation Center',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'This is the evidence itself. Every decision that follows rests on an image most of the world had not yet seen.',
  },
  {
    id: 'npic-briefing-board',
    kind: 'image',
    file: 'npic-briefing-board-1962-10-15.jpg',
    title: 'Military encampment, Los Palacios',
    date: 'Readout board dated 15 October 1962',
    caption:
      'A second readout board from the same coverage, annotating a convoy, six missile trailers, equipment and tents. Reference NPIC G-6731.',
    source: 'CIA / National Photographic Interpretation Center',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The board is where a photograph became an argument. Someone had to decide what the shapes on the film meant, and then persuade a president of it.',
  },
  {
    id: 'ss4-reference',
    kind: 'image',
    /* Also the overture's shot for "under threat from nuclear arsenals". */
    overture: true,
    file: 'ss4-reference-red-square.jpg',
    title: 'SS-4 medium-range ballistic missile, Moscow parade',
    date: 'Reference photograph, early 1960s',
    caption:
      'A Soviet SS-4 on its transporter in Red Square. Photographs like this gave interpreters the measurements they compared against the shapes in the Cuban imagery.',
    source: 'CIA reference photography',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'Identification was comparison. The missiles were recognised in Cuba because the Soviet Union had already paraded them through its own capital.',
  },
  {
    id: 'excomm-cabinet-room',
    kind: 'image',
    file: 'excomm-cabinet-room-1962-10.jpg',
    title: 'Executive Committee meeting, Cabinet Room',
    date: 'October 1962',
    caption:
      'The Executive Committee in session at the White House. Robert Kennedy stands at the left of the frame; the Vice-President sits at the table. The room in which every option was argued, repeatedly, by people who disagreed.',
    source: 'Cecil Stoughton, White House Photographs, John F. Kennedy Presidential Library',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The crisis was argued in a room this size. The people in it disagreed sharply, and the record of their disagreement survives.',
  },
  {
    /* The one moving image in the game, and the only place U Thant's seat is
       shown paying off. Universal Newsreel is public domain on the second of
       this project's two bases — MCA/Universal deeded the collection and its
       rights to the US Government in 1974 — which is the same mechanism as the
       U.S. News & World Report photographs, not federal authorship. The
       De Gaulle item that follows in the original reel is cut. */
    id: 'un-crisis-eases',
    kind: 'video',
    file: 'un-crisis-eases-1962-10-29.mp4',
    title: 'Crisis eases: Kuznetsov arrives at the United Nations',
    date: '29 October 1962',
    caption:
      'A newsreel item filmed the day after the terms were accepted. The Secretariat building, the Soviet deputy foreign minister arriving through a scrum of press, and U Thant receiving him. Forty-seven seconds, cut from a reel whose second half is a French referendum.',
    source: 'Universal Newsreel, 29 October 1962 — National Archives, via the Internet Archive',
    rights: 'Public domain — rights deeded to the US Government by MCA/Universal, 1974',
    whyItMatters:
      'The office with no army and no veto, receiving the government that had to climb down. Whatever the two capitals settled between themselves, this is the room they used to be seen doing it in.',
  },
  {
    id: 'jfk-address',
    kind: 'audio',
    file: 'jfk-address-1962-10-22.m4a',
    title: 'Radio and television address to the nation',
    date: '22 October 1962',
    caption:
      'An excerpt from the address in which the President sets out what has been found in Cuba, what these weapons can reach, and why a build-up conducted in secret is treated differently from one conducted openly. Two minutes fifty-four seconds of a seventeen-minute broadcast.',
    source: 'John F. Kennedy Presidential Library and Museum, JFKWHA-142-001',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The moment the crisis stopped being secret. Public knowledge narrowed what either government could quietly agree to.',
  },
  {
    id: 'p2-neptune',
    kind: 'image',
    file: 'p2-neptune-okhotsk-1962-10.jpg',
    title: 'Patrol aircraft over the Okhotsk',
    date: 'October 1962',
    caption:
      'A US Navy P-2 Neptune of squadron VP-18 passing low over the Soviet freighter Okhotsk, her deck cargo in plain view. The quarantine was enforced largely by being seen to be enforced.',
    source: 'US Navy, Naval History and Heritage Command',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'This is what the line actually looked like: an aircraft, a ship, and two governments watching to see what the other would do about it.',
  },
  {
    id: 'ship-departing',
    kind: 'image',
    file: 'soviet-ship-departing-1962-11.jpg',
    title: 'Soviet freighter leaving Cuba, deck cargo uncovered',
    date: 'November 1962',
    caption:
      'A departing freighter photographed from directly above, her crated cargo left uncovered on deck so that it could be counted from the air. Verification, conducted by consent and without anyone having to say so.',
    source: 'US Navy, Naval History and Heritage Command',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The settlement held because both sides arranged to let the other watch it being kept. That is what a verified withdrawal looked like in practice.',
  },

  /* ---------------------------------------------------------- Documents.

     Primary source TEXT, which this archive had none of until now. It belongs
     on the paper register: these are 1962 documents, not the present
     interface reading the crisis, and they render as paper wherever they
     appear.

     Each is excerpted, and says so. A proclamation runs nine hundred words
     and a scene cannot carry that; taking the part that does the arguing and
     marking the cut is ordinary archival practice and more honest than
     silently abridging. Text transcribed from the institutional host named in
     `source`. */
  {
    id: 'nsam-196',
    kind: 'document',
    title: 'National Security Action Memorandum 196',
    date: 'Washington, 22 October 1962',
    caption:
      'The order that created the Executive Committee: who sits in the room, when it meets, and who chairs it.',
    text: [
      'SUBJECT: Establishment of an Executive Committee of the National Security Council',
      'I hereby establish, for the purpose of effective conduct of the operations of the Executive Branch in the current crisis, an Executive Committee of the National Security Council. This committee will meet, until further notice, daily at 10:00 a.m. in the Cabinet Room. I shall act as Chairman of this committee, and its additional regular members will be as follows: the Vice President, the Secretary of State, the Secretary of Defense, the Secretary of the Treasury, the Attorney General, the Director of Central Intelligence, the Under Secretary of State, the Deputy Secretary of Defense, the Chairman of the Joint Chiefs of Staff, the Ambassador-at-Large, the Special Counsel, and the Special Assistant to the President for National Security Affairs.',
      'The first meeting of this committee will be held at the regular hour on Tuesday, October 23rd, at which point further arrangements with respect to its management and operation will be decided.',
      'John Kennedy',
    ],
    source: 'John F. Kennedy Presidential Library, National Security Files',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The room you are about to sit in was created by a memorandum, and it had twelve members and a standing appointment. Committees are not weather; someone decides they exist.',
  },
  {
    id: 'proclamation-3504',
    kind: 'document',
    /* Examining this files it, the same way inspecting the map files the
       geography note. On Day 4 it is what lets you argue the legal ground in
       the negotiation — the one line there that has to be earned. */
    unlocks: 'note-quarantine-law',
    title: 'Proclamation 3504 — Interdiction of the Delivery of Offensive Weapons to Cuba',
    date: 'Washington, 23 October 1962',
    excerpt: true,
    caption:
      'The legal case for the quarantine, built clause by clause. The word doing the work is “quarantine”: a blockade is an act of war.',
    text: [
      'WHEREAS the peace of the world and the security of the United States and of all American States are endangered by reason of the establishment by the Sino-Soviet powers of an offensive military capability in Cuba, including bases for ballistic missiles with a potential range covering most of North and South America;',
      'WHEREAS the Organ of Consultation of the American Republics meeting in Washington on October 23, 1962, recommended that the Member States, in accordance with Articles 6 and 8 of the InterAmerican Treaty of Reciprocal Assistance, take all measures, individually and collectively, including the use of armed force, which they may deem necessary…',
      'NOW, THEREFORE, I, JOHN F. KENNEDY, President of the United States of America, acting under and by virtue of the authority conferred upon me by the Constitution and statutes of the United States, in accordance with the aforementioned resolutions of the United States Congress and of the Organ of Consultation of the American Republics, and to defend the security of the United States, do hereby proclaim that the forces under my command are ordered, beginning at 2:00 P.M. Greenwich time October 24, 1962, to interdict… the delivery of offensive weapons and associated materiel to Cuba.',
      'In carrying out this order, force shall not be used except in case of failure or refusal to comply with directions… or in case of self-defense. In any case, force shall be used only to the extent necessary.',
    ],
    source: 'Proclamation 3504, 77 Stat. 958 — text via the John F. Kennedy Presidential Library',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'Every recital is load-bearing. The quarantine is grounded in a congressional resolution and an OAS vote precisely because a blockade declared alone would have been an act of war.',
  },
  {
    id: 'jfk-reply-27-oct',
    kind: 'document',
    title: 'Telegram: President Kennedy’s reply to Chairman Khrushchev',
    date: 'Washington, 27 October 1962, 8:05 p.m.',
    excerpt: true,
    caption:
      'Two letters had arrived from Moscow saying different things. This answers the one it prefers, and restates its terms as though they were the only ones offered.',
    text: [
      'I have read your letter of October 26th with great care and welcomed the statement of your desire to seek a prompt solution to the problem. The first thing that needs to be done, however, is for work to cease on offensive missile bases in Cuba and for all weapons systems in Cuba capable of offensive use to be rendered inoperable, under effective United Nations arrangements.',
      'As I read your letter, the key elements of your proposals — which seem generally acceptable as I understand them — are as follows:',
      '1) You would agree to remove these weapons systems from Cuba under appropriate United Nations observation and supervision; and undertake, with suitable safeguards, to halt the further introduction of such weapons systems into Cuba.',
      '2) We, on our part, would agree — upon the establishment of adequate arrangements through the United Nations to ensure the carrying out and continuation of these commitments — (a) to remove promptly the quarantine measures now in effect and (b) to give assurances against an invasion of Cuba.',
      '/s/ John F. Kennedy',
    ],
    source: 'Foreign Relations of the United States, 1961–1963, Volume XI, Document 95',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'Read what it answers and then what it does not. The second letter had demanded the Turkish missiles; this reply simply declines to hear that, and calls the first letter “your proposals”.',
  },

  /* ------------------------------------------------- The overture's stills.
     Registered here rather than in a list of their own so the credits panel,
     which maps this array, credits every shot with no second list to keep in
     step. `overture: true` is informational; the day rails only show what a
     briefing names, so none of these leak into play. All are federal works.
     Three that played in earlier cuts — the Hiroshima shadow, the Juno rocket,
     the President with the Chiefs — were removed with the wordless beats in
     Milestone 22; they remain in git history. */
  {
    id: 'ov-truman-berlin',
    kind: 'image',
    overture: true,
    file: 'truman-berlin-1945-07-16.jpg',
    title: 'President Truman in Berlin, 16 July 1945',
    date: '16 July 1945',
    caption: 'Truman, Secretary of State Byrnes and Admiral Leahy in an open car, inspecting the ruins of Hitler’s Chancellery on the way to the Potsdam conference.',
    source: 'US National Archives and Records Administration, 198768 (Harry S. Truman Library)',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The Americans arrived in Berlin for the occupation two months after the Soviets took it. Both armies were in the city; the peace between them lasted about a year.',
  },
  {
    id: 'ov-nagasaki-cloud',
    kind: 'image',
    overture: true,
    file: 'nagasaki-cloud-1945-08-09.jpg',
    title: 'The cloud over Nagasaki, 9 August 1945',
    date: '9 August 1945',
    caption: 'Photographed from one of the B-29s, minutes after the detonation.',
    source: 'Charles Levy, US Army Air Forces — US National Archives and Records Administration',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The second and last use of a nuclear weapon in war. Everything the simulation is about is the effort to keep that number at two.',
  },
  {
    id: 'ov-crossroads-baker',
    kind: 'image',
    overture: true,
    file: 'crossroads-baker-1946-07-25.jpg',
    title: 'Operation Crossroads, test Baker, 25 July 1946',
    date: '25 July 1946',
    caption: 'An underwater detonation at Bikini Atoll lifts a column of water through a fleet of target ships.',
    source: 'US Department of Defense (Army/Navy)',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'Eleven months after Nagasaki the weapons were being tested against ships. The age of warfare the narration names begins here.',
  },
  {
    id: 'ov-shippingport',
    kind: 'image',
    overture: true,
    file: 'shippingport-1956-10-10.jpg',
    title: 'Shippingport Atomic Power Station under construction, 10 October 1956',
    date: '10 October 1956',
    caption: 'The first full-scale civilian nuclear power station in the United States, on the Ohio River, a year before it went critical.',
    source: 'US Nuclear Regulatory Commission',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The promise of the atomic age, in concrete. The same physics on the same decade’s front pages.',
  },
  {
    id: 'ov-checkpoint-charlie',
    kind: 'image',
    overture: true,
    file: 'checkpoint-charlie-1961-10-27.jpg',
    title: 'American and Soviet tanks at Checkpoint Charlie, October 1961',
    date: '27 October 1961',
    caption: 'US M48s face Soviet T-55s across the sector boundary during the sixteen-hour standoff, a year to the day before Black Saturday.',
    source: 'US Army — US Army Heritage and Education Center',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The nearest the two armies came to firing on each other in Europe. It was resolved by a back channel, which is the method this simulation is about.',
  },
  {
    /* A frame of the film, not its cartoon. The first cut used Bert the
       Turtle, the film's opening; the first playthrough asked for the
       children, and the film has them — cut at 186.8 s with
       .design/frame-grab.swift from the Internet Archive's copy. */
    id: 'ov-duck-and-cover-classroom',
    kind: 'image',
    overture: true,
    file: 'duck-and-cover-1951-classroom.jpg',
    title: 'Schoolchildren under their desks, from Duck and Cover, 1951',
    date: '1951',
    caption: 'Two children curled under their desks with their hands over their necks, in the drill the Federal Civil Defense Administration filmed for every American classroom.',
    source: 'Duck and Cover, Federal Civil Defense Administration, 1951 — frame at 186.8 s of the Internet Archive copy, gov.ntis.ava11109vnb1',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'This is what living under the spectre looked like at nine years old, and the government made the film.',
  },

  /* The three seats, photographed. Milestone 20 put real photographs of the
     three men into the overture's closing beats, where the painted portraits
     had been — the record is not silent about these three, so the film shows
     the record. The portraits remain everywhere else, under the rule in
     roles.js. Two of the beats are details cut from a wider frame, and each
     says so. */
  {
    id: 'ov-dobrynin-kennedy',
    kind: 'image',
    overture: true,
    file: 'dobrynin-kennedy-1962-03-30.jpg',
    title: 'Ambassador Dobrynin with President Kennedy in the Oval Office, 30 March 1962',
    date: '30 March 1962',
    caption: 'Dobrynin, a fortnight into his posting, with the President in the rocking chair and the press behind, on the day he presented his credentials.',
    source: 'Robert Knudsen, White House Photographs; John F. Kennedy Presidential Library, KN-C20738',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The channel the endgame ran through began here, in front of photographers, as a courtesy call.',
  },
  {
    id: 'ov-dobrynin',
    kind: 'image',
    overture: true,
    file: 'dobrynin-1962-03-30-crop.jpg',
    title: 'Anatoly Dobrynin, 30 March 1962 (detail)',
    date: '30 March 1962',
    caption: 'A detail of the same photograph, cut to the Ambassador.',
    source: 'Robert Knudsen, White House Photographs; John F. Kennedy Presidential Library, KN-C20738 — detail',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'Forty-three years old, and the only man in Washington who could be sure a message reached Khrushchev unedited.',
  },
  {
    id: 'ov-u-thant-kennedy-stevenson',
    kind: 'image',
    overture: true,
    file: 'u-thant-kennedy-stevenson-1962-01-19.jpg',
    title: 'President Kennedy, U Thant and Adlai Stevenson at the Waldorf-Astoria, New York, 19 January 1962',
    date: '19 January 1962',
    caption: 'The President, the Acting Secretary-General and the American ambassador to the United Nations on a sofa in a hotel suite — the kind of room the crisis would actually be settled in.',
    source: 'Cecil Stoughton, White House Photographs; John F. Kennedy Presidential Library, JFKWHP-1962-01-19-B',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'U Thant had been Acting Secretary-General for eleven weeks, with no army and a standing that depended on rooms like this one.',
  },
  {
    id: 'ov-u-thant',
    kind: 'image',
    overture: true,
    file: 'u-thant-1962-01-19-crop.jpg',
    title: 'U Thant, 19 January 1962 (detail)',
    date: '19 January 1962',
    caption: 'A detail of the same photograph, cut to the Secretary-General.',
    source: 'Cecil Stoughton, White House Photographs; John F. Kennedy Presidential Library, JFKWHP-1962-01-19-B — detail',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The one seat in the game with nothing to threaten and nothing to offer but a way out.',
  },
  {
    id: 'ov-rfk',
    kind: 'image',
    overture: true,
    file: 'rfk-oval-office-1962-02-28-crop.jpg',
    title: 'Attorney General Robert Kennedy in the Oval Office, 28 February 1962 (detail)',
    date: '28 February 1962',
    caption: 'A detail of a photograph of the President hearing his brother’s report on a month’s tour abroad, with the Vice-President and the Secretary of State: the Attorney General, seated, looking towards the President.',
    source: 'Abbie Rowe, White House Photographs; John F. Kennedy Presidential Library, JFKWHP-1962-02-28-D — detail',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The back channel had a face. Thirty-six years old, and the one man in the room the President would believe without a memorandum.',
  },

  /* ------------------------------------------------- The road's stills.
     Milestone 20: a photograph on each beat of the Background tab's road,
     flagged `road: true` — informational, like `overture: true`. The credits
     list them because they are here; the day rails never show them. Not
     every still is a photograph of the event named — one is an Army chart,
     one a satellite frame from the year before — and the captions say so. */
  {
    id: 'road-camp-david',
    kind: 'image',
    road: true,
    file: 'camp-david-1961-04-22.jpg',
    title: 'President Kennedy with General Eisenhower at Camp David, 22 April 1961',
    date: '22 April 1961',
    caption: 'Kennedy and Eisenhower walking from the helicopter at Camp David five days after the Bay of Pigs landing, hats in hand, military aides behind.',
    source: 'Robert Knudsen, White House Photographs; US National Archives and Records Administration, 194198 (John F. Kennedy Library)',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The new president went to the old one to be seen taking advice. The failure was eleven weeks in, and the photograph was part of the apology.',
  },
  {
    id: 'road-vienna',
    kind: 'image',
    road: true,
    file: 'vienna-1961-06-03.jpg',
    title: 'Kennedy and Khrushchev at the Vienna summit, 3 June 1961',
    date: '3 June 1961',
    caption: 'The two men at the American ambassador’s residence in Vienna on the first day of their only meeting.',
    source: 'US Department of State photograph; John F. Kennedy Presidential Library, PX 96-33:12',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'Two days, one reading of each other, and neither revised it before October.',
  },
  {
    id: 'road-potsdamer-platz',
    kind: 'image',
    road: true,
    file: 'potsdamer-platz-1961-11-22.jpg',
    title: 'Border fortifications at Potsdamer Platz, Berlin, 22 November 1961',
    date: '22 November 1961',
    caption: 'Wire, tank traps and the first concrete across Potsdamer Platz, photographed by the US Army’s Berlin Brigade three months after the border closed. The numeral is the Army’s own, from the report the print was made for.',
    source: 'US Army Europe, Berlin Brigade; US National Archives and Records Administration, 6003846',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The confrontation everyone expected to be decisive was frozen instead — and a frozen one can be reached for at any time.',
  },
  {
    id: 'road-corona',
    kind: 'image',
    road: true,
    file: 'corona-mys-shmidta-1960-08-18.jpg',
    title: 'The first CORONA satellite photograph: Mys Shmidta airfield, 18 August 1960',
    date: '18 August 1960',
    caption: 'The first usable frame returned by a CORONA reconnaissance satellite: an airfield on the Soviet Arctic coast, labelled by the analysts who read it. Satellite photography, not the U-2, is what told Washington how few missiles the Soviet Union had.',
    source: 'National Reconnaissance Office',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'A missile gap could only be disproved by counting. This is how the counting was done.',
  },
  {
    id: 'road-jupiter-chart',
    kind: 'image',
    road: true,
    file: 'jupiter-turkey-deployment-chart.jpg',
    title: 'Jupiter deployment chart for Turkey, US Army Missile Command',
    date: 'About 1960; declassified',
    caption: 'Not a photograph: an Army briefing chart for the Turkish deployment, its classification stamps struck through on release. One squadron, fifteen missiles, at Çiğli near Izmir, under an agreement dated 28 October 1959.',
    source: 'US Army Aviation and Missile Command, Jupiter missile history collection',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The other doorstep. The chart names the site the whole crisis would end by quietly emptying.',
  },

];

export const getArchive = (id) => ARCHIVE.find((item) => item.id === id) ?? null;

/* True once a file has actually been placed in public/archive and wired above. */
/* A media item is present when its file has been added; a document is present
   when it has text. Documents are never "awaiting" — they ship in the bundle,
   so the placeholder state simply does not apply to them. */
/* Video is present on the same terms as any other file-backed item. */
export const isPresent = (item) =>
  Boolean(item && (item.kind === 'document' ? item.text?.length : item.file));