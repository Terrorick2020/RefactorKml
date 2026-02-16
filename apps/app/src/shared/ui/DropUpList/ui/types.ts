export interface IDropUpListProps {
  title: string
  valuesList?: IDropUpValues[]
}

export type IDropUpValues<T = any, EXTRA = {}> = IDropUpValuesBase<T> & EXTRA;

interface IDropUpValuesBase<T = any> {
  value: T;
  label: string;
}
