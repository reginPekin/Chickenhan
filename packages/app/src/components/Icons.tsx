import React from 'react';

export interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export const LogoIcon: React.FC<IconProps> = React.memo(() => (
  <svg width={40} height={40} viewBox="0 0 46 52" fill="none">
    <path
      d="M18.3965 7.59629L13.968 4.27489"
      stroke="var(--black)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.0536 6.48919L19.2822 2.72499"
      stroke="var(--black)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.5964 7.15339L24.8178 1.39639"
      stroke="var(--black)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.989 43.91C50 35 40.7604 26.196 40.7604 26.196C40.7604 13.1084 30.7284 8.7234 25.4882 7.3256C23.5585 6.8109 21.5249 6.8173 19.6082 7.3786C4.14177 11.9076 5.33247 26.196 5.33247 26.196C-3.00003 36 6.43957 43.4671 6.43957 43.4671C6.43957 43.4671 23.0464 58.0812 38.989 43.91Z"
      fill="#FCEA2B"
      stroke="var(--black)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9608 27.4246C17.6176 27.4246 18.9608 26.0814 18.9608 24.4246C18.9608 22.7677 17.6176 21.4246 15.9608 21.4246C14.3039 21.4246 12.9608 22.7677 12.9608 24.4246C12.9608 26.0814 14.3039 27.4246 15.9608 27.4246Z"
      fill="var(--black)"
    />
    <path
      d="M31 27C32.6569 27 34 25.6569 34 24C34 22.3431 32.6569 21 31 21C29.3431 21 28 22.3431 28 24C28 25.6569 29.3431 27 31 27Z"
      fill="var(--black)"
    />
    <path
      d="M23.7052 30.8074C23.7052 30.8074 34.1798 30.2925 23.7052 40.0761C23.7052 40.076 13.2306 30.8074 23.7052 30.8074Z"
      fill="#F1B31C"
      stroke="var(--black)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

export const DiscoverIcon: React.FC<IconProps> = React.memo(
  ({ fill = 'var(--black)', stroke = 'var(--black)' }) => (
    <svg width={26} height={26} viewBox="0 0 282 282" fill="none">
      <path
        d="M194.5 87L117.5 120L87.5 195.5L164 163.5L194.5 87Z"
        fill={fill}
      />
      <circle cx={141} cy={141} r={133.5} stroke={stroke} strokeWidth={15} />
      <rect x={229} y={132} width={45} height={19} rx={9.5} fill={fill} />
      <rect x={8} y={132} width={45} height={19} rx={9.5} fill={fill} />
      <rect
        x={131}
        y={279}
        width={45}
        height={19}
        rx={9.5}
        transform="rotate(-90 131 279)"
        fill={fill}
      />
      <rect
        x={131}
        y={52}
        width={45}
        height={19}
        rx={9.5}
        transform="rotate(-90 131 52)"
        fill={fill}
      />
    </svg>
  ),
);

export const ProfileIcon: React.FC<IconProps> = React.memo(
  ({ fill = 'none', stroke = 'var(--black)' }) => (
    <svg width={26} height={26} viewBox="0 0 237 262" fill={fill}>
      <path
        d="M181.5 67.5C181.5 100.284 153.432 127.5 118 127.5C82.5681 127.5 54.5 100.284 54.5 67.5C54.5 34.7157 82.5681 7.5 118 7.5C153.432 7.5 181.5 34.7157 181.5 67.5Z"
        stroke={stroke}
        strokeWidth={15}
      />
      <path
        d="M117 152C31.8 152 8.83333 220.333 8 254.5H229C227.167 220.333 202.2 152 117 152Z"
        stroke={stroke}
        strokeWidth={15}
      />
    </svg>
  ),
);

export const ChatIcon: React.FC<IconProps> = React.memo(
  ({ fill = 'none', stroke = 'var(--black)' }) => (
    <svg width={26} height={26} viewBox="0 0 270 276" fill={fill}>
      <path
        d="M72 262V220.5H29C14.2 220.5 8.83333 206.5 8 199.5V29.5C8 15.1 22 9.16667 29 8H241C257 8 261.667 22.3333 262 29.5V199.5C262 213.5 248 219.333 241 220.5H134.5L72 262Z"
        stroke={stroke}
        strokeWidth={15}
      />
    </svg>
  ),
);

export const DeleteIcon: React.FC<IconProps> = React.memo(props => (
  <svg viewBox="0 0 64 64" {...props}>
    <path
      d="M63.381 63.381C62.5557 64.2063 61.2177 64.2063 60.3924 63.381L0.61898 3.60764C-0.206319 2.78235 -0.20632 1.44427 0.618978 0.618974C1.44428 -0.206325 2.78235 -0.206324 3.60765 0.618974L63.381 60.3923C64.2063 61.2176 64.2063 62.5557 63.381 63.381Z"
      fill={props.fill || '#C4C4C4'}
      strokeWidth={15}
    />
    <path
      d="M0.618974 63.381C-0.206325 62.5557 -0.206325 61.2177 0.618974 60.3924L60.3924 0.618985C61.2177 -0.206313 62.5557 -0.206315 63.381 0.618983C64.2063 1.44428 64.2063 2.78235 63.381 3.60765L3.60764 63.381C2.78235 64.2063 1.44427 64.2063 0.618974 63.381Z"
      fill={props.fill || '#C4C4C4'}
      strokeWidth={15}
    />
  </svg>
));

export const AvatarLoaderIcon: React.FC<IconProps> = React.memo(props => (
  <svg
    width={props.width || 96}
    height={props.height || 96}
    viewBox="0 0 347 347"
    fill="none"
    {...props}
  >
    <circle cx={173.5} cy={173.5} r={166} stroke="#FFC224" strokeWidth={15} />
    <circle cx={174} cy={146} r={50.5} stroke="#FFC224" strokeWidth={15} />
    <path
      d="M174.5 203.5C93.3 203.1 64.8333 265.333 61.5 295C74.5 308 119.92 338.382 174.5 336.5C247 334 266 311 284.5 295C282.5 265.667 255.7 203.9 174.5 203.5Z"
      stroke="#FFC224"
      strokeWidth={15}
    />
  </svg>
));

export const GoogleIcon: React.FC<IconProps> = React.memo(props => (
  <svg width={25} height={25} {...props}>
    <g fill="none">
      <path
        d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
        fill="#4285F4"
      ></path>
      <path
        d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
        fill="#34A853"
      ></path>
      <path
        d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
        fill="#FBBC05"
      ></path>
      <path
        d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
        fill="#EA4335"
      ></path>
    </g>
  </svg>
));

export const FacebookIcon: React.FC<IconProps> = React.memo(props => (
  <svg width={25} height={25} fill="#3B5998" {...props}>
    <path d="M20.3 4H4.7a.7.7 0 0 0-.7.7v15.6c0 .38.32.7.7.7h8.33v-6.38h-2.12v-2.65h2.12V9.84c0-2.2 1.4-3.27 3.35-3.27.94 0 1.75.07 1.98.1v2.3H17c-1.06 0-1.31.5-1.31 1.24v1.76h2.65l-.53 2.65H15.7l.04 6.38h4.56a.7.7 0 0 0 .71-.7V4.7a.7.7 0 0 0-.7-.7"></path>
  </svg>
));

export const EmailIcon: React.FC<IconProps> = React.memo(props => (
  <svg width={25} height={25} {...props}>
    <path d="M4 6v13h17V6H4zm5.9 7.97l2.6 2.12 2.6-2.12 4.14 4.02H5.76l4.15-4.02zm-4.88 3.32V9.97l4.1 3.35-4.1 3.97zm10.87-3.97l4.1-3.35v7.32l-4.1-3.97zm4.1-6.3v1.64l-7.49 6.12-7.48-6.13V7.01h14.96z"></path>
  </svg>
));
