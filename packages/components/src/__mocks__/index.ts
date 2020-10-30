import { User, Chat, Message } from '../types';

export const MOCK_USER_1: User = {
  // объект с околоюзерами
  id: '23423423',
  login: 'Begin',
  isOnline: true,
  avatar: `https://imgtest.mir24.tv/uploaded/images/crops/2018/September/870x489_0x47_detail_crop_af43017eebc9b37984240ffb3877c8aef3aa8f499eaf279991aa312a36b83f25.jpg`,
};

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
    name: 'Ведь мы ангелы',
    type: 'private',
    id: '24123',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Andrea_Mantegna_079.jpg/200px-Andrea_Mantegna_079.jpg',
    lastMessage: 'Ангел',
    lastDateMessage: '12 june',
    userCount: 666,
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

export const MOCK_CHATS_DISCOVER: Chat[] = [
  {
    opponent: {
      isOnline: true,
      login: 'Dialog 01',
    },
    name: '',
    id: '122276',
    avatar: `https://pustunchik.ua/uploads/school/cache/9a7adb79dd800aa15c3cc0e482e004c8.jpg`,
    type: 'dialog',
    lastMessage:
      "HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy HI, I'm squirrel. My name is Jongy-Bongy I'm squirrel. My name is Jongy-Bongy",
    lastDateMessage: '21 may', //UTC формат,
    userCount: 0,
  },
  {
    name: 'Chat 02',
    type: 'private',
    id: '2412653',
    avatar:
      'https://avatars.mds.yandex.net/get-zen_doc/1877958/pub_5e3925bf76fc5150e0790c0d_5e39283753de5721ccf79a4e/scale_1200',
    lastMessage:
      "HI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrelHI, I'm squirrel",
    lastDateMessage: '12 june',
    userCount: 12321,
  },
  {
    avatar: 'https://delovoymir.biz/res/images/uploaded/columns/7259.jpg',
    name: `Chicken chat`,
    type: 'public',
    id: '00000000000',
    lastMessage: 'Wow, you are cool <3',
    lastDateMessage: '11 december',
    userCount: 23000010101012,
  },
];

export const MOCK_MESSAGES_ARRAY_1: Message[] = [
  {
    author: {
      id: '2132123',
      login: 'booka',
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
      id: '34234',
      login: 'fpfpf',
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
      id: '213212345',
      login: 'bookaka',
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
      id: '2132123',
      login: 'booka',
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
      id: '2132123',
      login: 'fpfpf',
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
      id: '2132123',
      login: 'booka',
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
      id: '2132123',
      login: 'booka',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/1893445/705ae6fb-5274-4708-b705-0b86cee34927/s1200',
      isOnline: true,
    },
    text: `«Третья волна» является продолжением «второй волны» и реакцией на ряд её неудач. Появление «третьей волны» относят к 1990-м годам и связывают с так называемыми сексуальными войнами между феминистками. Эта дискуссия и последующий глубокий раскол внутри феминизма на антипорнографический феминизм и сексуально-позитивный феминизм считается закатом эры второй волны и началом третьей`,
    date: 1592735749405,
    messageId: '1231253713',
  },
];

