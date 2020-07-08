import { createStore } from '../utils/createStore';

interface User {
  name: string;
}

// too complex return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUserStore() {
  const initialState: User = {
    name: 'baranka',
  };

  const [state, setState, useState, useSelector] = createStore(initialState);

  function update(partialState: Partial<User>): void {
    setState({ ...state, ...partialState });
  }

  return { useState, useSelector, update };
}
