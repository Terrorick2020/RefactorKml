import type { IBaseHook, TBaseSetStateFn } from "@/shared/types";
import type { IGisStateILLayersListItem } from "@/shared/store";


export type TUseList = IBaseHook<TUseListArgs, IUseListReturn>;
export type TUseListArgs = [];

export interface IUseListReturn {
  keyId: string;
  resList: IGisStateILLayersListItem[];
}


export type TUseListItem = IBaseHook<TUseListItemArgs, IUseListItemReturn>;
export type TUseListItemArgs = [ id: string, isActive: boolean ];

export interface IUseListItemReturn {
  setColorItem: TBaseSetStateFn<string>;
  setShow: TBaseSetStateFn<void>;
  setActive: TBaseSetStateFn<void>;
}
