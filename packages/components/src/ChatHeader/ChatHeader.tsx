import React from 'react';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './ChatHeader.module.css';

import { Chat, ChatType } from '../types';

import { MoreIcon } from '../Icons';

interface ChatHeader {
  chat: Chat;
}

export const ChatHeader: React.FC<ChatHeader> = ({ chat }) => {
  function renderUserCount(
    type: ChatType,
    userCount: number | undefined,
  ): number | 'личные сообщения' {
    if (type === 'dialog') return 'личные сообщения';
    return userCount;
  }

  function renderChatName(name: string): string {
    if (name.length > 40) return `${name.slice(0, 40)}...`;
    return name;
  }

  return (
    <header className={styles.headerContent}>
      <section className={styles.chatInfoSection}>
        <Avatar
          chatType={chat.type}
          url={chat.avatar}
          width={40}
          style={{ paddingRight: '16px' }}
        />
        <div className={styles.infoSection}>
          <span className={styles.name}>{renderChatName(chat.name)}</span>
          <span>{renderUserCount(chat.type, chat.userCount)}</span>
        </div>
        <MoreIcon />
      </section>
    </header>
  );
};
