import {
  Clock,
  DirectionalLight,
  HemisphereLight,
  type Material,
  MathUtils,
  Matrix4,
  type Mesh,
  PerspectiveCamera,
  Quaternion,
  Scene,
  SRGBColorSpace,
  type Texture,
  Vector3,
  WebGLRenderer,
} from 'three'
import { createSky } from './sky'
import { createSwallowtail } from './swallowtail'

// Camera framing: at this distance and field of view the square shows about
// ±1.26 units at the depth of the flight path's centre.
const CAMERA_Z = 4
const FOV = 35
// The model's wingspan is about 2 units; this makes it a third of the square.
const SCALE = 0.42

// One lap of the loop, in seconds. The x, y and z frequencies share no common
// factor below this, so the path takes the whole lap to close.
const LAP = 40

// Wingbeats per second at cruise; climbing speeds them up.
const BEAT = 3.2

/**
 * Where the butterfly is at time t, in scene units. A Lissajous curve with a
 * second, slower harmonic on each axis so it reads as wandering, not orbiting.
 * Stays within about ±0.7 across and ±0.55 up and down, clear of the faded
 * edges.
 */
function flightPath(t: number, out: Vector3) {
  const w = (Math.PI * 2) / LAP
  return out.set(
    0.55 * Math.sin(3 * w * t) + 0.15 * Math.sin(7 * w * t + 1.1),
    0.42 * Math.sin(4 * w * t + 0.6) + 0.12 * Math.cos(5 * w * t),
    0.4 * Math.sin(2 * w * t + 2.0),
  )
}

// The back faces the camera and a little up, so the wings' pattern shows.
const FACING = new Vector3(0, 0.5, 1).normalize()

/**
 * Turns `out` so the head points along `heading` with the back as close to
 * FACING as that allows.
 */
function aim(heading: Vector3, out: Quaternion) {
  // Butterflies sink and climb nose-up; lean the body toward upright so it
  // never dives head first.
  const forward = heading.clone().normalize()
  forward.y = forward.y * 0.4 + 0.6
  forward.normalize()
  const back = FACING.clone().addScaledVector(forward, -FACING.dot(forward)).normalize()
  const right = new Vector3().crossVectors(forward, back)
  return out.setFromRotationMatrix(new Matrix4().makeBasis(right, forward, back))
}

function disposeScene(scene: Scene) {
  ;(scene.background as Texture | null)?.dispose()
  scene.traverse((node) => {
    const mesh = node as Mesh
    if (!mesh.geometry) return
    mesh.geometry.dispose()
    ;([] as Material[]).concat(mesh.material).forEach((m) => {
      ;(m as Material & { map?: Texture | null }).map?.dispose()
      m.dispose()
    })
  })
}

/**
 * Mounts the sky and the swallowtail in `container` and returns a teardown.
 * With `still`, it renders one frame, gliding in the middle of a still sky,
 * and never animates.
 */
export function mountFlyingBorb(container: HTMLElement, { still }: { still: boolean }) {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 20)
  camera.position.z = CAMERA_Z

  const sky = createSky(scene, CAMERA_Z, FOV)
  const sun = new DirectionalLight('#FFF4DC', 3)
  sun.position.set(-2, 3, 4)
  scene.add(sun, new HemisphereLight('#D4E8FF', '#B09868', 2.2))

  const butterfly = createSwallowtail()
  butterfly.root.scale.setScalar(SCALE)
  scene.add(butterfly.root)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container
    if (!w || !h) return
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (still) renderer.render(scene, camera)
  }
  const resizer = new ResizeObserver(resize)
  resizer.observe(container)

  const dispose = () => {
    resizer.disconnect()
    disposeScene(scene)
    renderer.dispose()
    renderer.domElement.remove()
  }

  if (still) {
    aim(new Vector3(0.35, 1, 0), butterfly.root.quaternion)
    butterfly.setWings(0.3, 0.25)
    resize()
    return dispose
  }
  resize()

  const clock = new Clock()
  const pos = new Vector3()
  const ahead = new Vector3()
  const target = new Quaternion()
  let elapsed = 0
  let phase = 0
  let frame = 0

  const tick = () => {
    frame = requestAnimationFrame(tick)
    // Clamp so a long pause (hidden tab) resumes in place instead of jumping.
    const dt = Math.min(clock.getDelta(), 1 / 20)
    elapsed += dt

    flightPath(elapsed, pos)
    const heading = flightPath(elapsed + 0.3, ahead).sub(pos)
    // Ease toward the heading rather than snapping, so turns read as banking.
    butterfly.root.quaternion.slerp(aim(heading, target), 1 - Math.exp(-3 * dt))

    // Flap in bursts with short glides between (power 0), beating faster
    // when climbing.
    const power = MathUtils.smoothstep(Math.sin((elapsed * Math.PI * 2) / 5.3), -0.8, -0.4)
    phase += dt * Math.PI * 2 * BEAT * (1 + MathUtils.clamp(heading.y * 2, -0.3, 0.4))
    const open = MathUtils.lerp(0.2, 0.42, power)
    const swing = MathUtils.lerp(0.06, 0.75, power)
    // The hindwings trail the forewings slightly, as in a real stroke.
    butterfly.setWings(open + swing * Math.sin(phase), open + swing * 0.92 * Math.sin(phase - 0.4))

    // Each downstroke lifts the body a touch.
    const lift = new Vector3(0, 0, 1).applyQuaternion(butterfly.root.quaternion)
    butterfly.root.position.copy(pos).addScaledVector(lift, -0.03 * power * Math.cos(phase))

    sky.update(dt)
    renderer.render(scene, camera)
  }

  // Only spend frames while the square is on screen.
  const watcher = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame)
    if (entry.isIntersecting) {
      clock.getDelta()
      tick()
    }
  })
  watcher.observe(container)

  return () => {
    cancelAnimationFrame(frame)
    watcher.disconnect()
    dispose()
  }
}
