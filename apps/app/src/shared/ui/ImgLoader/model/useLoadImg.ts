import { useEffect, useState } from 'react';
import { ELoaderUiStatus } from '@/shared/types';


export function useLoadImg(src: string): ELoaderUiStatus {
  const [status, setStatus] = useState<ELoaderUiStatus>(ELoaderUiStatus.Loading);

  useEffect(() => {
    if (!src) {
      setStatus(ELoaderUiStatus.Error);
      return;
    }

    let isMounted = true;

    const img = new Image();
    img.src = src;
    img.loading = 'lazy';
    img.decoding = 'async';

    img.onload = () => {
      if (isMounted) setStatus(ELoaderUiStatus.Loaded);
    };

    img.onerror = () => {
      if (isMounted) setStatus(ELoaderUiStatus.Error);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return status;
}
