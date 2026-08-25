import json, io

MAP = json.load(open('mapdata.json'))

# Exact values lifted from src/styles/tokens.css — no rounding.
C = dict(
    board='#12161b', raised='#1b2128', inset='#0d1116',
    line='#2a323b', lineBright='#3a444f',
    stock='#e6e1d6', stockAged='#d8d1c2', stockEdge='#c4bcaa',
    silver='#c3c9d0', muted='#97a0aa', faint='#6f7883', fainter='#4d555f',
    ink='#1a1815', inkMuted='#453f36', inkFaint='#6b6252',
    wax='#b23a2f', waxBright='#d2564a', waxDim='rgba(178,58,47,0.22)',
    brass='#a8853c', brassBright='#c9a355',
    signal='#6f8fa6', signalBright='#8fb0c7',
)
DISPLAY = "'Libre Franklin','Helvetica Neue',Arial,sans-serif"
BODY    = "'Source Serif 4',Georgia,'Times New Roman',serif"
MONO    = "'IBM Plex Mono',ui-monospace,Menlo,monospace"

HELMET = """<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200;300;400;500;600&amp;family=Source+Serif+4:ital,wght@0,300..600;1,300..600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap">
  <style>
    body {{ margin:0; background:{board}; color:{silver}; font-family:{body}; }}
    a {{ color:{brassBright}; }}
    a:hover {{ color:{brass}; }}
  </style>
</helmet>""".format(body=BODY, **C)

SCRIPT = """<script data-dc-script>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>"""

def page(body, w, h):
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
{HELMET}
<div style="width:{w}px; height:{h}px; background:{C['board']}; box-sizing:border-box; padding:28px 32px; display:flex; flex-direction:column; gap:20px; overflow:hidden;">
{body}
</div>
</x-dc>
{SCRIPT}
</body>
</html>
"""

def eyebrow(text, color=None):
    col = color or C['faint']
    return (f'<span style="font-family:{MONO}; font-size:11px; letter-spacing:0.2em; '
            f'text-transform:uppercase; color:{col};">{text}</span>')

def progress(active, total=6):
    segs = []
    for i in range(total):
        if i < active:   bg = C['fainter']
        elif i == active: bg = C['brassBright']
        else:            bg = C['line']
        segs.append(f'<span style="height:2px; flex:1; background:{bg};"></span>')
    return f'<div style="display:flex; gap:4px;">{"".join(segs)}</div>'

def portrait(src, w=132, h=166, opacity=1.0):
    return (f'<img src="{src}" alt="" style="width:{w}px; height:{h}px; object-fit:cover; '
            f'object-position:50% 14%; border:1px solid {C["lineBright"]}; border-radius:2px; '
            f'filter:saturate(0.86) contrast(1.03); opacity:{opacity}; flex-shrink:0;">')

def prose(paras, color=None, size=19):
    col = color or C['muted']
    ps = ''.join(
        f'<p style="margin:0; font-family:{BODY}; font-size:{size}px; line-height:1.68; color:{col};">{p}</p>'
        for p in paras)
    return f'<div style="display:flex; flex-direction:column; gap:14px;">{ps}</div>'

def choice(label, line, opacity=1.0, chosen=False):
    border_l = f'2px solid {C["brass"]}' if chosen else '2px solid transparent'
    bg = '#232b34' if chosen else C['raised']
    return f"""<div style="display:flex; flex-direction:column; gap:8px; padding:16px 18px; background:{bg}; border:1px solid {C['line']}; border-left:{border_l}; border-radius:2px; opacity:{opacity};">
  <span style="font-family:{MONO}; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:{C['brass']};">{label}</span>
  <span style="font-family:{BODY}; font-size:16.5px; line-height:1.55; color:{C['silver']};">{line}</span>
