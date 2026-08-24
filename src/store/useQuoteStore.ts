import { create } from 'zustand'
import { QUOTES } from '../experience/QuoteEngine/quotes'
import type { WorldId } from './useWorldStore'

interface QuoteState {
  currentIndex: number
  history: number[]
  isPlaying: boolean
  isVisible: boolean
  opacity: number
  blur: number
  duration: number // ms per quote

  setIndex: (i: number) => void
  next: (world: WorldId) => void
  prev: () => void
  togglePlay: () => void
  setPlaying: (v: boolean) => void
  setVisible: (v: boolean) => void
  setOpacity: (v: number) => void
  setBlur: (v: number) => void
  resetForWorld: (world: WorldId) => void
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  currentIndex: 0,
  history: [0],
  isPlaying: true,
  isVisible: true,
  opacity: 1,
  blur: 0,
  duration: 9000,

  setIndex: (i) => set({ currentIndex: i }),

  next: (world) => {
    const list = QUOTES[world] || QUOTES['silent-void']
    const { currentIndex, history } = get()
    const nextIndex = (currentIndex + 1) % list.length
    set({
      currentIndex: nextIndex,
      history: [...history, nextIndex].slice(-40),
    })
  },

  prev: () => {
    const { history } = get()
    if (history.length < 2) return
    const newHistory = [...history]
    newHistory.pop()
    const prevIndex = newHistory[newHistory.length - 1]
    set({
      currentIndex: prevIndex,
      history: newHistory,
    })
  },

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setPlaying: (v) => set({ isPlaying: v }),
  setVisible: (v) => set({ isVisible: v }),
  setOpacity: (v) => set({ opacity: v }),
  setBlur: (v) => set({ blur: v }),

  resetForWorld: (world) => {
    set({
      currentIndex: 0,
      history: [0],
      isPlaying: true,
      opacity: 1,
      blur: 0,
    })
  },
}))
