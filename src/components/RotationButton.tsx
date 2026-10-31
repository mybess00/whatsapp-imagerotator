import type { KeyboardEvent, PointerEvent, ReactNode } from 'react'

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
      onPointerDown={preservePageFocus}
      onKeyDown={releaseFocusForArrowNavigation}
    >
      {icon}
    </button>
  )
}

function preservePageFocus(event: PointerEvent<HTMLButtonElement>) {
  event.preventDefault()
  event.stopPropagation()
}

function releaseFocusForArrowNavigation(event: KeyboardEvent<HTMLButtonElement>) {
  if (
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight' ||
    event.key === 'ArrowUp' ||
    event.key === 'ArrowDown'
  ) {
    event.currentTarget.blur()
  }
}
