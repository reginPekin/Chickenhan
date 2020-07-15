import { useContext, createContext } from 'react';

import { createUserStore } from './user';
import { createLocalStore } from './local';

export interface Store {
  user: ReturnType<typeof createUserStore>;
  local: ReturnType<typeof createLocalStore>;
}

let refStore: Store | undefined;

function getStore(): Store {
  const stores = { user: createUserStore(), local: createLocalStore() };

  if (!refStore) {
    refStore = stores;
    (window as any).store = refStore;
  }

  return stores;
}

const StoreContext = createContext(getStore());

export const useStore = (): Store => {
  return useContext(StoreContext);
};
