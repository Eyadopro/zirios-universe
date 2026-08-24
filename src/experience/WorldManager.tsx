import { useWorldStore, type WorldId } from '../store/useWorldStore'
import { SilentVoid } from '../worlds/SilentVoid/SilentVoid'
// Future worlds will be imported here

const WORLD_COMPONENTS: Record<WorldId, React.FC> = {
  'silent-void': SilentVoid,
  'blood-ritual': SilentVoid, // temporary fallback
  'editorial-studio': SilentVoid,
  'cosmic-infinity': SilentVoid,
  'inferno-hearth': SilentVoid,
  'cyberpunk-district': SilentVoid,
  'matrix-rain': SilentVoid,
  'ocean-depths': SilentVoid,
  'glass-dimension': SilentVoid,
  'aurora-sky': SilentVoid,
}

export function WorldManager() {
  const currentWorld = useWorldStore((s) => s.currentWorld)
  const ActiveWorld = WORLD_COMPONENTS[currentWorld]

  return <ActiveWorld />
}
