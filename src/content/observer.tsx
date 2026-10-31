import { createRoot, type Root } from 'react-dom/client'
import { RotationControls } from '../components/RotationControls'
import controlsStyles from '../styles/content.css?inline'
import { ImageRotator } from './image-rotator'
import { findActiveImage, findViewer, findZoomOutButton } from './viewer-detector'

const HOST_ATTRIBUTE = 'data-whatsapp-image-rotator'

export function observeImageViewer(): () => void {
  const rotator = new ImageRotator()
  let currentViewer: HTMLElement | null = null
  let host: HTMLDivElement | null = null
  let root: Root | null = null
  let scheduledFrame: number | null = null

  const renderControls = () => {
    root?.render(
      <RotationControls
        onReset={() => {
          rotator.reset()
          renderControls()
        }}
        onRotateHalfTurn={() => {
          rotator.rotateBy(180)
          renderControls()
        }}
        onRotateLeft={() => {
          rotator.rotateBy(-90)
          renderControls()
        }}
        onRotateRight={() => {
          rotator.rotateBy(90)
          renderControls()
        }}
      />,
    )
  }

  const disposeControls = () => {
    root?.unmount()
    root = null
    host?.remove()
    host = null
  }

  const clearViewer = () => {
    rotator.clear()
    disposeControls()
    currentViewer = null
  }

  const createControls = () => {
    host = document.createElement('div')
    host.setAttribute(HOST_ATTRIBUTE, '')
    const shadowRoot = host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = controlsStyles
    const mountPoint = document.createElement('div')
    shadowRoot.append(style, mountPoint)
    root = createRoot(mountPoint)
    renderControls()
  }

  const placeControls = (viewer: HTMLElement) => {
    if (!host) {
      return
    }

    const zoomOutButton = findZoomOutButton(viewer)

    if (zoomOutButton?.parentElement) {
      if (
        host.parentElement !== zoomOutButton.parentElement ||
        host.nextElementSibling !== zoomOutButton
      ) {
        zoomOutButton.before(host)
      }

      host.classList.remove('rotator-floating')
      host.classList.add('rotator-header')
      return
    }

    const fallbackContainer = document.body ?? document.documentElement
    if (host.parentElement !== fallbackContainer) {
      fallbackContainer.append(host)
    }
    host.classList.remove('rotator-header')
    host.classList.add('rotator-floating')
  }

  const synchronize = () => {
    const viewer = findViewer()

    if (!viewer) {
      clearViewer()
      return
    }

    if (currentViewer && currentViewer !== viewer) {
      rotator.clear()
      disposeControls()
    }
    currentViewer = viewer

    const activeImage = findActiveImage(viewer)
    if (!activeImage) {
      rotator.clear()
      disposeControls()
      return
    }

    const imageChanged = rotator.setTarget(viewer, activeImage.element, activeImage.identity)
    if (!host) {
      createControls()
    } else if (imageChanged) {
      renderControls()
    }

    placeControls(viewer)
  }

  const scheduleSynchronization = () => {
    if (scheduledFrame !== null) {
      return
    }

    scheduledFrame = window.requestAnimationFrame(() => {
      scheduledFrame = null
      synchronize()
    })
  }

  const observer = new MutationObserver(scheduleSynchronization)
  const start = () => {
    if (!document.documentElement) {
      return
    }
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['aria-label', 'data-testid', 'src', 'srcset', 'title'],
      childList: true,
      subtree: true,
    })
  }

  const handleImageLoad = (event: Event) => {
    if (event.target instanceof HTMLImageElement && currentViewer?.contains(event.target)) {
      scheduleSynchronization()
    }
  }

  document.addEventListener('load', handleImageLoad, true)
  window.addEventListener('resize', scheduleSynchronization)
  start()
  synchronize()

  return () => {
    observer.disconnect()
    document.removeEventListener('load', handleImageLoad, true)
    window.removeEventListener('resize', scheduleSynchronization)
    if (scheduledFrame !== null) {
      window.cancelAnimationFrame(scheduledFrame)
    }
    clearViewer()
  }
}
