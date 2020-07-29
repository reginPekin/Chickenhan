import { createStore } from '../utils/createStore';

import { Chat } from '@chickenhan/components/src/types';

export function createChatStore() {
  const initialState: Chat = {
    name: '',
    type: 'public',
    id: '0',
    avatar: '',
    userCount: 0,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<Chat>): void {
    setState({ ...state, ...partialState });
  }

  return { useState, useSelector, update };
}
