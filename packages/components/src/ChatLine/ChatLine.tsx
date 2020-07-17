import React from 'react';

import cx from 'classnames';

import { Chat } from '../types';
import { Avatar } from '../Avatar';

import styles from './ChatLine.module.css';

interface ChatLineProps {
  chat: Chat;
}

export const ChatLine: React.FC<ChatLineProps> = React.memo(({ chat }) => {
  function renderUserCount(): React.ReactNode {
    if (!chat.userCount) return null;
    return <span className={styles.userCount}>{chat.userCount} участник</span>; // язык и падежи
  }

  if (chat.opponent)
    return (
      <section className={styles.chatLine}>
        <div className={styles.avatar}>
          <Avatar url={chat.avatar} chatType={chat.type} />
          {chat.opponent.isOnline && <div className={styles.onlineCircle} />}
        </div>
        <div className={styles.chatInfo}>
          <div className={styles.headInfo}>
            <span className={styles.name}>{chat.opponent.login}</span>
            <span className={styles.lastDateMessage}>
              {chat.lastDateMessage}
            </span>
          </div>
          <div className={styles.messageSection}>
            <span className={cx(styles.lastMessage, styles.dialogLastMessage)}>
              {chat.lastMessage}
            </span>
          </div>
        </div>
      </section>
    );

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
        <div className={styles.messageSection}>
          <span className={cx(styles.lastMessage, styles.chatLastMessage)}>
            {chat.lastMessage}
          </span>
          {renderUserCount()}
        </div>
      </div>
    </section>
  );
});
