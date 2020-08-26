import { createStore } from '../utils/createStore';

import { Chat } from '@chickenhan/sdk/lib/types';

import { getChat } from '@chickenhan/components/sdk/indexOld';

interface ChatState extends Chat {
  isLoading: boolean;
}

export function createChatStore() {
  const initialState: ChatState = {
    name: '',
    type: 'public',
    id: '0',
    avatar: '',
    userCount: 0,

    isLoading: true,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<ChatState>): void {
    setState({ ...state, ...partialState });
  }

  async function fetchCurrentChat(id: string): Promise<void> {
    update({ isLoading: true });
    const currentChat = await getChat(id);

    update({ ...currentChat, isLoading: false });
  }

  return { useState, useSelector, update, fetchCurrentChat };
}
