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

  async function update(partialState: Partial<User>): Promise<void> {
    // ВАНЯ (3 просблемы)
    /*
      1. update вызывается без самого вызова
    */
    console.log('UPDATE');
    if (partialState.avatar) {
      const { avatar, ...wrappedUser } = partialState;

      const editedUser = chickenhan.user.editMe(wrappedUser);
      const editedAvatar = chickenhan.user.editAvatar(avatar);
    } else {
      const editedUser = await chickenhan.user.editMe(partialState);

      /*
        2. странная типизация, для editedUser предлагает варианты сhickenhan.user
      */

      /*
        3. как ловить ошибки и передавать их в компоненты, при этом ошибок нет в типизации
      */
      console.log(editedUser);
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

  function reset(): void {
    setState(initialState);
  }

  return { useState, useSelector, update, fetchUser, auth, reset };
}
