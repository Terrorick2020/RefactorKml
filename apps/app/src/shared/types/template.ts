import type { JSX } from "react";

export interface IBaseCompTmplProps {
  children: JSX.Element;
}

export interface IBaseDirTmpl {
  name: string,
  targetFileType: string[]
}
