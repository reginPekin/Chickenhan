import React from 'react';
import styles from './Menu.module.css';

import { MenuProfile } from '../MenuProfile';
import { MenuChatList } from '../MenuChatList';
import { MenuSidebar } from '../MenuSidebar';

import { useStore } from '../../store';

export const Menu: React.FC = () => {
  const store = useStore();
  const userChats = store.chats.useSelector(allChats => allChats.chats);
  const currentMenuState = store.local.useSelector(
    state => state.currentMenuState,
  );

  function renderCurrentTab(): React.ReactNode {
    switch (currentMenuState) {
      case 'discover':
        return (
          <MenuChatList
            key="discover"
            title="Discover"
            fetchChats={(): void => {
              store.chats.fetchDiscoverChats();
            }}
          />
        );
      case 'chats':
        return (
          <MenuChatList
            key="chat"
            title="Chats"
            fetchChats={(): void => {
              if (userChats.length) {
                return;
              }
              store.chats.fetchUserChats();
            }}
          />
        );
      case 'profile':
        return <MenuProfile />;
    }
  }

  return (
    <div className={styles.menuContainer}>
      <MenuSidebar />
      {renderCurrentTab()}
    </div>
  );
};
