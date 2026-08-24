import './ui.css'

export function UI() {
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

      <div className="ui-footer">
        <span className="meta">DIGITAL UNIVERSE</span>
        <span className="meta">v0.1.0</span>
      </div>
    </div>
  )
}
