import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Stars } from '@react-three/drei'

/**
 * SILENT VOID
 * Almost completely black.
 * Minimal white typography (later).
 * Tiny dust particles.
 * Huge empty spaces.
 * Extremely slow movement.
 * Peaceful and meditative.
 */
export function SilentVoid() {
  const { scene } = useThree()
  const dustRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Fog
  useMemo(() => {
    scene.fog = new THREE.FogExp2('#000000', 0.018)
    scene.background = new THREE.Color('#000000')
  }, [scene])

  // Dust particles
  const dustGeo = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Extremely slow camera-like drift of the whole world
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.008
      groupRef.current.position.y = Math.sin(t * 0.05) * 0.15
    }

    // Gentle dust movement
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.01
      dustRef.current.rotation.x = Math.sin(t * 0.03) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* Soft ambient only */}
      <ambientLight intensity={0.04} />
      <pointLight position={[0, 8, 4]} intensity={0.12} color="#f0f0f0" distance={40} decay={2} />

      {/* Very sparse distant stars for depth */}
      <Stars
        radius={80}
        depth={40}
        count={1200}
        factor={2.5}
        saturation={0}
        fade
        speed={0.15}
      />

      {/* Tiny dust */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          size={0.035}
          color="#c8c8c8"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle large dark plane for ground reference (almost invisible) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
