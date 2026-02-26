import type { IBaseHook, TBaseSetStateFn } from "@/shared/types";
import type { IGSItemLayoutLLItem } from "@/shared/store";


export type TUseList = IBaseHook<TUseListArgs, IUseListReturn>;
export type TUseListArgs = [];

export interface IUseListReturn {
  keyId: string;
  resList: IGSItemLayoutLLItem[];
}


export type TUseListItem = IBaseHook<TUseListItemArgs, IUseListItemReturn>;
export type TUseListItemArgs = [ id: string, isShow: boolean, isActive: boolean ];

export interface IUseListItemReturn {
  setColorItem: TBaseSetStateFn<string>;
  setShow: TBaseSetStateFn<void>;
  setActive: TBaseSetStateFn<void>;
}