</div>"""

# --- tracker gauge ------------------------------------------------------
def gauge(label, value, delta=None, register='neutral', delta_opacity=1.0):
    needle_col = {'danger': C['waxBright'], 'legitimacy': C['brassBright'], 'neutral': C['signalBright']}[register]
    pos = (value + 8) / 16 * 100
    ticks = ''.join(
        f'<span style="width:1px; height:{13 if i==8 else 5}px; background:{C["lineBright"] if i==8 else C["fainter"]}; opacity:{1 if i==8 else 0.5};"></span>'
        for i in range(17))
    dchip = ''
    if delta is not None:
        dcol = {'danger': C['waxBright'], 'calm': C['signalBright'],
                'legitimacy': C['brassBright'], 'neutral': C['silver']}[
            ('danger' if delta > 0 else 'calm') if register == 'danger'
            else ('legitimacy' if delta > 0 else 'danger') if register == 'legitimacy'
            else 'neutral']
        arrow = '▲' if delta > 0 else '▼'
        sign = '+' if delta > 0 else ''
        dchip = (f'<span style="font-family:{MONO}; font-size:11px; letter-spacing:0.1em; '
                 f'color:{dcol}; margin-left:8px; opacity:{delta_opacity};">{arrow} {sign}{delta}</span>')
    val = f'+{value}' if value > 0 else f'{value}'
    return f"""<div style="padding:13px 0; border-bottom:1px solid {C['line']};">
  <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:9px;">
    <span style="font-family:{MONO}; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:{C['muted']};">{label}</span>
    <span style="font-family:{MONO}; font-size:12.5px; color:{C['silver']};">{val}{dchip}</span>
  </div>
  <div style="position:relative; height:20px;">
    <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between;">{ticks}</div>
    <div style="position:absolute; top:0; bottom:0; left:{pos}%; width:2px; margin-left:-1px; background:{needle_col}; box-shadow:0 0 8px {needle_col}66;"></div>
  </div>
</div>"""

def tracker_column(rows):
    body = ''.join(gauge(*r[:4], **(r[4] if len(r) > 4 else {})) for r in rows)
    return f"""<div style="width:232px; flex-shrink:0; display:flex; flex-direction:column;">
  <div style="padding-bottom:12px; margin-bottom:6px; border-bottom:1px solid {C['line']};">{eyebrow('Crisis indicators')}</div>
  <p style="margin:0 0 14px; font-family:{BODY}; font-size:12px; font-style:italic; color:{C['fainter']};">Movement shows direction, not success.</p>
  {body}
</div>"""

def paper(eyebrow_text, title, paras, so_what=None, w=None):
    width = f'width:{w}px;' if w else ''
    body = ''.join(f'<p style="margin:0 0 10px; font-family:{BODY}; font-size:14.5px; line-height:1.62; color:{C["inkMuted"]};">{p}</p>' for p in paras)
    sw = ''
    if so_what:
        sw = f"""<div style="margin-top:12px; padding-top:12px; border-top:1px solid {C['stockEdge']};">
      <span style="display:block; font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['inkFaint']}; margin-bottom:4px;">What this changes</span>
      <p style="margin:0; font-family:{BODY}; font-size:14.5px; line-height:1.55; color:{C['inkMuted']};">{so_what}</p>
    </div>"""
    return f"""<div style="{width} background:{C['stock']}; border:1px solid {C['stockEdge']}; border-radius:1px; padding:22px 24px; box-shadow:0 1px 0 rgba(255,255,255,0.06), 0 18px 34px -22px rgba(6,9,12,0.55);">
  <span style="display:block; font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['inkFaint']}; margin-bottom:12px;">{eyebrow_text}</span>
  <h3 style="margin:0 0 10px; font-family:{DISPLAY}; font-size:21px; font-weight:600; line-height:1.25; color:{C['ink']};">{title}</h3>
  {body}{sw}
