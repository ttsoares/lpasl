import { CanvasTexture, MathUtils, type Scene, Sprite, SpriteMaterial, SRGBColorSpace } from 'three'
import { sky } from '../../styles/tokens'
import { seeded } from './random'

const CLOUDS = 7

function texture(canvas: HTMLCanvasElement) {
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  return map
}

// The backdrop: the token gradient with a soft sun glow in the upper left.
function backdrop() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 256
  const ctx = canvas.getContext('2d')!
  const fall = ctx.createLinearGradient(0, 0, 0, 256)
  fall.addColorStop(0, sky.top)
  fall.addColorStop(1, sky.bottom)
  ctx.fillStyle = fall
  ctx.fillRect(0, 0, 256, 256)
  const glow = ctx.createRadialGradient(50, 30, 0, 50, 30, 200)
  glow.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
  glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 256, 256)
  return texture(canvas)
}

// A cumulus: overlapping soft puffs, piled highest in the middle, with a
// cool shadow along the base.
function cloud(random: () => number) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  for (let i = 0; i < 22; i++) {
    const x = 256 + (random() - 0.5) * 320
    const y = 165 - 70 * (1 - Math.abs(x - 256) / 200) + (random() - 0.5) * 40
    const r = 38 + random() * 46
    const puff = ctx.createRadialGradient(x, y, 0, x, y, r)
    puff.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
    puff.addColorStop(0.55, 'rgba(255, 255, 255, 0.7)')
    puff.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = puff
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  ctx.globalCompositeOperation = 'source-atop'
  const shade = ctx.createLinearGradient(0, 110, 0, 230)
  shade.addColorStop(0, 'rgba(180, 198, 222, 0)')
  shade.addColorStop(1, 'rgba(180, 198, 222, 0.7)')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, 512, 256)
  return texture(canvas)
}

/**
 * Paints the sky into `scene`: a gradient backdrop and a few clouds spread
 * through depth, drifting right and wrapping round. Nearer clouds are bigger
 * and move faster, which gives the square some parallax depth.
 * `update(dt)` moves them on.
 */
export function createSky(scene: Scene, cameraZ: number, fov: number) {
  scene.background = backdrop()

  const random = seeded(7)
  const halfTan = Math.tan(MathUtils.degToRad(fov / 2))
  const clouds = Array.from({ length: CLOUDS }, (_, i) => {
    const sprite = new Sprite(
      new SpriteMaterial({ map: cloud(random), depthWrite: false, opacity: 0.95 }),
    )
    const z = -5 + (i / (CLOUDS - 1)) * 3.5
    const distance = cameraZ - z
    const width = 1.4 + random() * 1.4 + distance * 0.08
    sprite.scale.set(width, width / 2, 1)
    const half = distance * halfTan
    sprite.position.set((random() * 2 - 1) * half, (random() * 2 - 1) * half * 0.85, z)
    scene.add(sprite)
    return { sprite, half, speed: 0.12 / distance }
  })

  return {
    update(dt: number) {
      for (const { sprite, half, speed } of clouds) {
        sprite.position.x += speed * dt
        const edge = half + sprite.scale.x / 2
        if (sprite.position.x > edge) sprite.position.x = -edge
      }
    },
  }
}
