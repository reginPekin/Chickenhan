import React, { useState } from 'react';

import styles from './ChatList.module.css';

import { Link } from 'react-router-dom';

import { ChatLine } from '@chickenhan/components/src/ChatLine';

import { Chat } from '@chickenhan/components/src/types';

import { useStore } from '../../store';

interface ChatListProps {
  chats: Chat[];
}

export const ChatList: React.FC<ChatListProps> = React.memo(({ chats }) => {
  const [chosenChat, setChosenChat] = useState<string>('');

  const store = useStore();
  // const chats = store.chats.useSelector(re => re);
  const [, setCurrentChat] = store.chat.useState();

  return (
    <section>
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
            key={chat.id}
            className={styles.link}
            style={{
              backgroundColor:
                chosenChat === chat.id ? 'var(--light-grey)' : 'white',
            }}
            onClick={(): void => {
              setChosenChat(chat.id);
              setCurrentChat(chat);
            }}
          >
            <ChatLine chat={chat} />
          </div>
        </Link>
      ))}
    </section>
  );
});