</div>"""

# --- map ----------------------------------------------------------------
def map_svg(frame_name, width, height, rings=True, labels=True, ring_opacity=1.0):
    d = MAP[frame_name]
    f = d['frame']
    land = ''
    for m in d['land']:
        fill = '#333d48' if m['emphasis'] else '#232b34'
        stroke = C['muted'] if m['emphasis'] else '#38424e'
        sw = 1.3 if m['emphasis'] else 1
        land += f'<path d="{m["d"]}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"></path>'
    ringsvg = ''
    if rings:
        for i, r in enumerate(d['rings']):
            fill = C['waxDim'] if i == 0 else 'none'
            ringsvg += (f'<path d="{r["d"]}" fill="{fill}" stroke="{C["wax"]}" stroke-width="1.4" '
                        f'stroke-dasharray="5 4" opacity="{ring_opacity}"></path>')
    grat = ''
    for i in range(9):
        y = f['height'] / 8 * i
        grat += f'<line x1="0" y1="{y}" x2="{f["width"]}" y2="{y}" stroke="{C["line"]}" stroke-width="0.5" opacity="0.45"></line>'
    for i in range(13):
        x = f['width'] / 12 * i
        grat += f'<line x1="{x}" y1="0" x2="{x}" y2="{f["height"]}" stroke="{C["line"]}" stroke-width="0.5" opacity="0.45"></line>'
    marks = ''
    for m in d['markers']:
        x, y = round(m['x'], 1), round(m['y'], 1)
        if m.get('site'):
            marks += (f'<path d="M {x} {y-7} L {x+6} {y+4} L {x-6} {y+4} Z" fill="{C["wax"]}" stroke="{C["waxBright"]}" stroke-width="1"></path>')
        else:
            marks += f'<circle cx="{x}" cy="{y}" r="3.5" fill="{C["muted"]}" stroke="{C["inset"]}" stroke-width="1.5"></circle>'
        if labels:
            col = C['waxBright'] if m.get('site') else C['muted']
            dx = 12 if m.get('site') else 9
            marks += (f'<text x="{x+dx}" y="{y-(1 if m.get("sub") else 3)}" fill="{col}" '
                      f'font-family="{MONO}" font-size="13" letter-spacing="1.3" style="text-transform:uppercase;">{m["label"].upper()}</text>')
            if m.get('sub'):
                marks += (f'<text x="{x+dx}" y="{y+11}" fill="{C["fainter"]}" font-family="{MONO}" '
                          f'font-size="11" letter-spacing="1.1">{m["sub"].upper()}</text>')
    return f"""<svg viewBox="0 0 {f['width']} {f['height']}" preserveAspectRatio="xMidYMid meet" style="width:{width}; height:{height}; display:block; background:#0c1016;">
  <rect width="{f['width']}" height="{f['height']}" fill="#0c1016"></rect>
  <g>{grat}</g>
  <g>{land}</g>
  <g>{ringsvg}</g>
  <g>{marks}</g>
</svg>"""

def legend(compact=False):
    size = '10px' if compact else '11px'
    items = [
        (f'<span style="width:0; height:0; border-left:5px solid transparent; border-right:5px solid transparent; border-bottom:9px solid {C["wax"]}; flex-shrink:0;"></span>', 'Missile site', ''),
        (f'<span style="width:16px; border-top:1.5px dashed {C["wax"]}; flex-shrink:0;"></span>', 'SS-4 MRBM', '2,080 km · approx. 1,290 miles'),
        (f'<span style="width:16px; border-top:1.5px dashed {C["wax"]}; flex-shrink:0;"></span>', 'SS-5 IRBM', '4,500 km · approx. 2,800 miles'),
    ]
    out = ''
    for swatch, label, note in items:
        sub = f'<br><span style="text-transform:none; letter-spacing:0; color:{C["fainter"]};">{note}</span>' if note else ''
        out += f"""<div style="display:flex; align-items:center; gap:8px;">
      {swatch}
      <span style="font-family:{MONO}; font-size:{size}; letter-spacing:0.1em; text-transform:uppercase; color:{C['faint']}; line-height:1.4;">{label}{sub}</span>
    </div>"""
    return out

FILES = {}

FRAMING = ['The world does not yet know how far this crisis will go. Officials are watching for signs of panic, weakness, resolve, and restraint. Your first words will not solve the crisis, but they will shape how others interpret your intent.',
           'Choose your initial line carefully.']

CHOICES = [
    ('Firm warning', 'The United States cannot ignore a threat of this magnitude. Any response must show that such a deployment carries serious consequences.'),
    ('Controlled firmness', 'The response must be serious, but it must also be disciplined. Strength without control may create the very disaster we seek to avoid.'),
    ('Quiet opening for diplomacy', 'Public strength matters, but so does preserving a channel for a solution. A position that leaves no room to move may leave no room for peace.'),
    ('Legitimacy and caution', 'Any response must be defensible not only strategically, but internationally. The world must see firmness joined to restraint.'),
]

W1, H1 = 880, 660

# ── Row 1 · Response scene with a speaker ────────────────────────────────
def speaker_head(op=1.0, label='Robert Kennedy', sub='Attorney General of the United States'):
    return f"""<div style="display:flex; gap:20px; align-items:flex-start;">
  {portrait('rfk.jpg', opacity=op)}
  <div style="display:flex; flex-direction:column; gap:12px; flex:1;">
    <div style="display:flex; flex-direction:column; gap:3px; opacity:{op};">
      <span style="font-family:{DISPLAY}; font-size:15px; font-weight:600; color:{C['stock']};">{label}</span>
      <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">{sub}</span>
    </div>
    {prose(FRAMING[:1], size=17)}
  </div>
