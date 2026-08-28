import json, math, sys, datetime
SP = sys.argv[1]
OUT = sys.argv[2]

CLIP = (-130, -8, 54, 76)
# Tolerances are set against the pixels each region actually gets. The two
# frames that render are hemispheric (5.6 px/deg) and regional (10.2 px/deg);
# the caribbean frame (20.8 px/deg) is declared but unused, and these leave
# enough headroom that switching it on would not need a rebuild.
TIERS = [
    ((-85.5, 19.4, -73.5, 23.6), 0.025),  # Cuba: the subject. 0.26px at regional zoom
    ((-96, 7, -54, 33), 0.09),            # Caribbean, Florida, the Gulf
    ((-130, -8, -32, 62), 0.14),          # The Americas inside the regional frame,
                                          # which reaches to lat -4: Central America
                                          # and the north coast of South America are
                                          # on screen there and were falling to the
                                          # coarse tier. Runs east to -32 to catch
                                          # the Brazilian coast, which the frame
                                          # reaches at its bottom-right corner.
    (None, 0.36),                         # elsewhere: only ever seen hemispheric
]
KEEP_FINE, KEEP_COARSE = 0.22, 1.1
LAKE_MIN_AREA = 2.0

def bbox(r):
    xs=[c[0] for c in r]; ys=[c[1] for c in r]
    return (min(xs), min(ys), max(xs), max(ys))
def intersects(a,b): return not (a[2]<b[0] or a[0]>b[2] or a[3]<b[1] or a[1]>b[3])
def inside(a,b): return a[0]>=b[0] and a[1]>=b[1] and a[2]<=b[2] and a[3]<=b[3]
def tol_at(pt):
    x,y=pt
    for box,t in TIERS:
        if box is None or (box[0]<=x<=box[2] and box[1]<=y<=box[3]): return t
    return TIERS[-1][1]
def perp(p,a,b):
    if a==b: return math.hypot(p[0]-a[0],p[1]-a[1])
    dx,dy=b[0]-a[0],b[1]-a[1]
    t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)))
    return math.hypot(p[0]-(a[0]+t*dx), p[1]-(a[1]+t*dy))
def simplify(pts):
    if len(pts)<3: return pts
    keep=[False]*len(pts); keep[0]=keep[-1]=True; stack=[(0,len(pts)-1)]
    while stack:
        lo,hi=stack.pop()
        if hi<=lo+1: continue
        worst,wi=-1,lo
        for i in range(lo+1,hi):
            d=perp(pts[i],pts[lo],pts[hi])
            if d>worst: worst,wi=d,i
        if worst>tol_at(pts[wi]):
            keep[wi]=True; stack.append((lo,wi)); stack.append((wi,hi))
    return [p for p,k in zip(pts,keep) if k]
def clip_rect(pts, box):
    w,s,e,n=box
    def edge(poly,keep,isect):
        if not poly: return []
        out=[]; prev=poly[-1]
        for cur in poly:
            ck,pk=keep(cur),keep(prev)
            if ck:
                if not pk: out.append(isect(prev,cur))
                out.append(cur)
            elif pk: out.append(isect(prev,cur))
            prev=cur
        return out
    ix=lambda p,q,x:(x,p[1]+(x-p[0])/(q[0]-p[0])*(q[1]-p[1]))
    iy=lambda p,q,y:(p[0]+(y-p[1])/(q[1]-p[1])*(q[0]-p[0]),y)
    poly=list(pts)
    poly=edge(poly,lambda p:p[0]>=w,lambda p,q:ix(p,q,w))
    poly=edge(poly,lambda p:p[0]<=e,lambda p,q:ix(p,q,e))
    poly=edge(poly,lambda p:p[1]>=s,lambda p,q:iy(p,q,s))
    poly=edge(poly,lambda p:p[1]<=n,lambda p,q:iy(p,q,n))
    return poly

