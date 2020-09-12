export type SignupType = 'username' | 'Google' | 'Facebook';

export interface User {
  id: number;
  login: string;
  isOnline: boolean; // на бэкэ online
  avatar: string;
}

export type ChatType = 'dialog' | 'public' | 'private';

export interface Opponent {
  avatar: string;
  isOnline: boolean;
  login: string;
}

export interface ChatWrapper {
  chatId: number;
  type: ChatType;

  avatar: string;
  name?: string;
  userCount?: number;

  opponent?: Opponent;
}

export interface Chat extends ChatWrapper {
  lastMessage?: string;
  lastDateMessage?: string;
}

export interface ChatState extends Chat {
  isLoading: boolean;
}

type LoadStatus = 'loaded' | 'failed' | 'waiting';

interface Picture {
  id: number;
  url: string;
  // height: number;
  // width: number;
}

interface Author {
  id: number;
  login: string;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  author: Author;
  text: string;
  date: string;
  messageId: number;
  pictures?: Array<Picture>;
  // loadStatus?: LoadStatus;
}