</div>"""

FILES['Main.dc.html'] = page(f"""{progress(2)}
{eyebrow('First formal response')}
{speaker_head(op=0.35)}
<p style="margin:0; font-family:{BODY}; font-size:17px; line-height:1.68; color:{C['muted']}; opacity:0.35;">{FRAMING[1]}</p>
<div style="margin-top:auto; display:flex; align-items:center; gap:12px;">
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 1 · the speaker arrives</span>
</div>""", W1, H1)

FILES['ResponseLines.dc.html'] = page(f"""{progress(2)}
{eyebrow('First formal response')}
{speaker_head()}
<div style="display:flex; flex-direction:column; gap:10px;">
  {choice(*CHOICES[0], opacity=1.0)}
  {choice(*CHOICES[1], opacity=0.72)}
  {choice(*CHOICES[2], opacity=0.42)}
  {choice(*CHOICES[3], opacity=0.16)}
</div>
<div style="margin-top:auto;"><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 2 · lines stage in, top to bottom</span></div>""", W1, H1)

FILES['ResponseChosen.dc.html'] = page(f"""{progress(2)}
{eyebrow('First formal response')}
{speaker_head()}
<div style="display:flex; flex-direction:column; gap:10px;">
  {choice(*CHOICES[0], opacity=1.0, chosen=True)}
  {choice(*CHOICES[1], opacity=0.10)}
  {choice(*CHOICES[2], opacity=0.10)}
  {choice(*CHOICES[3], opacity=0.10)}
</div>
<div style="margin-top:auto;"><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 3 · the chosen line holds, the rest recede</span></div>""", W1, H1)

# ── Row 2 · Consequence beat ─────────────────────────────────────────────
W2, H2 = 1060, 660

def echo_block():
    return f"""<div style="border-left:2px solid {C['brass']}; padding:4px 0 4px 18px; display:flex; flex-direction:column; gap:8px;">
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">The line you took</span>
  <p style="margin:0; font-family:{BODY}; font-size:19px; font-style:italic; line-height:1.6; color:{C['muted']};">{CHOICES[0][1]}</p>
</div>"""

def consequence(scene_extra, rows, caption):
    return page(f"""<div style="display:flex; gap:32px; flex:1; min-height:0;">
  <div style="flex:1; display:flex; flex-direction:column; gap:20px; min-width:0;">
    {progress(3)}
    {eyebrow('How your position was read')}
    {echo_block()}
    {scene_extra}
  </div>
  {tracker_column(rows)}
</div>
<div><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">{caption}</span></div>""", W2, H2)

FEEDBACK = 'Your stance projects seriousness and resolve. Others are less likely to dismiss your position, but some now read the crisis as moving closer to confrontation.'

FILES['ConsequenceHold.dc.html'] = consequence(
    '', [('Escalation', 0, None, 'danger'), ('Legitimacy', 0, None, 'legitimacy'),
         ('Council trust', 0, None, 'legitimacy'), ('Diplomatic leverage', 0, None, 'neutral'),
         ('Civilian risk', 0, None, 'danger')],
    'Frame 1 · the line holds, indicators still at rest')

