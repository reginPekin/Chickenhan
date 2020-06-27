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
    opponent: {
      isOnline: true,
      login: 'Dialog 11',
    },
    name: '',
    id: '1222',
    avatar: `https://avatars.mds.yandex.net/get-pdb/2855558/2aad65f1-4a7e-4be4-a0b1-9da0fef60151/s1200`,
    type: 'dialog',
    lastMessage:
      "HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy",
    lastDateMessage: '21 may', //UTC формат,
    userCount: 0,
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

export const MOCK_MESSAGES_ARRAY_1: Message[] = [
  {
    author: {
      userId: '2132123',
      name: 'booka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
      isOnline: true,
    },
    text: `HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy`,
    date: 1592735749305,
    messageId: '12312332343',
  },
  {
    author: {
      userId: '34234',
      name: 'fpfpf',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/195449/702a5de0-45db-4c55-adc2-e8add004df55/s1200',
      isOnline: false,
    },
    text: `Фемини́зм (от лат. femina — женщина) — спектр идеологий, политических и социальных движений, направленных на расширение политических, экономических, личных и социальных прав для женщин или преодоление сексизма.`,
    date: 1592735743305,
    messageId: '12312332443',
    pictures: [
      {
        id: '234234',
        url:
          'https://avatars.mds.yandex.net/get-pdb/1515103/3688e88c-ec34-40a7-83f0-e1527cb4000f/s1200',
      },
    ],
  },
  {
    author: {
      userId: '213212345',
      name: 'bookaka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/2729594/f57ccc64-30f2-4fff-8057-567a92b6da8c/s1200',
      isOnline: true,
    },
    text: `Феминистские движения и в прошлом, и в настоящем борются за права женщин: избирательное право, право занимать государственные должности, право на труд и равную оплату труда, право на собственность, образование, участие в сделках, равные права в браке, право на отпуск по беременности и родам, право на телесную автономию и неприкосновенность (защита женщин и девочек от изнасилований, сексуальных домогательств и домашнего насилия). Феминистские движения считаются одной из главных движущих сил крупнейших социальных изменений в области прав женщин, особенно в западных странах, где их деятельность почти единогласно признаётся причиной таких достижений как женское избирательное право, женские репродуктивные права (доступ к средствам контрацепции, право на аборт), право заключать сделки и обладать собственностью и гендерная нейтральность словоупотребления в английском языке.`,
    date: 1512735749305,
    messageId: '12131233243',
  },
  {
    author: {
      userId: '2132123',
      name: 'booka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
      isOnline: true,
    },
    text: ``,
    date: 2592735749305,
    messageId: '12312332483',
    pictures: [
      {
        id: '324',
        url:
          'https://avatars.mds.yandex.net/get-pdb/2813188/d73376b8-066e-4ea0-9300-6147931752e0/s1200',
      },
    ],
  },
  {
    author: {
      userId: '2132123',
      name: 'fpfpf',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/195449/702a5de0-45db-4c55-adc2-e8add004df55/s1200',
      isOnline: false,
    },
    text: `«Первая волна» относится главным образом к суфражистскому движению XIX и начала XX веков, в котором ключевыми вопросами были права собственности для замужних женщин и право голоса для женщин`,
    date: 1190435241305,
    messageId: '1211230043',
  },
  {
    author: {
      userId: '2132123',
      name: 'booka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
      isOnline: true,
    },
    text: `Под «второй волной» понимают идеи и действия, связанные с женским освободительным движением, которое начало развиваться с 1960-х годов и выступало за полное юридическое и социальное равенство женщин и мужчин`,
    date: 1190735241305,
    messageId: '1231721203',
  },
  {
    author: {
      userId: '2132123',
      name: 'booka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
      isOnline: true,
    },
    text: `«Третья волна» является продолжением «второй волны» и реакцией на ряд её неудач. Появление «третьей волны» относят к 1990-м годам и связывают с так называемыми сексуальными войнами между феминистками. Эта дискуссия и последующий глубокий раскол внутри феминизма на антипорнографический феминизм и сексуально-позитивный феминизм считается закатом эры второй волны и началом третьей`,
    date: 1592735749405,
    messageId: '1231253713',
  },
];

export const MOCK_MESSAGE_LINE_1: Message = {
  author: {
    userId: '2132123',
    name: 'booka',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
    isOnline: true,
  },
  text: `HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy`,
  date: 1592735749305,
  messageId: '1231233243',
};

export const MOCK_MESSAGE_LINE_2: Message = {
  author: {
    userId: '2132123',
    name: 'booka',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
    isOnline: true,
  },
  text: ``,
  date: 2592735749305,
  messageId: '12312332473',
  pictures: [
    {
      id: '324',
      url:
        'https://avatars.mds.yandex.net/get-pdb/2813188/d73376b8-066e-4ea0-9300-6147931752e0/s1200',
    },
  ],
};

export const MOCK_MESSAGE_LINE_3: Message = {
  author: {
    userId: '34234',
    name: 'fpfpf',
    avatar:
      'https://avatars.mds.yandex.net/get-pdb/195449/702a5de0-45db-4c55-adc2-e8add004df55/s1200',
    isOnline: false,
  },
  text: `Фемини́зм (от лат. femina — женщина) — спектр идеологий, политических и социальных движений, направленных на расширение политических, экономических, личных и социальных прав для женщин или преодоление сексизма.`,
  date: 1592735743305,
  messageId: '12312332443',
  pictures: [
    {
      id: '234234',
      url:
        'https://avatars.mds.yandex.net/get-pdb/1515103/3688e88c-ec34-40a7-83f0-e1527cb4000f/s1200',
    },
  ],
};
