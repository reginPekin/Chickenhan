import React, { useState, useMemo } from 'react';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './ChatHeader.module.css';

import { Chat } from '../types';

import { MoreIcon } from '../Icons';

interface ChatHeader {
  chat: Chat;
  leaveChat?: () => void;
}

export const ChatHeader: React.FC<ChatHeader> = React.memo(
  ({ chat, leaveChat = (): void => undefined }) => {
    const [isMoreIconHover, setIsMoreIconHover] = useState<boolean>(false);

    const chatName = chat.name || '';

    function extractUserCount(): string {
      if (chat.type === 'dialog' && chat.opponent) {
        return 'личные сообщения';
      }
      return `${chat.userCount} участник(ов)`;
    }

    function extractChatName(): string {
      if (chat.type === 'dialog' && chat.opponent) {
        return chat.opponent.login;
      }

      if (chatName.length > 40) {
        return `${chatName.slice(0, 40)}...`;
      }
      return chatName;
    }

    function renderOptions(): React.ReactNode {
      if (!isMoreIconHover) return null;

      return (
        <div className={styles.options} onClick={(): void => leaveChat()}>
          Leave the chat
        </div>
      );
    }

    const MemoizedOptions = useMemo(renderOptions, [
      isMoreIconHover,
      leaveChat,
    ]);

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
            <span className={styles.userCount}>{extractUserCount()}</span>
          </div>
          <span
            className={styles.moreIcon}
            onMouseEnter={(): void => setIsMoreIconHover(true)}
            onMouseLeave={(): void => setIsMoreIconHover(false)}
          >
            <MoreIcon />
            {MemoizedOptions}
          </span>
        </section>
      </header>
    );
  },
);
