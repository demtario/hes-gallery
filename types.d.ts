declare module 'hes-gallery' {
  export interface HesGalleryOptions {
    disableScrolling: boolean
    hostedStyles: boolean
    animations: boolean
    keyboardControl: boolean
    minResolution: number
    autoInit: boolean
    wrapAround: boolean
    showImageCount: boolean
    linkNested: boolean
  }

  export interface HesGalleryI {
    version: string
    options: HesGalleryOptions
    setOptions(options?: Partial<HesGalleryOptions>): void
    init(options?: Partial<HesGalleryOptions>): void
    replaceImages(gallery: HTMLElement): void
    createDOM(): void
    show(gallery: number, index: number): void
    hide(): void
    next(): void
    prev(): void
  }

  const HesGallery: HesGalleryI

  export default HesGallery
}
