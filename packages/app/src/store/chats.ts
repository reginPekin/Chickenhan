import { createStore } from '../utils/createStore';

import { Chat, AddChat } from '@chickenhan/sdk/lib/types';
import { chickenhan } from './chickenhan';

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
interface Chats {
  chats: Chat[];
  discover: Chat[];
  nextFromId?: number;
  hasMore?: boolean;
}

export function createChatsStore() {
  const initialState: Chats = {
    chats: [],
    discover: [],
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  async function addChat(chat: AddChat): Promise<void> {
    const addedChat = await chickenhan.chats.createChat(chat);

    if (addedChat.hasOwnProperty('error')) {
      return;
    }
    chickenhan.userChats.addChatToUser(addedChat.chatId);
    setState({ ...state, chats: [...state.chats, addedChat] });
  }

  async function joinChat(chatId: number): Promise<void> {
    await chickenhan.userChats.addChatToUser(chatId);

    const addedChat = await chickenhan.chats.getChatById(chatId);
    setState({ ...state, chats: [...state.chats, addedChat] });
  }

  async function leaveChat(chatId: number): Promise<void> {
    await chickenhan.userChats.removeChatFromUser(chatId);

    const removedChatIndex = state.chats.findIndex(
      chat => chat.chatId === chatId,
    );
    const clonedChats = [...state.chats];
    clonedChats.splice(removedChatIndex, 1);
    setState({ ...state, chats: clonedChats });
  }

  async function fetchUserChats(): Promise<void> {
    const chats = await chickenhan.userChats.getMyChats();

    if (chats.hasOwnProperty('error')) {
      setState({ ...state, chats: [] });
    } else {
      setState({ ...state, chats: [...chats] });
    }
  }

  async function fetchDiscoverChats(): Promise<void> {
    if (state.hasMore === false) return;

    const chats = await chickenhan.chats.getDiscoverChats(state.nextFromId);

    if (chats.hasOwnProperty('error')) {
      setState({ ...state, discover: [] });
    } else {
      setState({
        ...state,
        discover: [...state.discover, ...chats.list],
        hasMore: chats.hasMore,
        nextFromId: chats.nextFromId,
      });
    }
  }

  //   function update(partialState: Partial<Chat>): void {
  //     setState({ ...state, ...partialState });
  //   }

  return {
    useState,
    useSelector,
    addChat,
    fetchUserChats,
    fetchDiscoverChats,
    leaveChat,
    joinChat,
  };
}