def collect(path, min_keep=None, lake=False):
    data=json.load(open(path)); out=[]
    for ft in data['features']:
        g=ft['geometry']
        polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
        for poly in polys:
            ring=[tuple(c) for c in poly[0]]
            b=bbox(ring)
            if not intersects(b,CLIP): continue
            if lake:
                if (b[2]-b[0])*(b[3]-b[1]) < LAKE_MIN_AREA: continue
            ring=clip_rect(ring,CLIP)
            if len(ring)<4: continue
            b=bbox(ring)
            if not lake:
                km = KEEP_FINE if inside(b,TIERS[1][0]) else KEEP_COARSE
                if (b[2]-b[0])<km and (b[3]-b[1])<km: continue
            s=simplify(ring)
            if len(s)<4: continue
            out.append({'pts':[(round(x,2),round(y,2)) for x,y in s], 'bbox':bbox(s),
                        'name': ft['properties'].get('name') or ''})
    return out

land = collect(f'{SP}/ne_10m_land.geojson')
lakes = collect(f'{SP}/ne_50m_lakes.geojson', lake=True)

# Cuba is the subject of the map and is styled apart from every other landmass.
for r in land:
    b=r['bbox']
    r['id'] = 'cuba' if (b[0]<-84 and b[2]>-75 and 19<b[1]<21) else None
land.sort(key=lambda r: -((r['bbox'][2]-r['bbox'][0])*(r['bbox'][3]-r['bbox'][1])))

def fmt(rings):
    lines=[]
    for r in rings:
        b=[round(v,2) for v in r['bbox']]
        flat=','.join(f'{x},{y}' for x,y in r['pts'])
        tag = f", id: '{r['id']}'" if r.get('id') else ''
        lines.append(f"  {{ b: [{b[0]}, {b[1]}, {b[2]}, {b[3]}]{tag}, c: [{flat}] }},")
    return '\n'.join(lines)

header = f'''/* Coastlines and inland water for the situation map.

   GENERATED FILE — do not hand-edit. Rebuilt by .design/build-coastlines.py.

   Source: Natural Earth, 1:10m land and 1:50m lakes. Natural Earth is in the
   public domain: "no permission is needed to use Natural Earth. Crediting the
   authors is unnecessary." It is credited anyway, in the app's sources panel,
   because stating where material came from is a discipline this project keeps
   whether or not a licence compels it.

   The outlines are real and generalised, not schematic. Fidelity is decided
   per point rather than per shape, because the Americas arrive from the source
   as a single polygon running from the Beaufort Sea to Tierra del Fuego and
   the part that has to be recognisable — Cuba, Florida, the Gulf, the eastern
   seaboard — is a few degrees of it. Tolerances are matched to the pixels each
   region actually gets: Cuba is drawn to 0.025 degrees, about a quarter of a
   pixel where it is shown; Siberia is drawn to 0.36 because it is only ever
   seen at 5.6 px/degree, if at all.

   Coordinates are flat [lon, lat, lon, lat, ...] rather than nested pairs, and
   rounded to two decimals — about 1.1 km, which is a third of a pixel in the
   tightest frame. `b` is the ring's bounding box, used to skip rings that
   cannot appear in the current frame.

   {len(land)} coastline rings, {sum(len(r['pts']) for r in land)} points.
   {len(lakes)} lakes, {sum(len(r['pts']) for r in lakes)} points. */

export const COASTLINES = [
{fmt(land)}
];

/* Inland water, drawn back in the water colour on top of the land. The Great
   Lakes are most of the reason North America is recognisable at a glance, and
   without them the continent reads as an undifferentiated slab. */
export const LAKES = [
{fmt(lakes)}
];
'''
open(OUT,'w').write(header)
import os
print(f"land rings {len(land)} pts {sum(len(r['pts']) for r in land)}")
print(f"lakes {len(lakes)} pts {sum(len(r['pts']) for r in lakes)} :: {[l['name'] for l in lakes][:12]}")
print(f"written {OUT}  {os.path.getsize(OUT)/1024:.1f} KB")
