import { createStore } from '../utils/createStore';

import { Message } from '@chickenhan/sdk/lib/types';

import { chickenhan } from './chickenhan';

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

    async function fetch(): Promise<void> {
      if (state[chatId]?.hasMore === false) return;

      if (!state[chatId]?.isFetched) {
        update({ isLoading: true });
        const messages = await chickenhan.messages.getMessageList(
          chatId,
          state[chatId]?.nextFromId,
        );
        update({
          messages: messages.list.reverse(),
          nextFromId: messages.nextFromId,
          hasMore: messages.hasMore,
          isLoading: false,
          isFetched: true,
        });
      }
    }

    async function send(newMessage: { text: string }): Promise<void> {
      const message: PendingMessage = {
        text: newMessage.text,
        date: `${new Date().toISOString()}`,
        messageId: state[chatId]!.pendingMessages.length,
      };

      const messagesClone = [...state[chatId]!.messages];

      const clone = [...state[chatId]!.pendingMessages];
      clone.push(message);

      update({ pendingMessages: clone });

      try {
        const result = await chickenhan.messages.addMessage(
          { text: newMessage.text },
          chatId,
        );

        clone.shift();
        update({ pendingMessages: clone });

        messagesClone.push(result);
        update({ messages: messagesClone });
      } catch {
        // поменять статус сообщения в pendingMessage
      }
    }

    function remove(messageId: number): void {
      const messagesClone = [...state[chatId]!.messages];
      const remainingMessages = messagesClone.filter(
        message => message.messageId !== messageId,
      );

      update({
        messages: remainingMessages,
      });
    }

    return { fetch, send };
  }

  return { useState, useSelector, get };
}
