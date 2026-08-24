import { create } from 'zustand'

export type WorldId =
  | 'blood-ritual'
  | 'editorial-studio'
  | 'cosmic-infinity'
  | 'inferno-hearth'
  | 'cyberpunk-district'
  | 'matrix-rain'
  | 'ocean-depths'
  | 'silent-void'
  | 'glass-dimension'
  | 'aurora-sky'

interface WorldState {
  currentWorld: WorldId
  setWorld: (id: WorldId) => void
  isTransitioning: boolean
  setTransitioning: (v: boolean) => void
}

export const useWorldStore = create<WorldState>((set) => ({
  currentWorld: 'silent-void',
  setWorld: (id) => set({ currentWorld: id }),
  isTransitioning: false,
  setTransitioning: (v) => set({ isTransitioning: v }),
}))
