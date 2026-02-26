import type { JSX, ButtonHTMLAttributes, ChangeEvent } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: JSX.Element
  load?: boolean
  viewType?: EButtonViewType
  fileType?: EButtonFileType | null
  bgColor?: string
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export enum EButtonViewType {
  Icon = 'icon',
  Text = 'text'
}

export enum EButtonFileType {
  File = 'file',
  Files = 'files',
  Folder = 'folder',
}