FILES['ConsequenceTravel.dc.html'] = consequence(
    prose([FEEDBACK]),
    [('Escalation', 2, 2, 'danger'), ('Legitimacy', 0, None, 'legitimacy'),
     ('Council trust', -1, -1, 'legitimacy'), ('Diplomatic leverage', 2, 2, 'neutral'),
     ('Civilian risk', 1, 1, 'danger')],
    'Frame 2 · needles travel, chinagraph deltas land')

FILES['ConsequenceCard.dc.html'] = consequence(
    prose([FEEDBACK]) + f"""<div style="display:flex; flex-direction:column; gap:12px;">
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['brassBright']};">New in your file</span>
  {paper('Opposing power response', 'How firmness is being read on the other side',
         ['A public position taken at strength is rarely heard as a single statement. It is read as a floor — the least the speaker can now accept without losing face.'],
         'Firm language buys seriousness at the cost of manoeuvre.')}
</div>""",
    [('Escalation', 2, 2, 'danger', dict(delta_opacity=0.42)), ('Legitimacy', 0, None, 'legitimacy'),
     ('Council trust', -1, -1, 'legitimacy', dict(delta_opacity=0.42)),
     ('Diplomatic leverage', 2, 2, 'neutral', dict(delta_opacity=0.42)),
     ('Civilian risk', 1, 1, 'danger', dict(delta_opacity=0.42))],
    'Frame 3 · the card arrives, deltas fade')

# ── Row 3 · Drafting screen, three directions ────────────────────────────
W3, H3 = 880, 620

TONES = [
    ('Condemnatory and urgent', 'Frame the crisis as unacceptable and requiring immediate correction.',
     'The installation of offensive weapons in Cuba is an unacceptable act that demands immediate correction.'),
    ('Measured but firm', 'Acknowledge the seriousness of the threat while preserving disciplined control.',
     'The developments in Cuba are of the gravest seriousness, and they require a response that is firm, deliberate, and proportionate.'),
    ('Procedural and investigative', 'Emphasise verification, process, and the need to establish a credible path forward.',
     'The facts in Cuba must be established by means all parties can credit, and a process to verify them should begin without delay.'),
    ('De-escalatory and diplomatic', 'Reduce public temperature and protect room for future negotiation.',
     'However serious these developments, the immediate task is to reduce the danger of miscalculation and to keep open every channel through which a settlement might be found.'),
]

def drafting_head(sub):
    return f"""{progress(4)}
{eyebrow('Drafting — opening line')}
<p style="margin:0; font-family:{BODY}; font-size:19px; line-height:1.68; color:{C['silver']};">Choose the tone of your opening diplomatic line.</p>
<p style="margin:0; font-family:{BODY}; font-size:13px; font-style:italic; color:{C['fainter']};">{sub}</p>"""

# Direction A — what ships today
FILES['DraftingCurrent.dc.html'] = page(f"""{drafting_head('This becomes the first fragment of the statement you will build across the crisis.')}
<div style="display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px;">
  {''.join(f'''<div style="padding:16px 18px; background:{C['raised']}; border:1px solid {C['line']}; border-radius:2px; display:flex; flex-direction:column; gap:6px;">
    <span style="font-family:{DISPLAY}; font-size:15.5px; font-weight:600; color:{C['stock']};">{t[0]}</span>
    <span style="font-family:{BODY}; font-size:13.5px; line-height:1.55; color:{C['muted']};">{t[1]}</span>
  </div>''' for t in TONES)}
</div>
<div style="margin-top:auto;"><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">A · current — you choose a description</span></div>""", W3, H3)

