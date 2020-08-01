import { createStore } from '../utils/createStore';

import { Chat } from '@chickenhan/components/src/types';
import { ChatIcon } from '../components/Icons';
import { getUserChats } from '@chickenhan/components/sdk';

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
interface Chats {
  chats: Chat[];
  discover: Chat[];
}

export function createChatsStore() {
  const initialState: Chats = {
    chats: [],
    discover: [],
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function addChat(chat: Chat): void {
    setState({ ...state, chats: [...state.chats, chat] });
  }

  async function fetchUserChats(): Promise<void> {
    const chats = await getUserChats();
    setState({ ...state, chats: [...chats] });
  }

  //   function update(partialState: Partial<Chat>): void {
  //     setState({ ...state, ...partialState });
  //   }

  return { useState, useSelector, addChat, fetchUserChats };
}
