export type Masory<T> = T & {gap:string, maxcolwidth:string}

declare global {
  namespace preact.createElement.JSX {
    interface IntrinsicElements {
      ['masonry-layout']: Masory<JSX.HTMLAttributes>
    }
  }
}