# Direction B — choose by reading the sentence you will actually send
FILES['DraftingSpecimen.dc.html'] = page(f"""{drafting_head('You are choosing a sentence, not a label. Read them.')}
<div style="display:flex; flex-direction:column; gap:8px;">
  {''.join(f'''<div style="display:flex; gap:16px; align-items:flex-start; padding:14px 18px; background:{C['raised'] if i==1 else 'transparent'}; border:1px solid {C['line'] if i==1 else 'transparent'}; border-left:2px solid {C['brass'] if i==1 else 'transparent'}; border-radius:2px;">
    <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['brass'] if i==1 else C['fainter']}; width:96px; flex-shrink:0; line-height:1.5; padding-top:3px;">{t[0]}</span>
    <span style="font-family:{BODY}; font-size:16px; line-height:1.6; color:{C['silver'] if i==1 else C['fainter']};">{t[2]}</span>
  </div>''' for i, t in enumerate(TONES))}
</div>
<div style="margin-top:auto;"><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">B · specimen lines — the label recedes, the sentence leads</span></div>""", W3, H3)

# Direction C — the sheet is the interface
FILES['DraftingSheet.dc.html'] = page(f"""{drafting_head('The line rewrites itself on the sheet as you move between tones.')}
<div style="display:flex; gap:6px; flex-wrap:wrap;">
  {''.join(f'''<span style="font-family:{MONO}; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; padding:8px 12px; border:1px solid {C['brass'] if i==1 else C['line']}; border-radius:2px; color:{C['brassBright'] if i==1 else C['faint']}; background:{'#232b34' if i==1 else 'transparent'};">{t[0]}</span>''' for i, t in enumerate(TONES))}
</div>
<div style="background:{C['stock']}; border:1px solid {C['stockEdge']}; border-radius:1px; padding:26px 28px; box-shadow:0 1px 0 rgba(255,255,255,0.06), 0 18px 34px -22px rgba(6,9,12,0.55); display:flex; flex-direction:column; gap:14px;">
  <div style="display:flex; align-items:baseline; gap:10px;">
    <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['inkFaint']};">Fragment 1</span>
    <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:{C['wax']};">Measured but firm</span>
  </div>
  <p style="margin:0; font-family:{BODY}; font-size:17px; line-height:1.6; color:{C['ink']};">{TONES[1][2]}</p>
  <div style="border-top:1px dashed {C['stockEdge']}; padding-top:12px;">
    <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['inkFaint']};">Fragments 2–5 · Days 2 to 5</span>
  </div>
</div>
<div style="margin-top:auto;"><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">C · the sheet is the interface — tone is a control on the document</span></div>""", W3, H3)

# ── Row 4 · Step-to-step transitions ─────────────────────────────────────
W4, H4 = 880, 600

def chrome_shell(inner, caption, note):
    return page(f"""<div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid {C['line']};">
  <div style="display:flex; align-items:center; gap:12px;">
    <span style="font-family:{MONO}; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:{C['faint']};">October 1962</span>
    <img src="rfk.jpg" alt="" style="width:30px; height:30px; border-radius:50%; object-fit:cover; object-position:50% 20%; border:1px solid {C['lineBright']};">
    <span style="font-family:{DISPLAY}; font-size:14px; font-weight:600; color:{C['stock']};">Robert Kennedy</span>
  </div>
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">persists</span>
</div>
<div style="flex:1; min-height:0; display:flex; flex-direction:column; gap:18px; position:relative; overflow:hidden;">
{inner}
</div>
<div style="display:flex; justify-content:space-between; align-items:baseline;">
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">{caption}</span>
  <span style="font-family:{BODY}; font-size:12px; font-style:italic; color:{C['fainter']};">{note}</span>
</div>""", W4, H4)

FILES['TransitionOut.dc.html'] = chrome_shell(f"""{progress(3)}
{eyebrow('How your position was read')}
{prose([FEEDBACK])}""", 'Frame 1 · outgoing step at rest', 'header, rail and indicators never move')

FILES['TransitionCross.dc.html'] = chrome_shell(f"""{progress(3)}
<div style="opacity:0.22; transform:translateY(-14px);">
  {eyebrow('How your position was read')}
  {prose([FEEDBACK])}
</div>
<div style="opacity:0.45; transform:translateY(10px); border-top:1px dashed {C['lineBright']}; padding-top:16px;">
  {eyebrow('Drafting — opening line')}
  <p style="margin:12px 0 0; font-family:{BODY}; font-size:19px; line-height:1.68; color:{C['silver']};">Choose the tone of your opening diplomatic line.</p>
</div>""", 'Frame 2 · outgoing lifts and fades, incoming rises', 'only the scene column crosses')

