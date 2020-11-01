import { createStore } from '../utils/createStore';

interface ChatWriteBox {
  text: string;
}

interface WriteBoxes {
  [chatId: number]: ChatWriteBox;
}

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createWriteBoxStore() {
  const initialState: WriteBoxes = {};
  const initialWriteBox: ChatWriteBox = { text: '' };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function updateGlobal(updatedState: WriteBoxes): void {
    setState({ ...state, ...updatedState });
  }

  function get(chatId: number) {
    if (!state[chatId]) updateGlobal({ [chatId]: initialWriteBox });

    function update(partialChatWriteBox: Partial<ChatWriteBox>): void {
      updateGlobal({ [chatId]: { ...state[chatId]!, ...partialChatWriteBox } });
    }

    function saveMessage(text: string): void {
      update({ text });
    }

    function clearMessage(): void {
      update({ text: '' });
    }

    function getMessage(): string {
      return state[chatId].text;
    }

    return { saveMessage, clearMessage, getMessage };
  }

  function reset(): void {
    setState(initialState);
  }

  return { useState, useSelector, updateGlobal, get, reset };
}
