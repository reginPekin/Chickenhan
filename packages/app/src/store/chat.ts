import { createStore } from '../utils/createStore';

import { ChatState } from '@chickenhan/sdk/lib/types';

import { chickenhan } from './chickenhan';

export function createChatStore() {
  const initialState: ChatState = {
    name: '',
    type: 'public',
    chatId: 0,
    avatar: '',
    userCount: 0,

    isLoading: true,
    error: 'Choose any chat c:',
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<ChatState>): void {
    setState({ ...state, ...partialState });
  }

  async function fetchCurrentChat(id: number): Promise<void> {
    update({ isLoading: true });
    const currentChat = await chickenhan.chats.getChatById(id);
    if (currentChat.hasOwnProperty('error')) {
      update({ error: 'No chat' });
      return;
    }

    update({ ...currentChat, isLoading: false, error: '' });
  }

  chickenhan.websocket.addEventListener(
    'message',
    (data: Record<string, any>) => {
      if (!data.type) {
        return;
      }

      const type = data.type;

      if (type === 'joinChat') {
        if (state.chatId === data.chatId) {
          update({ userCount: state.userCount ? state.userCount + 1 : 1 });
        }
      }

      if (type === 'leaveChat') {
        if (state.chatId === data.chatId) {
          update({ userCount: state.userCount ? state.userCount - 1 : 0 });
        }
      }
    },
  );

  function reset(): void {
    setState(initialState);
  }

  return { useState, useSelector, update, fetchCurrentChat, reset };
}
