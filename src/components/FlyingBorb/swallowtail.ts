import {
  CanvasTexture,
  CatmullRomCurve3,
  CubicBezierCurve,
  type Curve,
  DoubleSide,
  Group,
  LatheGeometry,
  LineCurve,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  QuadraticBezierCurve,
  SphereGeometry,
  SRGBColorSpace,
  TubeGeometry,
  Vector2,
  Vector3,
} from 'three'
import { seeded } from './random'

/*
 * An eastern tiger swallowtail, built from code. Units: the body runs along +y
 * (head up), the right wings spread along +x, and the back faces +z. Each wing
 * is a flat, finely divided plane whose painted canvas texture carries the
 * outline in its alpha, so the same curves drive both shape and pattern.
 */

const YELLOW = '#F6C640'
const YELLOW_DEEP = '#E9AE2E'
const BLACK = '#17130E'
const VEIN = 'rgba(23, 19, 14, 0.72)'
const BLUE = 'rgba(64, 118, 214, 0.9)'
const ORANGE = '#E8772A'

const v = (x: number, y: number) => new Vector2(x, y)

type Wing = {
  outline: Curve<Vector2>[]
  // Box the texture and plane cover: [left, bottom, right, top].
  bounds: [number, number, number, number]
  paint: (ctx: CanvasRenderingContext2D, px: number) => void
}

// Traces curves as one connected path, in wing units.
function trace(ctx: CanvasRenderingContext2D, curves: Curve<Vector2>[], move = true) {
  curves.forEach((curve, i) => {
    curve.getPoints(32).forEach((p, j) => {
      if (move && i === 0 && j === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    })
  })
}

// A point `depth` in from the wing edge at `t` along `curve`. All outlines
// run clockwise, so the inside is always on the right of travel.
function inward(curve: Curve<Vector2>, t: number, depth: number) {
  const p = curve.getPoint(t)
  const tangent = curve.getTangent(t)
  return { p: p.add(v(tangent.y, -tangent.x).multiplyScalar(depth)), angle: Math.atan2(tangent.y, tangent.x) }
}

// Fine flecks of light and dark scales, so the yellow isn't a flat fill.
function scales(ctx: CanvasRenderingContext2D, bounds: Wing['bounds'], seed: number) {
  const random = seeded(seed)
  const [x0, y0, x1, y1] = bounds
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = random() < 0.5 ? 'rgba(80, 50, 0, 0.07)' : 'rgba(255, 245, 210, 0.08)'
    ctx.fillRect(x0 + random() * (x1 - x0), y0 + random() * (y1 - y0), 0.004, 0.004)
  }
}

function veins(ctx: CanvasRenderingContext2D, from: Vector2, targets: Vector2[], width: number) {
  ctx.strokeStyle = VEIN
  ctx.lineWidth = width
  for (const to of targets) {
    const bend = from.clone().lerp(to, 0.5).add(v(0, 0.035))
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.quadraticCurveTo(bend.x, bend.y, to.x, to.y)
    ctx.stroke()
  }
}

function stroke(ctx: CanvasRenderingContext2D, curves: Curve<Vector2>[], width: number, color = BLACK) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineJoin = 'round'
  ctx.beginPath()
  trace(ctx, curves)
  ctx.stroke()
}

function spot(ctx: CanvasRenderingContext2D, at: Vector2, rx: number, ry: number, angle: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.ellipse(at.x, at.y, rx, ry, angle, 0, Math.PI * 2)
  ctx.fill()
}

const foreCosta = new CubicBezierCurve(v(0.04, 0.12), v(0.3, 0.3), v(0.7, 0.47), v(0.98, 0.5))
const foreOuter = new CubicBezierCurve(v(0.98, 0.5), v(0.9, 0.3), v(0.76, 0.02), v(0.66, -0.16))
const foreInner = new CubicBezierCurve(v(0.66, -0.16), v(0.45, -0.17), v(0.2, -0.1), v(0.05, -0.03))

