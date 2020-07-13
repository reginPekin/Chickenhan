import React from 'react';

import styles from './ChatList.module.css';

import { Link } from 'react-router-dom';

import { ChatLine } from '../ChatLine';

import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  chosenChat: string;
  setChosenChat: (value: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  chosenChat,
  setChosenChat,
}) => {
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
            className={styles.link}
            style={{
              backgroundColor:
                chosenChat === chat.id ? 'var(--light-grey)' : 'white',
            }}
            onClick={(): void => setChosenChat(chat.id)}
          >
            <ChatLine chat={chat} />
          </div>
        </Link>
      ))}
    </section>
  );
};
