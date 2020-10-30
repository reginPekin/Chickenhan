import { createStore } from '../utils/createStore';

import { User } from '@chickenhan/sdk/lib/types';

import { TOKEN_KEY } from '../consts';
import { chickenhan } from './chickenhan';

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUserStore() {
  const initialState: User = {
    id: 0,
    login: '',
    isOnline: true,
    avatar: ``,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<User>): void {
    if (partialState.avatar) {
      const { avatar, ...wrappedUser } = partialState;

      chickenhan.user.editMe(wrappedUser);
      chickenhan.user.editAvatar(avatar);
    } else {
      chickenhan.user.editMe(partialState);
    }
    setState({ ...state, ...partialState });
  }

  async function auth(token: string, user: User): Promise<void> {
    window.localStorage.setItem(TOKEN_KEY, token);
    chickenhan.setToken(token);

    update({ ...user });
  }

  async function fetchUser(): Promise<string> {
    const userInfo = await chickenhan.user.getMe();

    if (userInfo.hasOwnProperty('error')) {
      return 'error';
    }

    update({ ...userInfo });
    return 'ok';
  }

  return { useState, useSelector, update, fetchUser, auth };
}
