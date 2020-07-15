import { createStore } from '../utils/createStore';

interface User {
  id: string;
  login: string;
  isOnline: boolean;
  avatar: string;
}

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUserStore() {
  const initialState: User = {
    id: '23423423',
    login: 'Begin',
    isOnline: true,
    avatar: `https://imgtest.mir24.tv/uploaded/images/crops/2018/September/870x489_0x47_detail_crop_af43017eebc9b37984240ffb3877c8aef3aa8f499eaf279991aa312a36b83f25.jpg`,
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<User>): void {
    setState({ ...state, ...partialState });
  }

  return { useState, useSelector, update };
}
