import React from 'react';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './ChatHeader.module.css';

import { Chat } from '../types';

import { MoreIcon } from '../Icons';

interface ChatHeader {
  chat: Chat;
}

export const ChatHeader: React.FC<ChatHeader> = ({ chat }) => {
  function extractUserCount(): string {
    if (chat.type === 'dialog' && chat.opponent) {
      return 'личные сообщения';
    }
    return chat.userCount.toString();
  }

  function extractChatName(): string {
    if (chat.type === 'dialog' && chat.opponent) {
      return chat.opponent.login;
    }

    if (chat.name.length > 40) {
      return `${chat.name.slice(0, 40)}...`;
    }
    return chat.name;
  }

  return (
    <header className={styles.headerContent}>
      <section className={styles.chatInfoSection}>
        <Avatar
          chatType={chat.type}
          url={chat.avatar}
          width={40}
          style={{ marginRight: '16px' }}
        />
        <div className={styles.infoSection}>
          <span className={styles.name}>{extractChatName()}</span>
          <span>{extractUserCount()}</span>
        </div>
        <MoreIcon />
      </section>
    </header>
  );
};
