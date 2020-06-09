export interface Chat {
  name: string;
  type: 'dialog' | 'public' | 'private';
  avatar: string;
  lastMessage?: string;
  lastDateMessage?: string;
  userCount?: number; // just for public & private types
  isOnline?: boolean; // just for 'dialog' type
}

// Объект отдельный для opponent
// Статья телеграмм проблема настроек каналов

export const chats: Chat[] = [
  {
    name: 'Chat 1',
    type: 'dialog',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/2855558/2aad65f1-4a7e-4be4-a0b1-9da0fef60151/s1200',
    lastMessage:
      "HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy",
    lastDateMessage: '21 may', //UTC формат
    isOnline: false,
  },
  {
    name: 'Chat 2',
    type: 'private',
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
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/1981641/7ad3904b-41fe-4598-a5df-63c80caa14ff/s1200',
    lastMessage: "HI, I'm squirrel",
    lastDateMessage: '11 december',
    userCount: 321,
  },
];
