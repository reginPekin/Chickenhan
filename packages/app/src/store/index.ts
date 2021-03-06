import { useContext, createContext } from 'react';

import { createUserStore } from './user';
import { createLocalStore } from './local';
import { createChatStore } from './chat';
import { createMessageStore } from './messages';
import { createChatsStore } from './chats';
import { createWriteBoxStore } from './writeBox';

export interface Store {
  user: ReturnType<typeof createUserStore>;
  local: ReturnType<typeof createLocalStore>;
  chat: ReturnType<typeof createChatStore>;
  messages: ReturnType<typeof createMessageStore>;
  chats: ReturnType<typeof createChatsStore>;
  writeBox: ReturnType<typeof createWriteBoxStore>;
}

let refStore: Store | undefined;

function getStore(): Store {
  const stores = {
    user: createUserStore(),
    local: createLocalStore(),
    chat: createChatStore(),
    messages: createMessageStore(),
    chats: createChatsStore(),
    writeBox: createWriteBoxStore(),
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
