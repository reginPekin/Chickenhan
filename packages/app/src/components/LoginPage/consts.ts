import { IconProps, GoogleIcon, FacebookIcon, EmailIcon } from '../Icons';

export interface LoginBlock {
  Icon: React.FC<IconProps>;
  name: string;
}

export const loginBlocks: LoginBlock[] = [
  {
    Icon: GoogleIcon,
    name: 'Google',
  },
  {
    Icon: FacebookIcon,
    name: 'Facebook',
  },
  {
    Icon: EmailIcon,
    name: 'email',
  },
];
