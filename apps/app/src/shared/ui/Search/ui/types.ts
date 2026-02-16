import type { TBaseSetStateFn } from '@/shared/types'

export interface ISearchProps {
  placeholder?: string
  value?: string
  setValue?: TBaseSetStateFn<string>
}
