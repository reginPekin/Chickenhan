export type SignupType = 'username' | 'Google' | 'Facebook';

export interface User {
  id: string;
  login: string;
  isOnline: boolean; // на бэкэ online
  avatar: string;
}

interface Opponent {
  isOnline: boolean; // на бэкэ online
  login: string;
}

export type ChatType = 'dialog' | 'public' | 'private';
export interface Chat {
  opponent?: Opponent;
  id: string;
  lastMessage?: string;
  lastDateMessage?: string;
  avatar: string;
  type: ChatType | string;
  // parameters below exists just for public & private types
  name?: string;
  userCount?: number;
}

export interface AddChat {
  type: ChatType;
  name: string;

  avatar?: string;
}

interface Picture {
  id: string;
  url: string;
  // height: number;
  // width: number;
}

interface Author {
  id: string;
  login: string;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  author: Author;
  text: string;
  date: number;
  messageId: string;
  pictures?: Array<Picture>;
  // loadStatus?: LoadStatus;
}

export interface AddMessage {
  pictures?: string[];
  text?: string;
}
// chat_id: number;
//   author_id: number;

//   message_id: BigInt;
//   date: string;

//   text: string;
//   pictures: BigInt[];
