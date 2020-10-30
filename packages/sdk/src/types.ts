export type SignupType = 'username' | 'Google' | 'Facebook';

export type PictureType = 'UserAvatar' | 'ChatAvatar' | 'Message';

export interface User {
  id: number;
  login: string;
  isOnline: boolean;
  avatar: string;
}

export interface BackUser {
  id: number;
  login: string;
  online: boolean;
  avatar: string;
}

export interface AddChat {
  type: ChatType;
  name: string;

  avatar?: string;
}

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
  messageId: string;
  pictures?: Array<Picture>;
  chatId: number;
  // loadStatus?: LoadStatus;
}

export interface AddMessage {
  pictures?: string[];
  text?: string;
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

  avatar?: string;
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
  error?: string;
}

export interface UserChats {
  userId: number;
  chats: number[];
}
