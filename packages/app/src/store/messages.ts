import { createStore } from '../utils/createStore';

import { Message } from '@chickenhan/sdk/lib/types';

import { chickenhan } from './chickenhan';

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

interface MessageUI extends Message {
  status?: 'failed' | 'success';
}

type PendingMessage = Omit<MessageUI, 'author'>;

interface ChatMessages {
  messages: MessageUI[];
  pendingMessages: PendingMessage[];
  isLoading: boolean;
  isFetched: boolean;
  nextFromId?: number;
  hasMore?: boolean;
}

interface Messages {
  [chatId: number]: ChatMessages | undefined;
}

export function createMessageStore() {
  const initialState: Messages = {};
  const initialChat: ChatMessages = {
    messages: [],
    pendingMessages: [],
    isLoading: true,
    isFetched: false,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function updateGlobal(updatedState: Messages): void {
    setState({ ...state, ...updatedState });
  }

  function get(chatId: number) {
    if (!state[chatId]) updateGlobal({ [chatId]: initialChat });

    function update(partialChat: Partial<ChatMessages>): void {
      updateGlobal({ [chatId]: { ...state[chatId]!, ...partialChat } });
    }

    function updateMessages(
      messagesId: string[],
      commonParams: Partial<MessageUI>,
      authorParams: Partial<Author>,
    ): void {
      const messages = state[chatId]?.messages;

      if (!messages) return;
      const updatedMessages = messages.map(message => {
        if (messagesId.indexOf(message.messageId) !== -1) {
          return {
            ...message,
            ...commonParams,
            author: { ...message.author, ...authorParams },
          };
        } else return { ...message, ...commonParams };
      });

      update({ messages: updatedMessages });
    }

    async function fetch(): Promise<void> {
      if (state[chatId]?.hasMore === false) return;

      update({ isLoading: true });

      const messages = await chickenhan.messages.getMessageList(
        chatId,
        state[chatId]?.nextFromId,
      );

      update({
        messages: [...messages.list.reverse(), ...state[chatId]!.messages],
        nextFromId: messages.nextFromId,
        hasMore: messages.hasMore,
        isLoading: false,
        isFetched: true,
      });
    }

    async function send(newMessage: { text: string }): Promise<void> {
      const message: PendingMessage = {
        text: newMessage.text,
        date: `${new Date().toISOString()}`,
        chatId,
        messageId: `${state[chatId]!.pendingMessages.length}`,
      };

      const messagesClone = [...state[chatId]!.messages];

      // const clone = [...state[chatId]!.pendingMessages];
      // clone.push(message);

      // update({ pendingMessages: clone });

      try {
        chickenhan.websocket.addMessage(newMessage.text, chatId);
        // await chickenhan.eventSource.addMessage(
        //   { text: newMessage.text },
        //   chatId,
        // );
        // clone.shift();
        // update({ pendingMessages: clone });
      } catch {
        // поменять статус сообщения в pendingMessage
      }
    }

    function addMessageToTheList(message: Message): void {
      const messagesClone = [...state[chatId]!.messages];
      messagesClone.push(message);
      update({ messages: messagesClone });
    }

    function remove(messageId: string): void {
      const messagesClone = [...state[chatId]!.messages];
      const remainingMessages = messagesClone.filter(
        message => message.messageId !== messageId,
      );

      update({
        messages: remainingMessages,
      });
    }

    return { fetch, send, updateMessages, addMessageToTheList };
  }

  chickenhan.websocket.addEventListener(
    'message',
    (data: Record<string, any>) => {
      console.log(data, 'data messages');
      if (!data.type) {
        return;
      }

      const type = data.type;
      const message: Message = data.message;

      if (type === 'setOnline') {
        data.userMessages.forEach(
          (messages: { chatId: number; arrayAgg: string[] }) => {
            get(messages.chatId).updateMessages(
              messages.arrayAgg,
              {},
              { isOnline: true },
            );
          },
        );
      }

      if (type === 'setOffline') {
        data.userMessages.forEach(
          (messages: { chatId: number; arrayAgg: string[] }) => {
            get(messages.chatId).updateMessages(
              messages.arrayAgg,
              {},
              { isOnline: false },
            );
          },
        );
      }

      if (type === 'addMessage') {
        if (!message) {
          return;
        }

        get(message.chatId).addMessageToTheList(message);
      }
    },
  );

  return { useState, useSelector, get };
}