const forewing: Wing = {
  outline: [foreCosta, foreOuter, foreInner, new LineCurve(v(0.05, -0.03), v(0.04, 0.12))],
  bounds: [0, -0.2, 1, 0.54],
  paint(ctx) {
    const base = ctx.createRadialGradient(0.05, 0.05, 0, 0.05, 0.05, 0.9)
    base.addColorStop(0, YELLOW_DEEP)
    base.addColorStop(0.5, YELLOW)
    base.addColorStop(1, '#F9D45E')
    ctx.fillStyle = base
    ctx.fillRect(0, -0.2, 1, 0.74)
    scales(ctx, this.bounds, 11)

    const root = v(0.06, 0.03)
    veins(ctx, root, [
      ...[0.55, 0.75, 0.9].map((t) => foreCosta.getPoint(t)),
      ...[0.1, 0.25, 0.4, 0.55, 0.7, 0.88].map((t) => foreOuter.getPoint(t)),
      ...[0.3, 0.6].map((t) => foreInner.getPoint(t)),
    ], 0.007)

    // The four tiger stripes hang from the leading edge, shortening outward.
    ctx.strokeStyle = BLACK
    ctx.lineCap = 'butt'
    for (const [x, end, width] of [[0.13, -0.22, 0.075], [0.31, -0.02, 0.06], [0.49, 0.2, 0.05], [0.65, 0.3, 0.05]]) {
      ctx.lineWidth = width
      ctx.beginPath()
      ctx.moveTo(x, 0.6)
      ctx.lineTo(x - 0.07, end)
      ctx.stroke()
    }

    stroke(ctx, [foreCosta], 0.035)
    stroke(ctx, [foreInner], 0.035)
    stroke(ctx, [foreOuter], 0.22)
    for (let i = 0; i < 8; i++) {
      const { p, angle } = inward(foreOuter, (i + 0.5) / 8, 0.05)
      spot(ctx, p, 0.022, 0.014, angle, YELLOW)
    }
  },
}

// The hindwing's outer edge is scalloped: a chain of arcs bowing outward
// along a guide curve.
const hindGuide = new QuadraticBezierCurve(v(0.66, -0.06), v(0.68, -0.38), v(0.47, -0.56))
const hindScallops = Array.from({ length: 6 }, (_, i) => {
  const a = hindGuide.getPoint(i / 6)
  const b = hindGuide.getPoint((i + 1) / 6)
  const out = v(-(b.y - a.y), b.x - a.x).normalize().multiplyScalar(0.035)
  return new QuadraticBezierCurve(a, a.clone().lerp(b, 0.5).add(out), b)
})
const hindCosta = new CubicBezierCurve(v(0.05, 0.02), v(0.25, 0.08), v(0.5, 0.06), v(0.66, -0.06))
const hindTail = [
  new CubicBezierCurve(v(0.47, -0.56), v(0.46, -0.7), v(0.45, -0.85), v(0.43, -0.94)),
  new QuadraticBezierCurve(v(0.43, -0.94), v(0.405, -0.96), v(0.4, -0.89)),
  new CubicBezierCurve(v(0.4, -0.89), v(0.4, -0.76), v(0.39, -0.66), v(0.33, -0.6)),
]
const hindAnal = new CubicBezierCurve(v(0.33, -0.6), v(0.26, -0.62), v(0.17, -0.6), v(0.14, -0.5))
const hindInner = new CubicBezierCurve(v(0.14, -0.5), v(0.06, -0.4), v(0.03, -0.2), v(0.05, 0.02))

const hindwing: Wing = {
  outline: [hindCosta, ...hindScallops, ...hindTail, hindAnal, hindInner],
  bounds: [0, -0.98, 0.74, 0.1],
  paint(ctx, px) {
    ctx.fillStyle = YELLOW
    ctx.fillRect(0, -0.98, 0.74, 1.08)
    scales(ctx, this.bounds, 23)

    veins(ctx, v(0.07, -0.02), [
      ...hindScallops.map((s) => s.getPoint(0)),
      hindTail[0].getPoint(0.4),
      hindAnal.getPoint(0.5),
    ], 0.007)

    // Broad black along the inner edge (the forewing's first stripe carried
    // through) and along the scalloped outer edge, tail and all.
    stroke(ctx, [hindInner], 0.14)
    stroke(ctx, [hindCosta], 0.03)
    stroke(ctx, [...hindScallops, ...hindTail, hindAnal], 0.22)

    // Inside the black border: a haze of blue scales, then a yellow crescent
    // at each scallop and an orange eyespot by the inner corner.
    ctx.filter = `blur(${0.012 * px}px)`
    hindScallops.forEach((s) => {
      const { p, angle } = inward(s, 0.5, 0.075)
      spot(ctx, p, 0.035, 0.022, angle, BLUE)
    })
    ctx.filter = 'none'
    hindScallops.forEach((s) => {
      const { p, angle } = inward(s, 0.5, 0.03)
      spot(ctx, p, 0.028, 0.012, angle, YELLOW)
    })
    spot(ctx, v(0.21, -0.53), 0.032, 0.024, 0, ORANGE)
    spot(ctx, v(0.24, -0.46), 0.025, 0.016, 0.5, BLUE)
  },
}

const PIXELS = 1024

