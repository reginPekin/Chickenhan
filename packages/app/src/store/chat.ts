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
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<ChatState>): void {
    setState({ ...state, ...partialState });
  }

  async function fetchCurrentChat(id: number): Promise<void> {
    update({ isLoading: true });
    const currentChat = await chickenhan.chats.getChatById(id);

    update({ ...currentChat, isLoading: false });
  }

  return { useState, useSelector, update, fetchCurrentChat };
}
