import type { IBaseCompTmplProps } from '@/shared/types';

export interface IAlertProps extends IBaseCompTmplProps {
  title: string
  open: boolean
  setOpen: (newValue: boolean) => void
}
