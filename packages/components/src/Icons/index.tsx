import React from 'react';

import styles from './Icons.module.css';

export interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
  width?: number;
  height?: number;
}

export const AddChatIcon: React.FC<IconProps> = ({ fill = 'none' }) => (
  <svg width={24} height={24} viewBox="0 0 93 93">
    <rect
      x={1.5}
      y={1.5}
      width={90}
      height={90}
      rx={18.5}
      fill={fill}
      stroke="black"
      strokeWidth={5}
    />
    <path d="M47 18L47 78" stroke="black" strokeWidth={5} />
    <line x1={17} y1={48.5} x2={77} y2={48.5} stroke="black" strokeWidth={5} />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  stroke = '#C4C4C4',
  width = 24,
  height = 24,
}) => (
  <svg width={width} height={height} viewBox="0 0 48 50">
    <circle
      cx={16.5}
      cy={16.5}
      r={14.5}
      stroke={stroke}
      strokeWidth={4}
      fill="none"
    />
    <rect
      x={25.6964}
      y={28.9453}
      width={4.654}
      height={27.1723}
      rx={2.327}
      transform="rotate(-41.3881 25.6964 28.9453)"
      fill={stroke}
    />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({
  width = 18,
  height = 18,
  fill = '#C4C4C4',
}) => (
  <svg width={width} height={height} viewBox="0 0 64 64">
    <path
      d="M63.381 63.381C62.5557 64.2063 61.2177 64.2063 60.3924 63.381L0.61898 3.60764C-0.206319 2.78235 -0.20632 1.44427 0.618978 0.618974C1.44428 -0.206325 2.78235 -0.206324 3.60765 0.618974L63.381 60.3923C64.2063 61.2176 64.2063 62.5557 63.381 63.381Z"
      fill={fill}
      strokeWidth={4}
    />
    <path
      d="M0.618974 63.381C-0.206325 62.5557 -0.206325 61.2177 0.618974 60.3924L60.3924 0.618985C61.2177 -0.206313 62.5557 -0.206315 63.381 0.618983C64.2063 1.44428 64.2063 2.78235 63.381 3.60765L3.60764 63.381C2.78235 64.2063 1.44427 64.2063 0.618974 63.381Z"
      fill={fill}
      strokeWidth={4}
    />
  </svg>
);

export const SendMessageIcon: React.FC = () => (
  <svg width={24} height={24} viewBox="0 0 29 30" fill="none">
    <path
      d="M26.683 13.2345L4.41607 1.38275C2.70751 0.473352 0.832336 2.27919 1.67675 4.02079L7 15L1.67675 25.9792C0.832335 27.7208 2.70751 29.5266 4.41607 28.6173L26.683 16.7655C28.0967 16.013 28.0967 13.987 26.683 13.2345Z"
      stroke="#FFC224"
      strokeWidth={4}
    />
  </svg>
);

export const MoreIcon: React.FC = () => (
  <section className={styles.moreIconSection}>
    <div className={styles.moreIcon} />
    <div className={styles.moreIcon} />
    <div className={styles.moreIcon} />
  </section>
);
