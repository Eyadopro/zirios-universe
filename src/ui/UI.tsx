import { useWorldStore } from '../store/useWorldStore'
import './ui.css'

export function UI() {
  const currentWorld = useWorldStore((s) => s.currentWorld)

  const worldLabel = currentWorld.replace(/-/g, ' ').toUpperCase()

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
      </div>

      <div className="ui-footer">
        <span className="meta">DIGITAL UNIVERSE</span>
        <span className="meta">v0.3.0 — TYPOGRAPHY</span>
      </div>
    </div>
  )
}
