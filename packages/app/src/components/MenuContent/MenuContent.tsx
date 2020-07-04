import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MOCK_CHATS_1 } from '@chickenhan/components/src/__mocks__';

import { ChatLine } from '@chickenhan/components/src/ChatLine';
import { MenuHeader } from '@chickenhan/components/src/MenuHeader';

import styles from './MenuContent.module.css';

import { MenuState } from '../MenuSidebar/consts';

interface MenuContentProps {
  choosenTab: MenuState;
  setIsPopupOpen: (value: boolean) => void;
}

export const MenuContent: React.FC<MenuContentProps> = ({
  choosenTab,
  setIsPopupOpen,
}) => {
  const [choosenChat, setChoosenChat] = useState<string>('');
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
      <MenuHeader
        label={setLabel()}
        choosenTab={choosenTab}
        setIsPopupOpen={setIsPopupOpen}
      />
      <section className={styles.scrolledChats}>
        <div className={styles.menuContent}>
          {chats.map(chat => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <div
                className={styles.link}
                style={{
                  backgroundColor:
                    choosenChat === chat.id ? 'var(--light-grey)' : 'white',
                }}
                onClick={(): void => setChoosenChat(chat.id)}
              >
                <ChatLine chat={chat} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};
