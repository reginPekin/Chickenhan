import { IconProps, EmailIcon } from '../Icons';

export interface LoginBlock {
  Icon: React.FC<IconProps>;
  name: string;
}

export const loginBlocks: LoginBlock[] = [
  {
    Icon: EmailIcon,
    name: 'email',
  },
];
