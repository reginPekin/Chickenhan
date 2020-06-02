import React from 'react';

export const Compass = () => {
  return (
    <svg width={24} height={24} viewBox="0 0 64 64" fill="none">
      <circle cx={32} cy={32} r={30.5} stroke="black" strokeWidth={3} />
      <path
        d="M25.6113 23.3411L11.8406 44.656L36.564 41.2587L50.6621 20.9254L25.6113 23.3411Z"
        fill="black"
        stroke="black"
      />
      <circle cx={31.5} cy={31.5} r={3.5} fill="white" />
    </svg>
  );
};

export const ProfileIcon = () => {
  return (
    <svg width={24} height={24} viewBox="0 0 89 88" fill="none">
      <path
        d="M44 45C4.80002 45 -0.333311 72.6667 2.00002 86.5H86.5C88.6667 72.6667 83.2 45 44 45Z"
        stroke="black"
        strokeWidth={5}
      />
      <circle cx={44} cy={19} r={17.5} stroke="black" strokeWidth={5} />
    </svg>
  );
};

export const ChatIcon = () => {
  return (
    <svg width={24} height={24} viewBox="0 0 117 90" fill="none">
      <rect
        x={1.5}
        y={1.5}
        width={114}
        height={65}
        rx={8.5}
        stroke="black"
        strokeWidth={5}
      />
      <path d="M10 88L24.5 66.5H51L10 88Z" stroke="black" strokeWidth={5} />
    </svg>
  );
};
