import type { JSX } from "react";

export interface IBaseCompTmplProps {
  children: JSX.Element;
}

export interface IBaseDirTmpl {
  name: string,
  targetFileType: string[]
}

export type TBaseSetStateFn<T> = (newValue: T) => void;

export interface IBaseHook<TArgs extends unknown[], TReturn> {
  (...args: TArgs): TReturn;
}

export interface IPoint {
  x: number
  y: number
};
