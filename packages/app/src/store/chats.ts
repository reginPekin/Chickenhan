import { createStore } from '../utils/createStore';

import { Chat, AddChat, Message } from '@chickenhan/sdk/lib/types';
import { chickenhan } from './chickenhan';
import { Opponent } from '@chickenhan/components/src/types';

import { createUserStore } from './user';

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

  async function createChat(chat: AddChat): Promise<void> {
    const addedChat = await chickenhan.chats.createChat(chat);

    if (addedChat.hasOwnProperty('error')) {
      return;
    }
    chickenhan.userChats.addChatToUser(addedChat.chatId);
    setState({ ...state, chats: [addedChat, ...state.chats] });
  }

  async function joinChat(chatId: number): Promise<void> {
    await chickenhan.userChats.addChatToUser(chatId);

    const addedChat = await chickenhan.chats.getChatById(chatId);
    setState({ ...state, chats: [addedChat, ...state.chats] });
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
      setState({
        ...state,
        chats: [
          ...chats.sort((a, b) => {
            if (a.lastDateMessage && b.lastDateMessage) {
              return (
                Date.parse(b.lastDateMessage) - Date.parse(a.lastDateMessage)
              );
            }
            return -1;
          }),
        ],
      });
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

  function updateChats(
    chatsId: { chatId: number }[],
    commonParams: Partial<Chat>,
    opponentParams: Partial<Opponent>,
  ): void {
    const chats = state.chats;
    const id = chatsId.map(chat => chat.chatId);

    const updatedChats = chats.map(chat => {
      if (id.indexOf(chat.chatId) !== -1) {
        if (chat.opponent)
          return {
            ...chat,
            ...commonParams,
            opponent: { ...chat.opponent, ...opponentParams },
          };
        else return { ...chat, ...commonParams };
      }
      return chat;
    });

    setState({ ...state, chats: updatedChats });
  }

  function replaceChat(chatId: number): void {
    const chats = state.chats;
    let chosenChat: Chat = chats[0];

    const filteredChat = chats.filter(chat => {
      if (chat.chatId !== chatId) return true;
      chosenChat = chat;
    });

    if (chosenChat.chatId === chats[0].chatId) {
      return;
    }

    setState({ ...state, chats: [chosenChat, ...filteredChat] });
  }

  function isChat(chatId: number): boolean {
    const chats = state.chats;
    const filteredChat = chats.filter(chat => chat.chatId === chatId);

    if (!filteredChat) return false;

    return true;
  }

  function addDialog(dialog: Chat): void {
    setState({ ...state, chats: [dialog, ...state.chats] });
  }

  chickenhan.websocket.addEventListener(
    'message',
    (data: Record<string, any>) => {
      console.log(data, 'data chats');
      if (!data.type) {
        return;
      }

      const type = data.type;

      if (type === 'setOnline') {
        updateChats(data.userDialogs, {}, { isOnline: true });
      }

      if (type === 'setOffline') {
        updateChats(data.userDialogs, {}, { isOnline: false });
      }

      if (type === 'addMessage') {
        const message: Message = data.message;

        if (!message) {
          return;
        }

        updateChats(
          [{ chatId: message.chatId }],
          { lastMessage: message.text },
          {},
        );
        replaceChat(message.chatId);
      }
    },
  );

  return {
    useState,
    useSelector,
    createChat,
    fetchUserChats,
    fetchDiscoverChats,
    leaveChat,
    joinChat,
    isChat,
    updateChats,
    replaceChat,
    addDialog,
  };
}
