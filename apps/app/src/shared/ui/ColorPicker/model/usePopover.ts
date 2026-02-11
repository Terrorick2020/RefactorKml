import { useState, useRef, useEffect } from 'react';
import type { IUsePopover } from './types';


export function usePopover(): IUsePopover {
  const [open, setOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement| null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const setCritOpen = (): void => setOpen(!open);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { open, setCritOpen, popoverRef, buttonRef };
}
