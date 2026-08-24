import { useWorldStore, type WorldId } from '../store/useWorldStore'
import './world-selector.css'

const AVAILABLE: { id: WorldId; label: string }[] = [
  { id: 'silent-void', label: 'SILENT VOID' },
  { id: 'ocean-depths', label: 'OCEAN DEPTHS' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export function WorldSelector({ open, onClose }: Props) {
  const current = useWorldStore((s) => s.currentWorld)
  const setWorld = useWorldStore((s) => s.setWorld)

  if (!open) return null

  return (
    <div className="ws-overlay" onClick={onClose}>
      <div className="ws-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ws-title">WORLDS</div>
        <div className="ws-list">
          {AVAILABLE.map((w) => (
            <button
              key={w.id}
              className={`ws-item ${current === w.id ? 'active' : ''}`}
              onClick={() => {
                setWorld(w.id)
                onClose()
              }}
            >
              {w.label}
            </button>
          ))}
        </div>
        <div className="ws-hint">More worlds coming</div>
      </div>
    </div>
  )
}
