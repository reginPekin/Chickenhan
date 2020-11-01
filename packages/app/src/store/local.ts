import { createStore } from '../utils/createStore';

export type MenuState = 'discover' | 'chats' | 'profile';
interface Local {
  isProfileOpen: boolean;
  isNewChatPopupOpen: boolean;
  isImagePopupOpen: boolean;
  isPasswordPopupOpen: boolean;
  isBioPopupOpen: boolean;
  currentMenuState: MenuState;
}

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createLocalStore() {
  const initialState: Local = {
    isProfileOpen: false,
    isNewChatPopupOpen: false,
    isImagePopupOpen: false,
    isPasswordPopupOpen: false,
    isBioPopupOpen: false,
    currentMenuState: 'chats',
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<Local>): void {
    setState({ ...state, ...partialState });
  }

  function reset(): void {
    setState(initialState);
  }

  return { useState, useSelector, update, reset };
}
