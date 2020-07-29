import { useContext, createContext } from 'react';

import { createUserStore } from './user';
import { createLocalStore } from './local';
import { createChatStore } from './chat';
import { createMessageStore } from './message';
import { createChatsStore } from './chats';

export interface Store {
  user: ReturnType<typeof createUserStore>;
  local: ReturnType<typeof createLocalStore>;
  chat: ReturnType<typeof createChatStore>;
  message: ReturnType<typeof createMessageStore>;
  chats: ReturnType<typeof createChatsStore>;
}

let refStore: Store | undefined;

function getStore(): Store {
  const stores = {
    user: createUserStore(),
    local: createLocalStore(),
    chat: createChatStore(),
    message: createMessageStore(),
    chats: createChatsStore(),
  };

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
