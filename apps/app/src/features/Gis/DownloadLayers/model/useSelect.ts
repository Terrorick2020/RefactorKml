import { useMemo, useState } from 'react';
import { convertSizeList } from '@/shared/config/env';
import type { IDropUpValues } from '@/shared/ui';


export const useSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(convertSizeList[0]);

  const valuesList = useMemo((): IDropUpValues<number>[] => {
    return convertSizeList.map(item => ({
      value: item,
      label: `${item}x${item}`
    }))
  }, []);

  return { open, value, valuesList, setValue, setOpen }
}
