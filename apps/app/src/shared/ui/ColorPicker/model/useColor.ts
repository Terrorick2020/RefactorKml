import { useState } from 'react';
import type { IUseColor } from './types';


export function useColor(
  color: string,
  setColor: (newColor: string) => void
): IUseColor {
  const [innerColor, setInnerColor] = useState<string>(color);

  const setAllColor = (newColor: string): void => {
    setInnerColor(newColor);
    setColor(newColor);
  }

  return { innerColor, setAllColor }
}
