import React, { createContext } from 'react';
// import { Chat } from '../../types';
import cx from 'classnames';

import { Chat } from '../../../app/src/components/MenuContent/consts';
import { Avatar } from '../Avatar';

import styles from './ChatLine.module.css';

interface ChatLineProps {
  chat: Chat;
}

export const ChatLine: React.FC<ChatLineProps> = ({ chat }) => {
  function renderUserCount(): React.ReactNode {
    if (!chat.userCount) return null;
    return <span className={styles.userCount}>{chat.userCount} участник</span>; // язык и падежи
  }

  function renderMessageSection(): React.ReactNode {
    return (
      <div className={styles.messageSection}>
        <span
          className={cx(
            styles.lastMessage,
            chat.type === 'dialog'
              ? styles.dialogLastMessage
              : styles.chatLastMessage,
          )}
        >
          {chat.lastMessage}
        </span>
        {renderUserCount()}
      </div>
    );
  }

  return (
    <section className={styles.chatLine}>
      <div className={styles.avatar}>
        <Avatar url={chat.avatar} chatType={chat.type} />
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.headInfo}>
          <span className={styles.name}>{chat.name}</span>
          <span className={styles.lastDateMessage}>{chat.lastDateMessage}</span>
        </div>
        {renderMessageSection()}
      </div>
    </section>
  );
};
