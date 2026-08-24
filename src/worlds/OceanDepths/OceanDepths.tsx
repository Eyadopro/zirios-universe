import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * OCEAN DEPTHS
 * Deep blue underwater environment.
 * Floating particles / bubbles.
 * Volumetric underwater light.
 * Extremely calm and relaxing.
 */
export function OceanDepths() {
  const { scene } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const bubblesRef = useRef<THREE.Points>(null)

  useMemo(() => {
    scene.fog = new THREE.FogExp2('#021018', 0.022)
    scene.background = new THREE.Color('#021018')
  }, [scene])

  const bubbleGeo = useMemo(() => {
    const count = 400
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      speeds[i] = 0.3 + Math.random() * 0.8
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.08
      groupRef.current.position.y = Math.sin(t * 0.07) * 0.25
    }

    if (bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position as THREE.BufferAttribute
      const speed = bubblesRef.current.geometry.attributes.speed as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, pos.getY(i) + speed.getX(i) * 0.012)
        if (pos.getY(i) > 16) pos.setY(i, -16)
      }
      pos.needsUpdate = true
      bubblesRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.12} color="#4a9eff" />
      <pointLight position={[0, 12, 5]} intensity={0.6} color="#66ccff" distance={50} decay={2} />
      <pointLight position={[-8, -4, -6]} intensity={0.25} color="#2266aa" distance={30} />

      <points ref={bubblesRef} geometry={bubbleGeo}>
        <pointsMaterial
          size={0.08}
          color="#aaddff"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#010a12" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
