import { useEffect, useRef } from 'react'
import { useWorldStore } from '../../store/useWorldStore'
import { useQuoteStore } from '../../store/useQuoteStore'
import { QUOTES } from './quotes'
import './quotes.css'

export function QuoteEngine() {
  const currentWorld = useWorldStore((s) => s.currentWorld)
  const {
    currentIndex,
    isPlaying,
    opacity,
    blur,
    duration,
    next,
    prev,
    togglePlay,
    setOpacity,
    setBlur,
    setPlaying,
  } = useQuoteStore()

  const timerRef = useRef<number | null>(null)
  const transitionRef = useRef<number | null>(null)

  const quotes = QUOTES[currentWorld] || QUOTES['silent-void']
  const currentQuote = quotes[currentIndex] || quotes[0]

  // Cinematic transition: fade out → blur → fade in
  const runTransition = (direction: 'next' | 'prev' | 'auto') => {
    if (transitionRef.current) cancelAnimationFrame(transitionRef.current)

    // Fade out + increase blur
    let progress = 0
    const fadeOut = () => {
      progress += 0.035
      const t = Math.min(progress, 1)
      setOpacity(1 - t)
      setBlur(t * 12)

      if (t < 1) {
        transitionRef.current = requestAnimationFrame(fadeOut)
      } else {
        // Change quote
        if (direction === 'next' || direction === 'auto') next(currentWorld)
        else prev()

        // Fade in
        progress = 0
        const fadeIn = () => {
          progress += 0.028
          const t2 = Math.min(progress, 1)
          setOpacity(t2)
          setBlur((1 - t2) * 12)

          if (t2 < 1) {
            transitionRef.current = requestAnimationFrame(fadeIn)
          }
        }
        transitionRef.current = requestAnimationFrame(fadeIn)
      }
    }
    transitionRef.current = requestAnimationFrame(fadeOut)
  }

  // Auto play loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    timerRef.current = window.setTimeout(() => {
      runTransition('auto')
    }, duration)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, currentIndex, duration, currentWorld])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        setPlaying(false)
        runTransition('next')
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault()
        setPlaying(false)
        runTransition('prev')
      }
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentWorld])

  return (
    <div className="quote-root">
      <div
        className="quote-text"
        style={{
          opacity,
          filter: `blur(${blur}px)`,
        }}
      >
        {currentQuote}
      </div>

      <div className="quote-controls">
        <button onClick={() => { setPlaying(false); runTransition('prev') }} title="Previous (←)">
          ←
        </button>
        <button onClick={togglePlay} title="Pause / Resume (Space)">
          {isPlaying ? 'Ⅱ' : '▶'}
        </button>
        <button onClick={() => { setPlaying(false); runTransition('next') }} title="Next (→)">
          →
        </button>
      </div>
    </div>
  )
}
