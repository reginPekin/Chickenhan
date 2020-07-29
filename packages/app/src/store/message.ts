import { createStore } from '../utils/createStore';

import { Message } from '@chickenhan/components/src/types';

interface Messages {
  id: string;
  messages: Message[];
}

export function createMessageStore() {
  const initialState: Messages = {
    id: '',
    messages: [],
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<Messages>): void {
    setState({ ...state, ...partialState });
  }

  function addMessage(newMessage: Message): void {
    setState({ ...state, messages: [...state.messages, newMessage] });
  }

  return { useState, useSelector, addMessage, update };
}
