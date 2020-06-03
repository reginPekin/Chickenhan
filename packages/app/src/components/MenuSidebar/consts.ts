import { DiscoverIcon, ProfileIcon, ChatIcon, IconProps } from '../Icons';

export interface MenuElement {
  description?: string;
  name: string;
  Icon: React.FC<IconProps>;
}

export const menuElements: MenuElement[] = [
  {
    description: 'Explore public chats',
    name: 'discover',
    Icon: DiscoverIcon,
  },
  {
    description: 'Home',
    name: 'chats',
    Icon: ChatIcon,
  },
  {
    description: 'Profile', // в последствии можно писать имя пользователя
    name: 'profile',
    Icon: ProfileIcon,
  },
];
