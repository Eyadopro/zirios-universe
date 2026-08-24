import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useCameraStore } from '../store/useCameraStore'

/**
 * CameraDirector
 * Controls the main camera with several cinematic modes.
 * All movement is heavily damped for a luxurious, slow feel.
 */
export function CameraDirector() {
  const { camera } = useThree()
  const { mode, driftSpeed, orbitSpeed, zoomAmplitude, damping } = useCameraStore()

  // Target state we lerp towards
  const targetPos = useRef(new THREE.Vector3(0, 0, 12))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))

  // For orbit
  const angle = useRef(0)
  const radius = useRef(12)

  // Keyboard shortcuts for modes (C cycles cinematic modes)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyC') {
        const modes: Array<'drift' | 'orbit' | 'slow-zoom' | 'cinematic' | 'runway'> = [
          'drift',
          'orbit',
          'slow-zoom',
          'cinematic',
          'runway',
        ]
        const idx = modes.indexOf(mode as any)
        const next = modes[(idx + 1) % modes.length]
        useCameraStore.getState().setMode(next)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // --- Compute target based on mode ---
    switch (mode) {
      case 'drift': {
        // Very slow organic drift
        targetPos.current.set(
          Math.sin(t * driftSpeed) * 1.8,
          Math.sin(t * driftSpeed * 0.7) * 0.9 + 0.3,
          11.5 + Math.sin(t * driftSpeed * 0.4) * 0.8
        )
        targetLook.current.set(
          Math.sin(t * driftSpeed * 0.5) * 0.6,
          Math.cos(t * driftSpeed * 0.35) * 0.3,
          0
        )
        break
      }

      case 'orbit': {
        angle.current += orbitSpeed * 0.008
        const r = 11 + Math.sin(t * 0.15) * 1.2
        targetPos.current.set(
          Math.cos(angle.current) * r,
          1.2 + Math.sin(t * 0.2) * 0.6,
          Math.sin(angle.current) * r
        )
        targetLook.current.set(0, 0.2, 0)
        break
      }

      case 'slow-zoom': {
        const z = 10 + Math.sin(t * 0.12) * zoomAmplitude
        targetPos.current.set(
          Math.sin(t * 0.08) * 0.8,
          0.4 + Math.sin(t * 0.11) * 0.4,
          z
        )
        targetLook.current.set(0, 0.1, 0)
        break
      }

      case 'cinematic': {
        // Slow sweeping + gentle height change
        const a = t * 0.07
        targetPos.current.set(
          Math.sin(a) * 4.5,
          1.5 + Math.sin(a * 0.6) * 1.1,
          9 + Math.cos(a * 0.8) * 3
        )
        targetLook.current.set(
          Math.sin(a * 0.4) * 1.2,
          0.3,
          Math.cos(a * 0.3) * 0.8
        )
        break
      }

      case 'runway': {
        // Slow forward tracking like a fashion runway camera
        targetPos.current.set(
          Math.sin(t * 0.05) * 0.6,
          0.8,
          14 - (t * 0.15) % 8
        )
        targetLook.current.set(0, 0.3, targetPos.current.z - 6)
        break
      }

      case 'fly-through': {
        const a = t * 0.11
        targetPos.current.set(
          Math.sin(a) * 6,
          2 + Math.sin(a * 1.3) * 1.5,
          Math.cos(a * 0.7) * 8 + 4
        )
        targetLook.current.set(
          Math.sin(a * 0.6) * 2,
          0.5,
          Math.cos(a * 0.5) * 2
        )
        break
      }
    }

    // Smooth damping (lerp)
    camera.position.lerp(targetPos.current, damping)
    currentLook.current.lerp(targetLook.current, damping * 1.2)
    camera.lookAt(currentLook.current)
  })

  return null
}
