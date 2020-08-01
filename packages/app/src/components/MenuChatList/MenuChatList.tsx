import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MenuInputSearch } from '../MenuInputSearch';

import { ChatLine } from '@chickenhan/components/src/ChatLine';
import { AddChatIcon } from '@chickenhan/components/src/Icons';

import { useStore } from '../../store';

import styles from './MenuChatList.module.css';

export const MenuChatList: React.FC = React.memo(() => {
  const store = useStore();
  const chats = store.chats.useSelector(state => state.chats);
  const [currentChat, setCurrentChat] = store.chat.useState();

  useEffect(() => {
    store.chats.fetchUserChats();
  }, []);

  return (
    <aside className={styles.mainSection}>
      <header className={styles.header}>
        <div className={styles.label}>
          <span>Chats</span>
          <AddChatIcon
            className={styles.addChatIcon}
            onClick={(): void =>
              store.local.update({ isNewChatPopupOpen: true })
            }
          />
        </div>
        <MenuInputSearch />
      </header>

      <section className={styles.scrolledChats}>
        <div className={styles.menuContent}>
          {chats.map(chat => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div
                key={chat.id}
                className={styles.link}
                style={{
                  backgroundColor:
                    currentChat.id === chat.id ? 'var(--light-grey)' : 'white',
                }}
                onClick={(): void =>
                  setCurrentChat({ ...chat, isLoading: true })
                }
              >
                <ChatLine chat={chat} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
});
