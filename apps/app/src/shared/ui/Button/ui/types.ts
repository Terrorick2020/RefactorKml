import type { JSX, ButtonHTMLAttributes } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: JSX.Element
  viewType?: EButtonViewType
  bgColor?: string
}

export enum EButtonViewType {
  Icon = 'icon',
  Text = 'text'
}
