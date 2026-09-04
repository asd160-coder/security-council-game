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
     The Hiroshima print is the one whose authorship Commons could not give —
     the holding institution's own record supplies it. */
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
    id: 'ov-hiroshima-shadow',
    kind: 'image',
    overture: true,
    file: 'hiroshima-shadow-1945-11-20.jpg',
    title: 'Flash burns on the steps of the Sumitomo Bank, Hiroshima',
    date: '20 November 1945',
    caption: 'A small contact print made by the United States Strategic Bombing Survey: where someone sat on the steps at the moment of the flash, the stone was shielded, and the shape remained.',
    source: 'Unidentified photographer for the United States Government, 20 November 1945 — print held by the International Center of Photography, 2006.1.411',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The price was paid by people who were not consulted. The shadow is the plainest record of that the war left.',
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
    id: 'ov-juno-explorer',
    kind: 'image',
    overture: true,
    file: 'juno-i-explorer-1958-01-31.jpg',
    title: 'Juno I on the pad with Explorer 1, January 1958',
    date: '31 January 1958',
    caption: 'The rocket that carried the first American satellite, hours before launch at Cape Canaveral.',
    source: 'NASA',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'Four months after Sputnik. The rockets that promised the future were the missiles that threatened it, and everyone knew it.',
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
    id: 'ov-jfk-colonnade',
    kind: 'image',
    overture: true,
    file: 'jfk-colonnade-1962-10-29.jpg',
    title: 'The President with his advisers after the Executive Committee, 29 October 1962',
    date: '29 October 1962',
    caption: 'Kennedy on the West Wing Colonnade with McGeorge Bundy, Paul Nitze, General Maxwell Taylor and Robert McNamara, the morning after the answer came.',
    source: 'Cecil Stoughton, White House Photographs — John F. Kennedy Presidential Library, ST-A26-13-62',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'The chairman of the Joint Chiefs and the Secretary of Defense, in the same frame as the man who had overruled the advice to strike.',
  },
  {
    id: 'ov-duck-and-cover',
    kind: 'image',
    overture: true,
    file: 'duck-and-cover-1951.jpg',
    title: 'Bert the Turtle, from Duck and Cover, 1951',
    date: '1951',
    caption: 'The cartoon that opens the civil-defence film shown to American schoolchildren: a monkey dangles a lit firecracker over Bert, who ducks into his shell.',
    source: 'Federal Civil Defense Administration — Library of Congress, mbrs01836081',
    rights: 'Public domain — work of the US federal government',
    whyItMatters: 'How a generation of children was taught to think about the bomb: as something you could duck.',
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