export const MOCK_MESSAGES_ARRAY_2: Message[] = [
  {
    author: {
      id: '2132123',
      login: 'Angy',
      avatar:
        'https://img14.postila.ru/resize?w=540&src=%2Fdata%2F7b%2Fa1%2Fd7%2Fbf%2F7ba1d7bf3bd3270754c0d1e52e02059a11d567517aa862363cc8b5ede7e7556b.jpg',
      isOnline: true,
    },
    text: `А́нгел (др.-греч. ἄγγελος, ангелос — «вестник, посланец»), в авраамических религиях — духовное, бесплотное существо, сообщающее волю Бога и обладающее сверхъестественными возможностями. Традиционно ангел изображается как антропоморфное существо с крыльями за спиной.`,
    date: 1592735749305,
    messageId: '12312332343',
  },
  {
    author: {
      id: '34234',
      login: 'Angel',
      avatar:
        'https://2.bp.blogspot.com/-AjoVc3xQlJc/VHhfw-iW3fI/AAAAAAAAGTw/rWWKcQxydcM/s1600/Nancy_Noel_Angel_023.jpg',
      isOnline: false,
    },
    text: `По учению Православной церкви, змей-искуситель — есть не кто иной, как дьявол — падший ангел.`,
    date: 1592735743305,
    messageId: '12312332443',
    pictures: [
      {
        id: '234234',
        url: 'https://sr.gallerix.ru/R/92756855/8365.jpg',
      },
    ],
  },
  {
    author: {
      id: '213212345',
      login: 'Best angel',
      avatar: 'https://pics.livejournal.com/nosh_i/pic/0003p4r3/s320x240',
      isOnline: true,
    },
    text: `За повествованием о грехопадении в Библии вскоре следует упоминание херувима, сохранившего верность Богу.`,
    date: 1512735749305,
    messageId: '12131233243',
  },
  {
    author: {
      id: '2132123',
      login: 'Angy',
      avatar:
        'https://img14.postila.ru/resize?w=540&src=%2Fdata%2F7b%2Fa1%2Fd7%2Fbf%2F7ba1d7bf3bd3270754c0d1e52e02059a11d567517aa862363cc8b5ede7e7556b.jpg',
      isOnline: true,
    },
    text: `Часть богословов в христианстве и иудаизме придерживались мнения о том, что в (Быт. 6:2–4) говорится об ангелах, которые некогда вступали в браки с людьми, порождая исполинов (нефилим).`,
    date: 2592735749305,
    messageId: '12312332483',
  },
  {
    author: {
      id: '2132123',
      login: 'Angel',
      avatar:
        'https://2.bp.blogspot.com/-AjoVc3xQlJc/VHhfw-iW3fI/AAAAAAAAGTw/rWWKcQxydcM/s1600/Nancy_Noel_Angel_023.jpg',
      isOnline: false,
    },
    text: `Среди семи ангелов еврейской религии лишь трое названы в Танахе (Ветхом Завете) по имени: Михаэль, Габриэль и Рафаэль.`,
    date: 1190435241305,
    messageId: '1211230043',
  },
  {
    author: {
      id: '2132123',
      login: 'Angy',
      avatar:
        'https://img14.postila.ru/resize?w=540&src=%2Fdata%2F7b%2Fa1%2Fd7%2Fbf%2F7ba1d7bf3bd3270754c0d1e52e02059a11d567517aa862363cc8b5ede7e7556b.jpg',
      isOnline: true,
    },
    text: `Эти взгляды изложены в апокрифических книгах Еноха и Юбилеев, этого мнения придерживались многие раннехристианские авторы (Иустин Философ, Ириней, Афинагор, Климент Александрийский, Тертуллиан, Амвросий и др.)[4]. В настоящее время этих взглядов придерживаются и Свидетели Иеговы. Большинство прославленных своими экзегетическими трудами отцов Церкви (Иоанн Златоуст, Ефрем Сирин, Феодорит Кирский, Кирилл Иерусалимский, Иероним Стридонский, Августин и др.) придерживались мнения, что под «сынами Божьими» здесь подразумевались благочестивые сифиты (потомки Сифа)`,
    date: 1190735241305,
    pictures: [
      {
        id: '324',
        url: 'https://sr.gallerix.ru/B/1056799967/5802.jpg',
      },
    ],
    messageId: '1231721203',
  },
  {
    author: {
      id: '2132123',
      login: 'Angy',
      avatar:
        'https://img14.postila.ru/resize?w=540&src=%2Fdata%2F7b%2Fa1%2Fd7%2Fbf%2F7ba1d7bf3bd3270754c0d1e52e02059a11d567517aa862363cc8b5ede7e7556b.jpg',
      isOnline: true,
    },
    text: `Ибо в воскресении ни женятся, ни выходят замуж, но пребывают, как Ангелы Божии на небесах.`,
    date: 1592735749405,
    messageId: '1231253713',
  },
];

export const MOCK_MESSAGE_LINE_1: Message = {
  author: {
    id: '2132123',
    login: 'booka',
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
    id: '2132123',
    login: 'booka',
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
    id: '34234',
    login: 'fpfpf',
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

export const MOCK_MESSAGES_1 = {
  id: 'ssdf',
  messages: MOCK_MESSAGES_ARRAY_1,
};

export const MOCK_MESSAGES_2 = {
  id: '24123',
  messages: MOCK_MESSAGES_ARRAY_2,
};

export const MOCK_MESSAGES_3 = {
  id: '1222',
  messages: MOCK_MESSAGES_ARRAY_1,
};

// export const MOCK_MESSAGES_4 = {
//   id: '1222',
//   messages: MOCK_MESSAGES_ARRAY_1,
// };

// export const MOCK_MESSAGES_5 = {
//   id: '1222',
//   messages: MOCK_MESSAGES_ARRAY_1,
// };

export const MOCK_MESSAGES_6 = {
  id: '00000000000',
  messages: MOCK_MESSAGES_ARRAY_1,
};

export const MOCK_MESSAGES_7 = {
  id: '2412653',
  messages: MOCK_MESSAGES_ARRAY_1,
};

export const MOCK_MESSAGES_8 = {
  id: '122276',
  messages: MOCK_MESSAGES_ARRAY_1,
};
