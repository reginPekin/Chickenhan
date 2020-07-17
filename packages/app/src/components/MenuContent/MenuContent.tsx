import React, { useState } from 'react';

import {
  MOCK_CHATS_1,
  MOCK_CHATS_DISCOVER,
} from '@chickenhan/components/src/__mocks__';

import { ProfileMenu } from '../ProfileMenu';
import { MenuHeader } from '../MenuHeader';
import { ChatList } from '@chickenhan/components/src/ChatList';

import styles from './MenuContent.module.css';

import { MenuState } from '../MenuSidebar/consts';

interface MenuContentProps {
  chosenTab: MenuState;
}

export const MenuContent: React.FC<MenuContentProps> = ({ chosenTab }) => {
  function setLabel(): string {
    switch (chosenTab) {
      case 'discover':
        return 'Discover';
      case 'chats':
        return 'Chats';
      case 'profile':
        return 'Profile';
      default:
        return 'Chats';
    }
  }

  function renderContentSection(): JSX.Element {
    switch (chosenTab) {
      case 'discover':
        return <ChatList chats={MOCK_CHATS_DISCOVER} />;
      case 'chats':
        return <ChatList chats={MOCK_CHATS_1} />;
      case 'profile':
        return <ProfileMenu />;
      default:
        return <ChatList chats={MOCK_CHATS_1} />;
    }
  }

  return (
    <aside className={styles.mainSection}>
      <MenuHeader label={setLabel()} chosenTab={chosenTab} />
      <section className={styles.scrolledChats}>
        <div className={styles.menuContent}>{renderContentSection()}</div>
      </section>
    </aside>
  );
};
