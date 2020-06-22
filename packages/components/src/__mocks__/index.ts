import { User, Chat, Message } from '../types';

// export const MOCK_USER_1: User = {
//   // объект с околоюзерами
// };

export const MOCK_CHAT_1: Chat = {
  avatar:
    'https://avatars.mds.yandex.net/get-pdb/1726679/348c049e-7994-4f38-a2e3-736bd18aba02/s1200',
  name: `HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy`,
  type: 'public',
  id: 'ssdf',
  lastMessage: "HI, I'm squirrel",
  lastDateMessage: '11 december',
  userCount: 2300012,
};

export const MOCK_CHAT_2: Chat = {
  avatar:
    'https://avatars.mds.yandex.net/get-pdb/1981641/7ad3904b-41fe-4598-a5df-63c80caa14ff/s1200',
  name: `HI, I'm squirrel`,
  type: 'dialog',
  id: 'ssdf',
  lastMessage: "HI, I'm squirrel",
  lastDateMessage: '11 december',
  userCount: 2300012,
};

// Статья телеграмм проблема настроек каналов

export const MOCK_CHATS_1: Chat[] = [
  {
    isDialog: {
      isOnline: true,
      login: 'Dialog 11',
    },
    id: '1222',
    avatar: `https://avatars.mds.yandex.net/get-pdb/2855558/2aad65f1-4a7e-4be4-a0b1-9da0fef60151/s1200`,
    type: 'dialog',
    lastMessage:
      "HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy",
    lastDateMessage: '21 may', //UTC формат
  },
  {
    name: 'Chat 2',
    type: 'private',
    id: '24123',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/2057074/8bd4d3b9-697a-4049-843d-c592c19298f7/s1200',
    lastMessage:
      "HI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrel",
    lastDateMessage: '12 june',
    userCount: 12,
  },
  {
    name: 'Chat 3',
    type: 'public',
    id: 'ssdf',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/1981641/7ad3904b-41fe-4598-a5df-63c80caa14ff/s1200',
    lastMessage: "HI, I'm squirrel",
    lastDateMessage: '11 december',
    userCount: 321,
  },
];

export const MOCK_MESSAGE_LINE_1: Message = {
  author: {
    userId: '2132123',
    name: 'booka',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
    online: true,
  },
  text: `HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy`,
  date: 1592735749305,
  messageId: '1231233243',
};
