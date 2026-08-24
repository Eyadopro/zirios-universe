import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { VOCABULARY, type WordInstance } from './types'

function createWordInstances(count = 28): WordInstance[] {
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
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 16,
        depth,
      ],
      rotation: [
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * Math.PI * 2,
        (Math.random() - 0.5) * 0.3,
      ],
      scale,
      opacity: isTiny ? 0.15 + Math.random() * 0.25 : 0.35 + Math.random() * 0.45,
      velocity: [
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.004,
      ],
      rotationSpeed: [
        (Math.random() - 0.5) * 0.0015,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001,
      ],
      depth,
    })
  }

  // Ensure at least one huge "ZIRIOS" near center sometimes
  words[0] = {
    ...words[0],
    text: 'ZIRIOS',
    scale: 2.4,
    position: [0, 0.6, -4],
    opacity: 0.55,
    velocity: [0, 0.0015, 0],
    rotationSpeed: [0, 0.0008, 0],
  }

  return words
}

function FloatingWord({
  instance,
  materialRef,
}: {
  instance: WordInstance
  materialRef: React.MutableRefObject<THREE.MeshBasicMaterial | null>
}) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(() => {
    if (!group.current) return

    // Independent slow drift
    group.current.position.x += instance.velocity[0]
    group.current.position.y += instance.velocity[1]
    group.current.position.z += instance.velocity[2]

    group.current.rotation.x += instance.rotationSpeed[0]
    group.current.rotation.y += instance.rotationSpeed[1]
    group.current.rotation.z += instance.rotationSpeed[2]

    // Soft boundary wrap (keep words inside volume)
    const lim = 18
    if (Math.abs(group.current.position.x) > lim) group.current.position.x *= -0.92
    if (Math.abs(group.current.position.y) > 12) group.current.position.y *= -0.92
    if (Math.abs(group.current.position.z) > 25) group.current.position.z *= -0.9
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
        fillOpacity={instance.opacity}
        // Using basic material for performance in void
      >
        {instance.text}
        <meshBasicMaterial
          ref={(r) => {
            mat.current = r
            if (materialRef) materialRef.current = r
          }}
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
  const words = useMemo(() => createWordInstances(32), [])
  const dummyMat = useRef<THREE.MeshBasicMaterial | null>(null)

  return (
    <group>
      {words.map((w) => (
        <FloatingWord key={w.id} instance={w} materialRef={dummyMat} />
      ))}
    </group>
  )
}
