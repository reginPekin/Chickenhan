import React from 'react';

import { MOCK_CHATS_1 } from '@chickenhan/components/src/__mocks__';

import { ChatLine } from '@chickenhan/components/src/ChatLine';
import { MenuHeader } from '@chickenhan/components/src/MenuHeader';

import styles from './MenuContent.module.css';

import { MenuState } from '../MenuSidebar/consts';

interface MenuContentProps {
  choosenTab: MenuState;
}

export const MenuContent: React.FC<MenuContentProps> = ({ choosenTab }) => {
  // бизнес логика и интерфейс, что, где и как?
  function setLabel(): string {
    switch (choosenTab) {
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

  const chats = MOCK_CHATS_1;
  return (
    <section className={styles.mainSection}>
      <MenuHeader label={setLabel()} choosenTab={choosenTab} />
      <section className={styles.scrolledChats}>
        <div className={styles.menuContent}>
          {chats.map((chat, key) => (
            <ChatLine key={key} chat={chat} />
          ))}
        </div>
      </section>
    </section>
  );
};
