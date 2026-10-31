interface InlineStyleValue {
  value: string
  priority: string
}

export class ImageRotator {
  private target: HTMLElement | null = null
  private image: HTMLImageElement | null = null
  private identity: string | null = null
  private angle = 0
  private originalRotate: InlineStyleValue | null = null
  private originalTransformOrigin: InlineStyleValue | null = null

  get currentAngle(): number {
    return this.angle
  }

  setTarget(
    target: HTMLElement | null,
    image: HTMLImageElement | null,
    identity: string | null,
  ): boolean {
    if (this.target === target && this.image === image && this.identity === identity) {
      return false
    }

    this.restoreImageStyles()
    this.target = target
    this.image = image
    this.identity = identity
    this.angle = 0
    return true
  }

  rotateBy(degrees: number): void {
    this.setAngle(this.angle + degrees)
  }

  reset(): void {
    this.setAngle(0)
  }

  clear(): void {
    this.setTarget(null, null, null)
  }

  private setAngle(degrees: number): void {
    this.angle = ((degrees % 360) + 360) % 360
    this.applyRotation()
  }

  private applyRotation(): void {
    if (!this.target) {
      return
    }

    if (this.angle === 0) {
      this.restoreImageStyles()
      return
    }

    if (this.originalRotate === null || this.originalTransformOrigin === null) {
      this.originalRotate = readInlineStyle(this.target.style, 'rotate')
      this.originalTransformOrigin = readInlineStyle(this.target.style, 'transform-origin')
    }

    this.target.style.setProperty('rotate', `${this.angle}deg`)
    this.target.style.setProperty('transform-origin', 'center center')
  }

  private restoreImageStyles(): void {
    if (!this.target) {
      this.originalRotate = null
      this.originalTransformOrigin = null
      this.angle = 0
      return
    }

    if (this.originalRotate) {
      restoreInlineStyle(this.target.style, 'rotate', this.originalRotate)
      restoreInlineStyle(
        this.target.style,
        'transform-origin',
        this.originalTransformOrigin ?? { value: '', priority: '' },
      )
    }

    this.originalRotate = null
    this.originalTransformOrigin = null
    this.angle = 0
  }
}

function readInlineStyle(style: CSSStyleDeclaration, property: string): InlineStyleValue {
  return {
    value: style.getPropertyValue(property),
    priority: style.getPropertyPriority(property),
  }
}

function restoreInlineStyle(
  style: CSSStyleDeclaration,
  property: string,
  original: InlineStyleValue,
): void {
  if (original.value) {
    style.setProperty(property, original.value, original.priority)
  } else {
    style.removeProperty(property)
  }
}
