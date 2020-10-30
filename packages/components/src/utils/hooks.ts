import React, { useEffect, useRef, useState } from 'react';

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

export function usePagination<T>(
  onPagination: () => void,
  targetRef: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>,
  nextFrom: T,
): void {
  const [nextFromList, setNextFromList] = useState<Array<T>>([]);

  useEffect(() => {
    if (!targetRef?.current) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(([checkPoint]) => {
      if (
        checkPoint.target.isSameNode(targetRef.current) &&
        checkPoint.isIntersecting
      ) {
        // This nextFrom has already used
        if (nextFromList.indexOf(nextFrom) !== -1) {
          return;
        }
        setNextFromList([...nextFromList, nextFrom]);

        onPagination();
      }
    });

    if (targetRef?.current) {
      intersectionObserver.observe(targetRef.current);
    }

    return (): void => intersectionObserver.disconnect();
  }, [targetRef, onPagination, nextFrom]);
}