FILES['TransitionIn.dc.html'] = chrome_shell(f"""{progress(4)}
{eyebrow('Drafting — opening line')}
<p style="margin:0; font-family:{BODY}; font-size:19px; line-height:1.68; color:{C['silver']};">Choose the tone of your opening diplomatic line.</p>
<p style="margin:0; font-family:{BODY}; font-size:13px; font-style:italic; color:{C['fainter']};">This becomes the first fragment of the statement you will build across the crisis.</p>""",
'Frame 3 · incoming step settled', 'progress advances one segment')

# ── Row 5 · Map, rail to overlay ─────────────────────────────────────────
# The rail frame is deliberately drawn at its true 260px so the problem
# being solved is visible next to the solution.

FILES['MapRail.dc.html'] = page(f"""{eyebrow('Situation map')}
<div style="width:260px; border:1px solid {C['line']}; border-radius:2px; background:{C['inset']}; overflow:hidden; display:flex; flex-direction:column;">
  <div style="display:flex; align-items:center; justify-content:space-between; padding:11px 14px; border-bottom:1px solid {C['line']}; background:{C['raised']};">
    {eyebrow('Situation map')}
    <span style="width:13px; height:13px; border:1px solid {C['faint']}; border-radius:2px; position:relative; flex-shrink:0;">
      <span style="position:absolute; inset:3px; border-top:1px solid {C['faint']}; border-right:1px solid {C['faint']};"></span>
    </span>
  </div>
  {map_svg('regional', '100%', 'auto')}
  <div style="display:flex; flex-direction:column; gap:10px; padding:12px 14px; border-top:1px solid {C['line']}; background:{C['raised']};">
    {legend(compact=True)}
  </div>
</div>
<div style="margin-top:auto; max-width:300px;">
  <span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 1 · the rail, at true size</span>
  <p style="margin:8px 0 0; font-family:{BODY}; font-size:12.5px; font-style:italic; line-height:1.5; color:{C['fainter']};">Rings and place names are unreadable at 260px. The corner mark is the affordance to open.</p>
</div>""", 380, 620)

FILES['MapExpanding.dc.html'] = page(f"""<div style="position:relative; flex:1; min-height:0; background:{C['board']}; border-radius:2px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
  <div style="position:absolute; inset:0; background:rgba(7,10,13,0.55);"></div>
  <div style="position:relative; width:74%; border:1px solid {C['lineBright']}; border-radius:2px; overflow:hidden; box-shadow:0 20px 40px -30px rgba(0,0,0,0.9);">
    {map_svg('regional', '100%', 'auto', ring_opacity=0.55)}
  </div>
</div>
<div><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 2 · the scrim lifts, the panel grows from the rail</span></div>""", 880, 620)

FILES['MapOverlay.dc.html'] = page(f"""<div style="display:flex; align-items:center; justify-content:space-between; gap:20px;">
  <div style="display:flex; flex-direction:column; gap:6px;">
    {eyebrow('Situation map · Day 1')}
    <span style="font-family:{DISPLAY}; font-size:26px; font-weight:300; letter-spacing:-0.015em; color:{C['stock']};">Strike range from San Cristóbal</span>
  </div>
  <span style="font-family:{MONO}; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:{C['faint']}; border:1px solid {C['lineBright']}; border-radius:2px; padding:10px 18px;">Close</span>
</div>
<div style="display:flex; gap:26px; flex:1; min-height:0;">
  <div style="flex:1; min-width:0; border:1px solid {C['line']}; border-radius:2px; overflow:hidden;">
    {map_svg('regional', '100%', '100%')}
  </div>
  <div style="width:240px; flex-shrink:0; display:flex; flex-direction:column; gap:18px;">
    <div style="display:flex; flex-direction:column; gap:14px; padding-bottom:18px; border-bottom:1px solid {C['line']};">{legend()}</div>
    <p style="margin:0; font-family:{BODY}; font-size:14px; line-height:1.6; color:{C['muted']};">Medium-range missiles sited here place much of the south-eastern United States inside a short flight time. Intermediate-range types would reach considerably further.</p>
    <p style="margin:0; font-family:{BODY}; font-size:14px; line-height:1.6; color:{C['muted']};">The strategic balance was not obviously altered. The warning time was.</p>
    <span style="margin-top:auto; font-family:{MONO}; font-size:10px; letter-spacing:0.1em; color:{C['fainter']}; line-height:1.5;">Coastlines schematic · ranges to scale</span>
  </div>
</div>
<div><span style="font-family:{MONO}; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:{C['fainter']};">Frame 3 · full overlay — rings readable, geography note alongside</span></div>""", 1240, 760)

