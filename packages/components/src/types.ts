export interface User {
  id: string;
  login: string;
  isOnline: boolean; // на бэкэ online
  avatar: string;
}

interface Opponent {
  login: string;
  isOnline: boolean; // на бэкэ online
}

export type ChatType = 'dialog' | 'public' | 'private';
export interface Chat {
  isDialog?: Opponent;
  id: string;
  lastMessage?: string;
  lastDateMessage?: string;
  avatar: string;
  type: ChatType;
  // parameters below exists just for public & private types
  name?: string;
  userCount?: number;
}

interface Picture {
  id: string;
  url: string;
  // height: number;
  // width: number;
}

interface Author {
  userId: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  author: Author;
  text: string;
  date: number;
  messageId: string;
  pictures?: Array<Picture>;
}
