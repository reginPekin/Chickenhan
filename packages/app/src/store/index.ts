import { useContext, createContext } from 'react';

import { createUserStore } from './user';

export interface Store {
  user: ReturnType<typeof createUserStore>;
}

let refStore: Store | undefined;

function getStore(): Store {
  const stores = { user: createUserStore() };

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
