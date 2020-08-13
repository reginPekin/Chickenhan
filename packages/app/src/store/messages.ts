import { createStore } from '../utils/createStore';

import { Message } from '@chickenhan/components/src/types';

import { fetchMessage, sendMessage } from '@chickenhan/components/sdk/indexOld';

interface MessageUI extends Message {
  status?: 'failed' | 'success';
}

type PendingMessage = Omit<MessageUI, 'author'>;

interface ChatMessages {
  messages: MessageUI[];
  pendingMessages: PendingMessage[];
  isLoading: boolean;
}

interface Messages {
  [chatId: string]: ChatMessages | undefined;
}

export function createMessageStore() {
  const initialState: Messages = {};
  const initialChat: ChatMessages = {
    messages: [],
    pendingMessages: [],
    isLoading: true,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function updateGlobal(updatedState: Messages): void {
    setState({ ...state, ...updatedState });
  }

  function get(chatId: string) {
    if (!state[chatId]) updateGlobal({ [chatId]: initialChat });

    function update(partialChat: Partial<ChatMessages>): void {
      updateGlobal({ [chatId]: { ...state[chatId]!, ...partialChat } });
    }

    async function fetch(): Promise<void> {
      update({ isLoading: true });
      const messages = await fetchMessage(chatId);
      update({ messages, isLoading: false });
    }

    async function send(newMessage: { text: string }): Promise<void> {
      console.log(state[chatId]);
      const message: PendingMessage = {
        text: newMessage.text,
        date: new Date().getTime(),
        messageId: `${state[chatId]!.pendingMessages.length}`,
      };

      const messagesClone = [...state[chatId]!.messages];

      const clone = [...state[chatId]!.pendingMessages];
      clone.push(message);

      update({ pendingMessages: clone });

      try {
        const result = await sendMessage({ ...newMessage, chatId });
        clone.shift();

        messagesClone.push(result);
        update({ messages: messagesClone });
      } catch {
        // поменять статус сообщения в pendingMessage
      }
    }

    // function remove(): void {
    //   return;
    // }

    return { fetch, send };
  }

  // function changeMessageStatus(id: string): void {}

  return { useState, useSelector, get };
}
