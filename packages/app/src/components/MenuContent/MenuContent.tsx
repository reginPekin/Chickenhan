import React from 'react';

import { chats } from './consts';

import { ChatLine } from '@chickenhan/components/src/ChatLine';
import { Header } from '@chickenhan/components/src/Header';

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
      case 'newChat':
        return 'Add new chat';
      default:
        return 'Chats';
    }
  }

  return (
    <section className={styles.mainSection}>
      <Header label={setLabel()} choosenTab={choosenTab} />
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
