import { RotationButton } from './RotationButton'

interface RotationControlsProps {
  onRotateLeft: () => void
  onRotateRight: () => void
  onRotateHalfTurn: () => void
  onReset: () => void
}

export function RotationControls({
  onRotateLeft,
  onRotateRight,
  onRotateHalfTurn,
  onReset,
}: RotationControlsProps) {
  return (
    <div aria-label="Image rotation controls" className="rotation-toolbar" role="toolbar">
      <RotationButton label="Rotate left 90°" icon={<RotateIcon direction="left" />} onClick={onRotateLeft} />
      <RotationButton label="Rotate right 90°" icon={<RotateIcon direction="right" />} onClick={onRotateRight} />
      <RotationButton label="Rotate 180°" icon={<HalfTurnIcon />} onClick={onRotateHalfTurn} />
      <RotationButton label="Reset rotation" icon={<ResetIcon />} onClick={onReset} />
    </div>
  )
}

function RotateIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      {direction === 'left' ? (
        <path d="M8 5 4 9l4 4M4.5 9H13a6.5 6.5 0 1 1-6.1 8.7" />
      ) : (
        <path d="m16 5 4 4-4 4m3.5-4H11a6.5 6.5 0 1 0 6.1 8.7" />
      )}
    </svg>
  )
}

function HalfTurnIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4.5 10a7.5 7.5 0 1 1 2.2 5.3M4.5 5.5V10h4.5" />
      <path d="M9 12h6" />
      <text className="icon-label" x="12" y="21" textAnchor="middle">180°</text>
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4.5 10a7.5 7.5 0 1 1 2.2 5.3M4.5 5.5V10h4.5" />
      <path d="M12 8.5v3.8l2.5 1.5" />
    </svg>
  )
}
