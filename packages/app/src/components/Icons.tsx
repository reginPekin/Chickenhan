import React from 'react';

export interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
}

export const DiscoverIcon: React.FC<IconProps> = ({
  fill = 'black',
  stroke = 'black',
}) => {
  return (
    <svg width={24} height={24} viewBox="0 0 64 64" fill="none">
      <circle cx={32} cy={32} r={30.5} stroke={stroke} strokeWidth={3} />
      <path
        d="M25.6113 23.3411L11.8406 44.656L36.564 41.2587L50.6621 20.9254L25.6113 23.3411Z"
        fill={fill}
        stroke={stroke}
      />
      <circle cx={31.5} cy={31.5} r={3.5} fill="white" />
    </svg>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({
  fill = 'none',
  stroke = 'black',
}) => {
  return (
    <svg width={24} height={24} viewBox="0 0 89 88">
      <path
        d="M44 45C4.80002 45 -0.333311 72.6667 2.00002 86.5H86.5C88.6667 72.6667 83.2 45 44 45Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={5}
      />
      <circle
        cx={44}
        cy={19}
        r={17.5}
        fill={fill}
        stroke={stroke}
        strokeWidth={5}
      />
    </svg>
  );
};

export const ChatIcon: React.FC<IconProps> = ({
  fill = 'none',
  stroke = 'black',
}) => {
  return (
    <svg width={24} height={24} viewBox="0 0 151 138" fill="none">
      <path
        d="M31.9284 107L28.6553 133.903C28.4228 135.712 30.5343 136.863 31.9284 135.687L65 107M12 107H139C144.523 107 149 102.523 149 97V12C149 6.47715 144.523 2 139 2H12C6.47715 2 2 6.47715 2 12V97C2 102.523 6.47715 107 12 107Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={5}
      />
    </svg>
  );
};
