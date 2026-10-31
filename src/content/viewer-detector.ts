export const VIEWER_SELECTOR = 'div[data-testid="media-zoomable"]'
const ZOOM_OUT_SELECTOR = 'div[title="Zoom out"]'
const ZOOM_OUT_BUTTON_SELECTOR = 'button[aria-label="Zoom out"]'

export interface ActiveImage {
  element: HTMLImageElement
  identity: string
}

export function findViewer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(VIEWER_SELECTOR)
}

export function findActiveImage(viewer: HTMLElement): ActiveImage | null {
  const images = Array.from(viewer.querySelectorAll('img')).filter(isVisibleImage)

  if (images.length === 0) {
    return null
  }

  images.sort((left, right) => getVisibleArea(right) - getVisibleArea(left))
  const element = images[0]

  if (!element) {
    return null
  }

  return {
    element,
    identity: element.currentSrc || element.getAttribute('src') || element.src,
  }
}

export function findZoomOutAnchor(viewer: HTMLElement): HTMLElement | null {
  const buttons = Array.from(document.querySelectorAll<HTMLElement>(ZOOM_OUT_SELECTOR))
  const titleAnchor =
    buttons.find((button) => viewer.contains(button) && isVisible(button)) ??
    buttons.find(isVisible) ??
    null

  if (titleAnchor) {
    return titleAnchor
  }

  const accessibleButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(ZOOM_OUT_BUTTON_SELECTOR),
  )
  const accessibleButton = accessibleButtons.find(isVisible)

  if (!accessibleButton) {
    return null
  }

  let anchor: HTMLElement = accessibleButton
  for (let level = 0; level < 3; level += 1) {
    if (!anchor.parentElement) {
      return null
    }
    anchor = anchor.parentElement
  }

  return isVisible(anchor) ? anchor : null
}

function isVisibleImage(image: HTMLImageElement): boolean {
  return image.naturalWidth > 0 && isVisible(image)
}

function isVisible(element: HTMLElement): boolean {
  if (!element.isConnected || element.getClientRects().length === 0) {
    return false
  }

  const styles = window.getComputedStyle(element)
  return styles.display !== 'none' && styles.visibility !== 'hidden'
}

function getVisibleArea(element: HTMLElement): number {
  const { width, height } = element.getBoundingClientRect()
  return width * height
}
