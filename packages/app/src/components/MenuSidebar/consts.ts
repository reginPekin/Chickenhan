import { Compass, ProfileIcon, ChatIcon } from '../Icons';

export const menuElements = [
  // {
  //   name: 'chats',
  //   src: 'chickenhan', // иконка Чикенхана, которая ведёт к чатам, описания не будет
  // },
  {
    index: 0,
    description: 'Explore public chats',
    name: 'discover',
    src: Compass,
  },
  {
    index: 1,
    description: 'Home',
    name: 'chats',
    src: ChatIcon,
  },
  {
    index: 2,
    description: 'Profile', // в последствии можно писать имя пользователя
    name: 'profile',
    src: ProfileIcon,
  },
];
