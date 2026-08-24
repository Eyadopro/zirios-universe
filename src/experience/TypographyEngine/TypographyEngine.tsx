import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { VOCABULARY, type WordInstance } from './types'
import { usePhysicsStore } from '../../store/usePhysicsStore'

function createWordInstances(count = 30): WordInstance[] {
  const words: WordInstance[] = []

  for (let i = 0; i < count; i++) {
    const text = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)]
    const isLarge = Math.random() > 0.72
    const isTiny = Math.random() > 0.85

    let scale = 0.35 + Math.random() * 0.55
    if (isLarge) scale = 1.4 + Math.random() * 1.8
    if (isTiny) scale = 0.08 + Math.random() * 0.12

    const depth = (Math.random() - 0.5) * 40

    words.push({
      id: `w-${i}`,
      text,
      position: [
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 14,
        depth,
      ],
      rotation: [
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * Math.PI * 2,
        (Math.random() - 0.5) * 0.25,
      ],
      scale,
      opacity: isTiny ? 0.15 + Math.random() * 0.25 : 0.35 + Math.random() * 0.45,
      velocity: [
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.003,
      ],
      rotationSpeed: [
        (Math.random() - 0.5) * 0.0012,
        (Math.random() - 0.5) * 0.0018,
        (Math.random() - 0.5) * 0.0008,
      ],
      depth,
    })
  }

  // Prominent ZIRIOS
  words[0] = {
    ...words[0],
    text: 'ZIRIOS',
    scale: 2.35,
    position: [0, 0.5, -3.5],
    opacity: 0.58,
    velocity: [0, 0.0012, 0],
    rotationSpeed: [0, 0.0006, 0],
  }

  return words
}

function FloatingWord({ instance }: { instance: WordInstance }) {
  const group = useRef<THREE.Group>(null)
  const origin = useRef(new THREE.Vector3(...instance.position))
  const vel = useRef(new THREE.Vector3(...instance.velocity))
  const tmp = useRef(new THREE.Vector3())
  const force = useRef(new THREE.Vector3())

  const {
    cursorWorld,
    shockwaves,
    repulsionStrength,
    repulsionRadius,
    returnSpring,
    damping,
    clearOldShockwaves,
  } = usePhysicsStore()

  useFrame((state) => {
    if (!group.current) return

    const pos = group.current.position
    force.current.set(0, 0, 0)

    // 1. Soft continuous drift (base velocity)
    force.current.x += instance.velocity[0] * 0.4
    force.current.y += instance.velocity[1] * 0.4
    force.current.z += instance.velocity[2] * 0.4

    // 2. Cursor repulsion
    tmp.current.copy(pos).sub(cursorWorld)
    const dist = tmp.current.length()
    if (dist < repulsionRadius && dist > 0.01) {
      const strength = (1 - dist / repulsionRadius) * repulsionStrength
      tmp.current.normalize().multiplyScalar(strength)
      force.current.add(tmp.current)
    }

    // 3. Shockwaves
    const now = performance.now()
    for (const sw of shockwaves) {
      const age = (now - sw.time) / 1000
      if (age > 1.6) continue
      tmp.current.copy(pos).sub(sw.origin)
      const d = tmp.current.length()
      if (d < 14 && d > 0.05) {
        const falloff = Math.exp(-age * 2.2) * (1 - d / 14)
        tmp.current.normalize().multiplyScalar(sw.strength * falloff * 0.09)
        force.current.add(tmp.current)
      }
    }

    // 4. Spring back to original position
    tmp.current.copy(origin.current).sub(pos)
    force.current.addScaledVector(tmp.current, returnSpring)

    // Integrate
    vel.current.add(force.current)
    vel.current.multiplyScalar(damping)
    pos.add(vel.current)

    // Rotation still independent
    group.current.rotation.x += instance.rotationSpeed[0]
    group.current.rotation.y += instance.rotationSpeed[1]
    group.current.rotation.z += instance.rotationSpeed[2]

    // Soft bounds
    if (Math.abs(pos.x) > 20) vel.current.x *= -0.6
    if (Math.abs(pos.y) > 13) vel.current.y *= -0.6
    if (Math.abs(pos.z) > 28) vel.current.z *= -0.55

    // Cleanup old shockwaves occasionally
    if (state.clock.elapsedTime % 2 < 0.02) {
      clearOldShockwaves(now)
    }
  })

  return (
    <group
      ref={group}
      position={instance.position}
      rotation={instance.rotation}
      scale={instance.scale}
    >
      <Text
        fontSize={1}
        letterSpacing={0.12}
        color="#eaeaea"
        anchorX="center"
        anchorY="middle"
      >
        {instance.text}
        <meshBasicMaterial
          color="#e8e8e8"
          transparent
          opacity={instance.opacity}
          depthWrite={false}
          toneMapped={false}
        />
      </Text>
    </group>
  )
}

export function TypographyEngine() {
  const words = useMemo(() => createWordInstances(30), [])
  const { camera, gl } = useThree()
  const {
    setMouse,
    setCursorWorld,
    addShockwave,
  } = usePhysicsStore()

  // Track mouse + convert to approximate world position on z=0 plane
  useEffect(() => {
    const el = gl.domElement

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse(x, y)

      // Unproject to world on a plane roughly in front of camera
      const vec = new THREE.Vector3(x, y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))
      setCursorWorld(pos)
    }

    const onClick = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      const vec = new THREE.Vector3(x, y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))
      addShockwave(pos, 2.2)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onClick)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onClick)
    }
  }, [camera, gl, setMouse, setCursorWorld, addShockwave])

  return (
    <group>
      {words.map((w) => (
        <FloatingWord key={w.id} instance={w} />
      ))}
    </group>
  )
}
