// connect with axioss

import { Chat } from '../src/types';

import {
  MOCK_CHATS_DISCOVER,
  MOCK_CHATS_1,
  MOCK_MESSAGES_1,
  MOCK_MESSAGES_2,
  MOCK_MESSAGES_3,
  // MOCK_MESSAGES_4,
  // MOCK_MESSAGES_5,
  MOCK_MESSAGES_6,
  MOCK_MESSAGES_7,
  MOCK_MESSAGES_8,
} from '../src/__mocks__';

export const getTenorGifs = async (): Promise<void> => {
  const response = await fetch(
    `https://api.tenor.com/v1/trending?key=GQ4H6AD66RC8`,
  );
  const body = await response.json();
  return body;
}; // try catch

const user = {
  id: '23423423',
  login: 'Begin',
  isOnline: true,
  avatar: `https://imgtest.mir24.tv/uploaded/images/crops/2018/September/870x489_0x47_detail_crop_af43017eebc9b37984240ffb3877c8aef3aa8f499eaf279991aa312a36b83f25.jpg`,
};

export async function getUserInfo(): Promise<any> {
  const resp = await new Promise(resolve =>
    setTimeout(() => resolve(user), 200),
  );
  return resp;
}

export async function sendMessage(): Promise<any> {
  const response = await new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve('ok'), 200);
    } catch (error) {
      reject(new Error(error));
    }
  });
  return response;
}

export const getChat = async (id: string): Promise<any> => {
  const allChats = [...MOCK_CHATS_DISCOVER, ...MOCK_CHATS_1]; // use store
  const filteredChat = allChats.filter(chat => chat.id === id)[0];

  const response = await new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(filteredChat), 200);
    } catch (error) {
      reject(new Error(error));
    }
  });

  return response;
};

export const getMessage = async (id: string): Promise<any> => {
  const allMessages = [
    MOCK_MESSAGES_1,
    MOCK_MESSAGES_2,
    MOCK_MESSAGES_3,

    MOCK_MESSAGES_6,
    MOCK_MESSAGES_7,
    MOCK_MESSAGES_8,
  ]; // use store
  const filteredMessage = allMessages.filter(messages => messages.id === id)[0];

  const response = await new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(filteredMessage), 200);
    } catch (error) {
      reject(new Error(error));
    }
  });

  return response;
};

export const createChat = async (): Promise<any> => {
  const response = await new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve('ok'), 200);
    } catch (error) {
      reject(new Error(error));
    }
  });

  return response;
};

export const getUserChats = async (): Promise<Chat[]> => {
  const chats: Chat[] = MOCK_CHATS_1;
  const response = await new Promise<Chat[]>((resolve, reject) => {
    try {
      setTimeout(() => resolve(chats), 200);
    } catch (error) {
      reject(new Error(error));
    }
  });

  return response;
};
