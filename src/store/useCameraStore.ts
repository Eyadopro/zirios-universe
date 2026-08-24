import { create } from 'zustand'

export type CameraMode =
  | 'drift'
  | 'orbit'
  | 'slow-zoom'
  | 'cinematic'
  | 'runway'
  | 'fly-through'

interface CameraState {
  mode: CameraMode
  setMode: (mode: CameraMode) => void

  // Tunables
  driftSpeed: number
  orbitSpeed: number
  zoomAmplitude: number
  damping: number
}

export const useCameraStore = create<CameraState>((set) => ({
  mode: 'drift',
  setMode: (mode) => set({ mode }),

  driftSpeed: 0.018,
  orbitSpeed: 0.12,
  zoomAmplitude: 1.8,
  damping: 0.04,
}))
