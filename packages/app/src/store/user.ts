import { createStore } from '../utils/createStore';

import { User } from '@chickenhan/sdk/lib/types';

import { getUserInfo } from '@chickenhan/components/sdk/indexOld';
import { TOKEN_KEY } from '../consts';
import { chickenhan } from './chickenhan';

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUserStore() {
  const initialState: User = {
    id: '',
    login: '',
    isOnline: true,
    avatar: ``,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<User>): void {
    setState({ ...state, ...partialState });
  }

  async function auth(token: string, user: User): Promise<void> {
    window.localStorage.setItem(TOKEN_KEY, token);
    chickenhan.setToken(token);

    update({ ...user });
  }

  async function fetchUser(): Promise<void> {
    const userInfo = await getUserInfo();

    update({ ...userInfo });
  }

  return { useState, useSelector, update, fetchUser, auth };
}
