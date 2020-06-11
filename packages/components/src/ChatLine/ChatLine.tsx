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

  if (chat.isDialog)
    return (
      <section className={styles.chatLine}>
        <div className={styles.avatar}>
          <Avatar url={chat.avatar} chatType={chat.type} />
          {chat.isDialog.isOnline && <div className={styles.onlineCircle} />}
        </div>
        <div className={styles.chatInfo}>
          <div className={styles.headInfo}>
            <span className={styles.name}>{chat.isDialog.login}</span>
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
};
