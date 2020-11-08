import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { MenuInputSearch } from '../MenuInputSearch';

import { ChatLine } from '@chickenhan/components/src/ChatLine';
import { AddChatIcon } from '@chickenhan/components/src/Icons';

import { useStore } from '../../store';

import styles from './MenuChatList.module.css';

interface MenuChatListProps {
  title: 'Chats' | 'Discover';
  isClose: boolean;
  isMatches?: boolean;

  fetchChats?: () => void;
}

export const MenuChatList: React.FC<MenuChatListProps> = React.memo(
  ({
    title,
    isClose,
    isMatches = false,

    fetchChats = (): void => undefined,
  }) => {
    const store = useStore();
    const chats =
      title === 'Chats'
        ? store.chats.useSelector(state => state.chats)
        : store.chats.useSelector(state => state.discover);
    const [currentChat, setCurrentChat] = store.chat.useState();

    useEffect(() => {
      fetchChats();
    }, []);

    return (
      <aside
        className={styles.mainSection}
        style={{ display: isClose ? 'none' : 'flex' }}
      >
        <header className={styles.header}>
          <div className={styles.label}>
            <span>{title}</span>
            <AddChatIcon
              className={styles.addChatIcon}
              onClick={(): void =>
                store.local.update({ isNewChatPopupOpen: true })
              }
            />
          </div>
          {/* <MenuInputSearch /> */}
        </header>

        <section className={styles.scrolledChats}>
          <div className={styles.menuContent}>
            {chats.map(chat => {
              const chatId = chat.chatId;
              const currentChatId = currentChat.chatId;

              const writeBoxText = store.writeBox.get(chatId).getMessage();
              return (
                <Link
                  key={chatId}
                  to={`/chat/${chatId}`}
                  style={{ textDecoration: 'none', color: 'var(--black)' }}
                >
                  <div
                    key={chatId}
                    className={styles.link}
                    style={{
                      backgroundColor:
                        !isMatches && currentChatId === chatId
                          ? 'var(--light-grey)'
                          : 'var(--white)',
                    }}
                    onClick={(): void => {
                      store.local.update({ isChatOpen: true });

                      if (currentChatId !== chatId) {
                        setCurrentChat({ ...chat, isLoading: true });
                      }
                    }}
                  >
                    <ChatLine chat={chat} writeBoxText={writeBoxText} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </aside>
    );
  },
);
