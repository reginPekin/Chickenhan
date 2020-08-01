import { createStore } from '../utils/createStore';

import { Message } from '@chickenhan/components/src/types';

import { getMessage } from '@chickenhan/components/sdk';

interface Messages {
  id: string;
  messages: Message[];
  isLoading: boolean;
}

export function createMessageStore() {
  const initialState: Messages = {
    id: '',
    messages: [],

    isLoading: true,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<Messages>): void {
    setState({ ...state, ...partialState });
  }

  function addMessage(newMessage: Message): void {
    setState({ ...state, messages: [...state.messages, newMessage] });
  }

  async function fetchCurrentMessage(id: string): Promise<void> {
    update({ isLoading: true });
    const currentMessage = await getMessage(id);

    update({ ...currentMessage, isLoading: false });
  }

  return { useState, useSelector, addMessage, update, fetchCurrentMessage };
}
