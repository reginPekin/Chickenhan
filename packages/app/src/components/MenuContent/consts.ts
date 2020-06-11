interface Opponent {
  login: string;
  isOnline: boolean; // на бэкэ online
}
export interface Chat {
  isDialog?: Opponent;
  id: string;
  lastMessage?: string;
  lastDateMessage?: string;
  avatar: string;
  type: 'dialog' | 'public' | 'private';
  // parameters below exists just for public & private types
  name?: string;
  userCount?: number;
}

// Статья телеграмм проблема настроек каналов

export const chats: Chat[] = [
  {
    isDialog: {
      isOnline: true,
      login: 'Dialog 1',
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
