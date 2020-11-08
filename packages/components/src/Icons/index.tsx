import React from 'react';

import styles from './Icons.module.css';

export interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const AddChatIcon: React.FC<IconProps> = React.memo(props => (
  <svg width={24} height={24} viewBox="0 0 93 93" {...props}>
    <rect
      x={1.5}
      y={1.5}
      width={90}
      height={90}
      rx={18.5}
      fill={props.fill || 'none'}
      stroke="var(--black)"
      strokeWidth={5}
    />
    <path d="M47 18L47 78" stroke="var(--black)" strokeWidth={5} />
    <line
      x1={17}
      y1={48.5}
      x2={77}
      y2={48.5}
      stroke="var(--black)"
      strokeWidth={5}
    />
  </svg>
));

export const SearchIcon: React.FC<IconProps> = React.memo(props => (
  <svg viewBox="0 0 48 50" {...props}>
    <circle
      cx={16.5}
      cy={16.5}
      r={14.5}
      stroke={props.stroke || '#C4C4C4'}
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
      fill={props.stroke || '#C4C4C4'}
    />
  </svg>
));

export const DeleteIcon: React.FC<IconProps> = React.memo(props => (
  <svg viewBox="0 0 64 64" {...props}>
    <path
      d="M63.381 63.381C62.5557 64.2063 61.2177 64.2063 60.3924 63.381L0.61898 3.60764C-0.206319 2.78235 -0.20632 1.44427 0.618978 0.618974C1.44428 -0.206325 2.78235 -0.206324 3.60765 0.618974L63.381 60.3923C64.2063 61.2176 64.2063 62.5557 63.381 63.381Z"
      fill={props.fill || '#C4C4C4'}
      strokeWidth={4}
    />
    <path
      d="M0.618974 63.381C-0.206325 62.5557 -0.206325 61.2177 0.618974 60.3924L60.3924 0.618985C61.2177 -0.206313 62.5557 -0.206315 63.381 0.618983C64.2063 1.44428 64.2063 2.78235 63.381 3.60765L3.60764 63.381C2.78235 64.2063 1.44427 64.2063 0.618974 63.381Z"
      fill={props.fill || '#C4C4C4'}
      strokeWidth={4}
    />
  </svg>
));

export const SendMessageIcon: React.FC<IconProps> = React.memo(props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 29 30"
    fill={props.fill || 'none'}
    {...props}
  >
    <path
      d="M26.683 13.2345L4.41607 1.38275C2.70751 0.473352 0.832336 2.27919 1.67675 4.02079L7 15L1.67675 25.9792C0.832335 27.7208 2.70751 29.5266 4.41607 28.6173L26.683 16.7655C28.0967 16.013 28.0967 13.987 26.683 13.2345Z"
      stroke="#FFC224"
      strokeWidth={4}
    />
  </svg>
));

export const PasswordEyeIcon: React.FC<IconProps> = React.memo(props => (
  <svg
    width={props.width || 24}
    height={props.height || 12}
    viewBox="0 0 50 23"
    fill="none"
    {...props}
  >
    <circle cx={24.5} cy={14.5} r={8.5} fill="var(--black)" />
    <path
      d="M1 11.5L7.384 6.92017C17.4077 -0.270748 30.8116 -0.592494 41.1688 6.10921L49.5 11.5"
      stroke="var(--black)"
      strokeWidth={3}
    />
  </svg>
));

export const ClosedPasswordEyeIcon: React.FC<IconProps> = React.memo(props => (
  <svg
    width={props.width || 24}
    height={props.height || 12}
    viewBox="0 0 51 24"
    fill="none"
    {...props}
  >
    <path
      d="M49.5 2L43.116 6.57983C33.0923 13.7707 19.6884 14.0925 9.33122 7.39079L1 2"
      stroke="var(--black)"
      strokeWidth="3"
    />
    <line
      x1={11.2862}
      y1={8.77174}
      x2={5.28624}
      y2={18.7717}
      stroke="var(--black)"
      strokeWidth={3}
    />
    <line
      x1={20.3559}
      y1={11.9652}
      x2={18.5346}
      y2={23.484}
      stroke="var(--black)"
      strokeWidth={3}
    />
    <line
      y1={-1.5}
      x2={11.6619}
      y2={-1.5}
      transform="matrix(0.15617 0.98773 0.98773 -0.15617 32 12)"
      stroke="var(--black)"
      strokeWidth={3}
    />
    <line
      y1={-1.5}
      x2={11.6619}
      y2={-1.5}
      transform="matrix(0.514496 0.857493 0.857493 -0.514496 41 8)"
      stroke="var(--black)"
      strokeWidth={3}
    />
  </svg>
));

export const WarningIcon: React.FC<IconProps> = React.memo(props => (
  <svg
    width={props.width || 12}
    height={props.width || 12}
    viewBox="0 0 77 77"
    fill="none"
    {...props}
  >
    <circle cx={38.5} cy={38.5} r={37} stroke="var(--red)" strokeWidth={3} />
    <circle cx={39} cy={61} r={4} fill="var(--red)" />
    <path d="M34 13L35.1688 51H43.0909L44 13H34Z" fill="var(--red)" />
  </svg>
));

export const MoreIcon: React.FC = React.memo(() => (
  <section className={styles.moreIconSection}>
    <div className={styles.moreIcon} />
    <div className={styles.moreIcon} />
    <div className={styles.moreIcon} />
  </section>
));

export const ArrowIcon: React.FC<IconProps> = React.memo(props => (
  <svg width={15} height={25} viewBox="0 0 99 160" fill="none" {...props}>
    <rect
      x="79.9087"
      y="0.0506592"
      width="25.1899"
      height="112.138"
      rx="12.595"
      transform="rotate(45 79.9087 0.0506592)"
      fill="var(--main-yellow)"
    />
    <rect
      x="1"
      y="79.812"
      width="25.1899"
      height="112.138"
      rx="12.595"
      transform="rotate(-45 1 79.812)"
      fill="var(--main-yellow)"
    />
  </svg>
));
