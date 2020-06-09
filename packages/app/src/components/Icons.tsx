import React from 'react';

export interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
}

export const LogoIcon: React.FC = () => (
  <svg width={40} height={40} viewBox="0 0 46 52" fill="none">
    <path
      d="M18.3965 7.59629L13.968 4.27489"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.0536 6.48919L19.2822 2.72499"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.5964 7.15339L24.8178 1.39639"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.989 43.91C50 35 40.7604 26.196 40.7604 26.196C40.7604 13.1084 30.7284 8.7234 25.4882 7.3256C23.5585 6.8109 21.5249 6.8173 19.6082 7.3786C4.14177 11.9076 5.33247 26.196 5.33247 26.196C-3.00003 36 6.43957 43.4671 6.43957 43.4671C6.43957 43.4671 23.0464 58.0812 38.989 43.91Z"
      fill="#FCEA2B"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9608 27.4246C17.6176 27.4246 18.9608 26.0814 18.9608 24.4246C18.9608 22.7677 17.6176 21.4246 15.9608 21.4246C14.3039 21.4246 12.9608 22.7677 12.9608 24.4246C12.9608 26.0814 14.3039 27.4246 15.9608 27.4246Z"
      fill="black"
    />
    <path
      d="M31 27C32.6569 27 34 25.6569 34 24C34 22.3431 32.6569 21 31 21C29.3431 21 28 22.3431 28 24C28 25.6569 29.3431 27 31 27Z"
      fill="black"
    />
    <path
      d="M23.7052 30.8074C23.7052 30.8074 34.1798 30.2925 23.7052 40.0761C23.7052 40.076 13.2306 30.8074 23.7052 30.8074Z"
      fill="#F1B31C"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddChatIcon: React.FC<IconProps> = ({ fill = 'none' }) => {
  return (
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
      <line
        x1={17}
        y1={48.5}
        x2={77}
        y2={48.5}
        stroke="black"
        strokeWidth={5}
      />
    </svg>
  );
};

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
