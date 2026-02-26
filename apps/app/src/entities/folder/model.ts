import { createContext, type RefObject } from "react";
import type { TBaseSetStateFn, IFileTree } from '@/shared/types';

export interface IFolderContext {
  value: RefObject<TFolderContextValue>
  setValue: TBaseSetStateFn<TFolderContextValue>
}

export type TFolderContextValue = IFileTree | null;

export const FolderContext = createContext<IFolderContext>({
  value: { current: null },
  setValue: ()=>{}
});
