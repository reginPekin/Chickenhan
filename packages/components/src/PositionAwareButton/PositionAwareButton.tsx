import React, { useRef, useEffect, useState } from 'react';

import styles from './PositionAwareButton.module.css';

interface BtnPosnAwrProps {
  children: string;

  backgroundColor?: string;
  hoveredColor?: string;
  clickedColor?: string;
  textColor?: string;

  onClick?: () => void;
}

export const PositionAwareButton: React.FC<BtnPosnAwrProps> = ({
  children,

  backgroundColor = 'var(--main-yellow)',
  hoveredColor = '#ffb100',
  clickedColor = 'var(--hover-main-yellow)',
  textColor = 'var(--light-black)',

  onClick = (): void => undefined,
}) => {
  const btnPosnAwrRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const [isButtonHover, setIsButtonHover] = useState<boolean>(false);

  const listener = (event: MouseEvent): void => {
    if (btnPosnAwrRef.current && spanRef.current) {
      const buttonSize: ClientRect = btnPosnAwrRef?.current?.getBoundingClientRect();

      if (btnPosnAwrRef.current.contains(event.target as Node)) {
        if (spanRef.current) {
          spanRef.current.style.top = `${event.pageY - buttonSize.top}px`;
          spanRef.current.style.left = `${event.pageX - buttonSize.left}px`;
          spanRef.current.style.height = `400%`;
          spanRef.current.style.width = `200%`;
        }
      } else {
        // убрать это за счёт того, что этот эффект будет исчезать сам через некоторое время
        spanRef.current.style.height = `0`;
        spanRef.current.style.width = `0`;
        spanRef.current.style.top = `${event.pageY - buttonSize.top}px`;
        spanRef.current.style.left = `${event.pageX - buttonSize.left}px`;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    return (): void => document.addEventListener('mousedown', listener);
  });

  return (
    <button
      onMouseEnter={(): void => setIsButtonHover(true)}
      onMouseLeave={(): void => setIsButtonHover(false)}
      style={{
        position: 'relative',
        backgroundColor: isButtonHover ? hoveredColor : backgroundColor,
      }}
      ref={btnPosnAwrRef}
      className={styles.btnPosnawr}
      onClick={onClick}
    >
      <span
        ref={spanRef}
        className={styles.span}
        style={{ backgroundColor: clickedColor }}
      />
      <span className={styles.spanText} style={{ color: textColor }}>
        {children}
      </span>
    </button>
  );
};
