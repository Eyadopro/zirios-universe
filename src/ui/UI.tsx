import { useWorldStore } from '../store/useWorldStore'
import { useCameraStore } from '../store/useCameraStore'
import { QuoteEngine } from '../experience/QuoteEngine/QuoteEngine'
import './ui.css'

export function UI() {
  const currentWorld = useWorldStore((s) => s.currentWorld)
  const cameraMode = useCameraStore((s) => s.mode)

  const worldLabel = currentWorld.replace(/-/g, ' ').toUpperCase()
  const camLabel = cameraMode.replace(/-/g, ' ').toUpperCase()

  return (
    <div className="ui-root">
      <header className="ui-header">
        <div className="brand">ZIRIOS</div>
        <nav className="nav">
          <button className="nav-item">WORLDS</button>
          <button className="nav-item">ARCHIVE</button>
          <button className="nav-item">ABOUT</button>
        </nav>
      </header>

      <div className="ui-center">
        <div className="world-label">{worldLabel}</div>
        <div className="cam-label">CAM · {camLabel}</div>
      </div>

      <QuoteEngine />

      <div className="ui-footer">
        <span className="meta">DIGITAL UNIVERSE</span>
        <span className="meta">v0.6.0 — CAMERA · press C to cycle</span>
      </div>
    </div>
  )
}