# ── canvas.json ──────────────────────────────────────────────────────────
ROWS = [
    ('Response scene · a speaker in the room', 0,
     [('Main.dc.html', W1, H1), ('ResponseLines.dc.html', W1, H1), ('ResponseChosen.dc.html', W1, H1)]),
    ('Consequence beat', 760,
     [('ConsequenceHold.dc.html', W2, H2), ('ConsequenceTravel.dc.html', W2, H2), ('ConsequenceCard.dc.html', W2, H2)]),
    ('Drafting screen · three directions', 1520,
     [('DraftingCurrent.dc.html', W3, H3), ('DraftingSpecimen.dc.html', W3, H3), ('DraftingSheet.dc.html', W3, H3)]),
    ('Step-to-step transitions', 2240,
     [('TransitionOut.dc.html', W4, H4), ('TransitionCross.dc.html', W4, H4), ('TransitionIn.dc.html', W4, H4)]),
]

artboards, x_gap = [], 80
for _, y, items in ROWS:
    x = 0
    for f, w, h in items:
        artboards.append({'file': f, 'x': x, 'y': y, 'w': w, 'h': h})
        x += w + x_gap

# map row has three different frame sizes
mx, my = 0, 2920
for f, w, h in [('MapRail.dc.html', 380, 620), ('MapExpanding.dc.html', 880, 620), ('MapOverlay.dc.html', 1240, 760)]:
    artboards.append({'file': f, 'x': mx, 'y': my, 'w': w, 'h': h})
    mx += w + x_gap

NOTES = [
    ('row-response', -320, 0, 240,
     'RESPONSE SCENE\n\nYour speech-bubble idea, in documentary register.\n\nDecide: does the speaker stay for the whole scene, or withdraw once the lines appear?'),
    ('row-consequence', -320, 760, 240,
     'CONSEQUENCE BEAT\n\nDecide: does the scene hold while the needles settle, or do they move under the next screen?\n\nRight now they move and you miss it.'),
    ('row-drafting', -320, 1520, 240,
     'DRAFTING · THREE DIRECTIONS\n\nA is what ships today.\nB leads with the sentence.\nC makes the sheet the interface.\n\nPick one, or mix.'),
    ('row-transitions', -320, 2240, 240,
     'TRANSITIONS\n\nWhat persists, what crosses.\n\nHeader, rail and indicators hold still; only the scene column moves.'),
    ('row-map', -320, 2920, 240,
     'MAP · RAIL TO OVERLAY\n\nFrame 1 is drawn at the true 260px so the problem is visible next to the fix.\n\nDecide how the overlay is dismissed and whether it pauses the scene.'),
]

canvas = {
    'artboards': artboards,
    'annotations': [{'id': i, 'x': x, 'y': y, 'w': w, 'text': t} for i, x, y, w, t in NOTES],
    'launch': {'view': 'canvas'},
}

import os
for name, src in FILES.items():
    open(name, 'w').write(src)
open('canvas.json', 'w').write(json.dumps(canvas, indent=2))
print('wrote', len(FILES), 'artboards + canvas.json')
for name in FILES:
    print(f'  {name:28s} {os.path.getsize(name):>7,} bytes')
