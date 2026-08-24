import { create } from 'zustand'
import * as THREE from 'three'

interface PhysicsState {
  // Normalized mouse in NDC (-1 to 1)
  mouse: THREE.Vector2
  // World-space approximate cursor position (z ≈ 0 plane)
  cursorWorld: THREE.Vector3
  // Shockwave impulses (timestamp + strength + origin)
  shockwaves: { id: number; origin: THREE.Vector3; strength: number; time: number }[]

  setMouse: (x: number, y: number) => void
  setCursorWorld: (v: THREE.Vector3) => void
  addShockwave: (origin: THREE.Vector3, strength?: number) => void
  clearOldShockwaves: (now: number) => void

  // Tunables
  repulsionStrength: number
  repulsionRadius: number
  returnSpring: number
  damping: number
}

let shockId = 0

export const usePhysicsStore = create<PhysicsState>((set, get) => ({
  mouse: new THREE.Vector2(0, 0),
  cursorWorld: new THREE.Vector3(0, 0, 0),
  shockwaves: [],

  setMouse: (x, y) => {
    const mouse = get().mouse
    mouse.set(x, y)
  },

  setCursorWorld: (v) => {
    get().cursorWorld.copy(v)
  },

  addShockwave: (origin, strength = 1.8) => {
    set((s) => ({
      shockwaves: [
        ...s.shockwaves,
        { id: ++shockId, origin: origin.clone(), strength, time: performance.now() },
      ],
    }))
  },

  clearOldShockwaves: (now) => {
    set((s) => ({
      shockwaves: s.shockwaves.filter((sw) => now - sw.time < 1800),
    }))
  },

  repulsionStrength: 0.045,
  repulsionRadius: 6.5,
  returnSpring: 0.012,
  damping: 0.92,
}))
