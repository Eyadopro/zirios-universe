import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

/**
 * Experience — root of the 3D scene.
 * Later this will host WorldManager, TypographyEngine, ParticleEngine, etc.
 */
export function Experience() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    // subtle continuous drift
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
  })

  return (
    <group ref={group}>
      {/* Temporary ambient so the scene is not pure black while we build */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />

      {/* Placeholder geometry — will be replaced by real worlds */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
