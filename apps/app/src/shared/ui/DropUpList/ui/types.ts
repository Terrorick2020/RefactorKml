import type { TBaseSetStateFn } from '@/shared/types';

export interface IDropUpListProps<T extends string | number> {
  title: string
  setValue?: TBaseSetStateFn<T>;
  valuesList?: IDropUpValues<T>[];
}

export type IDropUpValues<T extends string | number, EXTRA = {}> = IDropUpValuesBase<T> & EXTRA;

interface IDropUpValuesBase<T = any> {
  value: T;
  label: string;
}
