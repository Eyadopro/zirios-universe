import type { FC } from 'react'
import { useWorldStore, type WorldId } from '../store/useWorldStore'
import { SilentVoid } from '../worlds/SilentVoid/SilentVoid'
import { OceanDepths } from '../worlds/OceanDepths/OceanDepths'

const WORLD_COMPONENTS: Partial<Record<WorldId, FC>> = {
  'silent-void': SilentVoid,
  'ocean-depths': OceanDepths,
}

export function WorldManager() {
  const currentWorld = useWorldStore((s) => s.currentWorld)
  const ActiveWorld = WORLD_COMPONENTS[currentWorld] || SilentVoid

  return <ActiveWorld />
}
