export interface WordInstance {
  id: string
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  opacity: number
  velocity: [number, number, number]
  rotationSpeed: [number, number, number]
  depth: number // for sorting / fog influence
}

export const VOCABULARY = [
  'ZIRIOS',
  'FORM',
  'MOTION',
  'FUTURE',
  'SILENCE',
  'VISION',
  'MACHINE',
  'MEMORY',
  'LIGHT',
  'DARKNESS',
  'STRUCTURE',
  'ENERGY',
  'DESIRE',
  'SPACE',
  'TIME',
  'DISTANCE',
  'VOID',
  'RITUAL',
  'ECHO',
  'PULSE',
] as const

export type VocabularyWord = (typeof VOCABULARY)[number]
