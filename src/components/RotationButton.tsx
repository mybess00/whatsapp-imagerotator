import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'

interface RotationButtonProps {
  label: string
  icon: ReactNode
  onClick: () => void
}

export function RotationButton({ label, icon, onClick }: RotationButtonProps) {
  return (
    <button
      aria-label={label}
      className="rotation-button"
      title={label}
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      onPointerDown={stopPropagation}
      onKeyDown={stopPropagation}
    >
      {icon}
    </button>
  )
}

function stopPropagation(
  event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
) {
  event.stopPropagation()
}
