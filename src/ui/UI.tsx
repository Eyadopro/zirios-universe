import { useState } from 'react'
import { useWorldStore } from '../store/useWorldStore'
import { useCameraStore } from '../store/useCameraStore'
import { QuoteEngine } from '../experience/QuoteEngine/QuoteEngine'
import { WorldSelector } from './WorldSelector'
import './ui.css'

export function UI() {
  const currentWorld = useWorldStore((s) => s.currentWorld)
  const cameraMode = useCameraStore((s) => s.mode)
  const [worldsOpen, setWorldsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const worldLabel = currentWorld.replace(/-/g, ' ').toUpperCase()
  const camLabel = cameraMode.replace(/-/g, ' ').toUpperCase()

  return (
    <div className="ui-root">
      <header className="ui-header">
        <div className="brand">ZIRIOS</div>
        <nav className="nav">
          <button className="nav-item" onClick={() => setWorldsOpen(true)}>
            WORLDS
          </button>
          <button className="nav-item" onClick={() => setAboutOpen(true)}>
            ABOUT
          </button>
        </nav>
      </header>

      <div className="ui-center">
        <div className="world-label">{worldLabel}</div>
        <div className="cam-label">CAM · {camLabel}</div>
      </div>

      <QuoteEngine />

      <div className="ui-footer">
        <span className="meta">DIGITAL UNIVERSE</span>
        <span className="meta">v1.0.0 · C = camera · ← → quotes · click = shockwave</span>
      </div>

      <WorldSelector open={worldsOpen} onClose={() => setWorldsOpen(false)} />

      {aboutOpen && (
        <div className="ws-overlay" onClick={() => setAboutOpen(false)}>
          <div className="ws-panel about-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ws-title">ABOUT</div>
            <p className="about-text">
              ZIRIOS is a living digital fashion universe.<br /><br />
              Immersive worlds · Procedural typography · Cinematic camera · Interactive physics · Atmospheric quotes.
              <br /><br />
              Built as an art installation, not a conventional website.
            </p>
            <button className="ws-item" onClick={() => setAboutOpen(false)} style={{ marginTop: 20 }}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
