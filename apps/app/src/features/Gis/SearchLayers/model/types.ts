import type { TRootUseDispatch } from '@/shared/store';
import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';


export type TUseSearch = IBaseHook<TUseSearchArgs, IUseSearchReturn>;
export type TUseSearchArgs = [ TRootUseDispatch ];

export interface IUseSearchReturn {
  query: string
  setQuery: TBaseSetStateFn<string>
}
