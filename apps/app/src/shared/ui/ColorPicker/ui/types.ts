import type { IBaseCompTmplProps } from '@/shared/types'

export interface IColorPickerProps extends IBaseCompTmplProps {
  title?: string
  color?: string
  setColor?: (newColor: string) => void
}
