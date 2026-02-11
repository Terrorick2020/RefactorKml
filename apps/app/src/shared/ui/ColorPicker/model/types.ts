import type { RefObject } from 'react'

export interface IUsePopover {
  open: boolean
  setCritOpen: () => void
  popoverRef: RefObject<HTMLDivElement | null>
  buttonRef: RefObject<HTMLDivElement | null>
}

export interface IUseColor {
  innerColor: string
  setAllColor: (newColor: string) => void
}
