import { useEffect, useRef, useState } from 'react';

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

// проблема с подбиранием типа для рефа
export const useHover = (): [any, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOver = (): void => setIsHovered(true);

  const handleMouseOut = (): void => setIsHovered(false);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return (): void => {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, isHovered];
};
