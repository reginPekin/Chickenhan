import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<any>,
  handler: () => void = (): void => undefined,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    return (): void => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};
