import React, { useState } from 'react';

import {
  MOCK_CHATS_1,
  MOCK_CHATS_DISCOVER,
  MOCK_USER_1,
} from '@chickenhan/components/src/__mocks__';

import { MenuHeader } from '@chickenhan/components/src/MenuHeader';
import { Avatar } from '@chickenhan/components/src/Avatar';
import { ChatList } from '@chickenhan/components/src/ChatList';

import styles from './MenuContent.module.css';

import { MenuState } from '../MenuSidebar/consts';

interface MenuContentProps {
  chosenTab: MenuState;
  setIsPopupOpen: (value: boolean) => void;
}

export const MenuContent: React.FC<MenuContentProps> = ({
  chosenTab,
  setIsPopupOpen,
}) => {
  const [chosenChat, setСhosenChat] = useState<string>('');

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
        return (
          <ChatList
            chats={MOCK_CHATS_DISCOVER}
            chosenChat={chosenChat}
            setChosenChat={(id): void => setСhosenChat(id)}
          />
        );
      case 'chats':
        return (
          <ChatList
            chats={MOCK_CHATS_1}
            chosenChat={chosenChat}
            setChosenChat={(id): void => setСhosenChat(id)}
          />
        );
      case 'profile':
        return <ProfileMenu />;
      default:
        return (
          <ChatList
            chats={MOCK_CHATS_1}
            chosenChat={chosenChat}
            setChosenChat={(id): void => setСhosenChat(id)}
          />
        );
    }
  }

  return (
    <aside className={styles.mainSection}>
      <MenuHeader
        label={setLabel()}
        chosenTab={chosenTab}
        setIsPopupOpen={setIsPopupOpen}
      />
      <section className={styles.scrolledChats}>
        <div className={styles.menuContent}>{renderContentSection()}</div>
      </section>
    </aside>
  );
};

const ProfileMenu: React.FC = () => {
  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar url={MOCK_USER_1.avatar} width={96} />
        <span className={styles.name}>{MOCK_USER_1.login}</span>
      </div>
      <nav className={styles.menu}>
        <section className={styles.navSection}>
          <div className={styles.menuLabel}>User</div>
          <div className={styles.menuItem}>Edit profile</div>
        </section>

        <section className={styles.navSection}>
          <div className={styles.menuLabel}>The main</div>
          <div className={styles.menuItem}>Write to developer</div>
          {/* <div className={styles.menuItem}>Mode</div> */}
          <div className={styles.menuItem}>Sign out</div>
        </section>
      </nav>
    </section>
  );
};