function wingMesh(wing: Wing, material: MeshStandardMaterial) {
  const [x0, y0, x1, y1] = wing.bounds
  const w = x1 - x0
  const h = y1 - y0
  const px = PIXELS / w

  const canvas = document.createElement('canvas')
  canvas.width = PIXELS
  canvas.height = Math.round(h * px)
  const ctx = canvas.getContext('2d')!
  // Draw in wing units, y up.
  ctx.setTransform(px, 0, 0, -px, -x0 * px, y1 * px)
  ctx.beginPath()
  trace(ctx, wing.outline)
  ctx.closePath()
  ctx.clip()
  wing.paint(ctx, px)

  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  map.anisotropy = 4

  const geometry = new PlaneGeometry(w, h, 24, 24)
  geometry.translate(x0 + w / 2, y0 + h / 2, 0)
  // A slight upward cup toward the tips, so the wing catches light unevenly.
  const pos = geometry.attributes.position
  for (let i = 0; i < pos.count; i++) pos.setZ(i, 0.05 * pos.getX(i) ** 2)
  geometry.computeVertexNormals()

  const painted = material.clone()
  painted.map = map
  // Light shines through real wings; a little self-glow keeps the yellow
  // bright even when a wing turns away from the sun.
  painted.emissiveMap = map
  painted.emissive.setScalar(0.3)
  return new Mesh(geometry, painted)
}

function bodyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = BLACK
  ctx.fillRect(0, 0, 64, 256)
  // Lathe u runs round the body from the back: yellow down both sides and a
  // paler belly, crossed by darker segment rings.
  ctx.fillStyle = YELLOW
  for (const u of [0.25, 0.75]) ctx.fillRect((u - 0.07) * 64, 0, 0.14 * 64, 256)
  ctx.fillStyle = '#E8D48A'
  ctx.fillRect(0.4 * 64, 0, 0.2 * 64, 256)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
  for (let i = 1; i < 8; i++) ctx.fillRect(0, (i / 8) * 256 - 2, 64, 4)
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  return map
}

export type Swallowtail = ReturnType<typeof createSwallowtail>

/**
 * Builds the butterfly. `setWings(fore, hind)` opens each pair by that angle
 * in radians: 0 is spread flat, positive lifts the tips over the back.
 */
export function createSwallowtail() {
  const root = new Group()

  const wingMaterial = new MeshStandardMaterial({
    side: DoubleSide,
    roughness: 0.72,
    metalness: 0,
    // Cut the outline out of the texture's alpha; with MSAA this gives
    // smooth edges without sorting transparent wings.
    alphaTest: 0.5,
    alphaToCoverage: true,
  })
  const furry = new MeshStandardMaterial({ color: '#211B13', roughness: 1 })

  // One hinge per wing on the body axis. The left wings are the right ones
  // mirrored, so a single angle drives both sides.
  const hinges = { fore: [] as Group[], hind: [] as Group[] }
  for (const side of [1, -1]) {
    const mirror = new Group()
    mirror.scale.x = side
    root.add(mirror)
    for (const [key, wing, z] of [['fore', forewing, 0.006], ['hind', hindwing, -0.006]] as const) {
      const hinge = new Group()
      hinge.position.z = z
      hinge.add(wingMesh(wing, wingMaterial))
      mirror.add(hinge)
      hinges[key].push(hinge)
    }
  }
  wingMaterial.dispose()

  const thorax = new Mesh(new SphereGeometry(0.07, 24, 16), furry)
  thorax.scale.set(1, 1.35, 0.9)
  thorax.position.y = 0.08
  const head = new Mesh(new SphereGeometry(0.045, 20, 14), furry)
  head.position.y = 0.21
  const abdomen = new Mesh(
    new LatheGeometry(
      [v(0, -0.63), v(0.02, -0.6), v(0.04, -0.48), v(0.052, -0.3), v(0.055, -0.12), v(0.04, -0.04), v(0, -0.02)],
      24,
    ),
    new MeshStandardMaterial({ map: bodyTexture(), roughness: 0.9 }),
  )
  root.add(thorax, head, abdomen)

  const eye = new MeshStandardMaterial({ color: '#3A2E1C', roughness: 0.3 })
  const antenna = new MeshStandardMaterial({ color: BLACK, roughness: 0.8 })
  for (const side of [1, -1]) {
    const e = new Mesh(new SphereGeometry(0.026, 16, 12), eye)
    e.position.set(side * 0.03, 0.225, 0.015)
    const path = new CatmullRomCurve3([
      new Vector3(side * 0.015, 0.25, 0.02),
      new Vector3(side * 0.06, 0.4, 0.05),
      new Vector3(side * 0.13, 0.6, 0.07),
    ])
    const stalk = new Mesh(new TubeGeometry(path, 20, 0.004, 6), antenna)
    const club = new Mesh(new SphereGeometry(0.012, 10, 8), antenna)
    club.scale.y = 1.6
    club.position.copy(path.getPoint(1))
    root.add(e, stalk, club)
  }

  return {
    root,
    setWings(fore: number, hind: number) {
      // Rotating about y by a negative angle lifts +x tips toward +z.
      for (const hinge of hinges.fore) hinge.rotation.y = -fore
      for (const hinge of hinges.hind) hinge.rotation.y = -hind
    },
  }
}
