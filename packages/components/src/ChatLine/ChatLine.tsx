import React from 'react';

import cx from 'classnames';

import { Chat } from '../types';
import { Avatar } from '../Avatar';

import { parseTime } from '../utils';

import styles from './ChatLine.module.css';

interface ChatLineProps {
  chat: Chat;
  writeBoxText: string;
}

export const ChatLine: React.FC<ChatLineProps> = React.memo(
  ({ chat, writeBoxText }) => {
    function renderUserCount(): React.ReactNode {
      if (!chat.userCount) return null;
      return (
        <span className={styles.userCount}>
          {chat.userCount} {chat.userCount > 1 ? 'members' : 'member'}
        </span>
      ); // язык и падежи
    }

    function renderMessage(): React.ReactNode {
      if (!writeBoxText)
        return (
          <span
            className={cx(styles.lastMessage, {
              [styles.dialogLastMessage]: chat.opponent,
              [styles.chatLastMessage]: !chat.opponent,
            })}
          >
            {chat.lastMessage}
          </span>
        );

      return (
        <span
          className={cx(styles.lastMessage, {
            [styles.dialogLastMessage]: chat.opponent,
            [styles.chatLastMessage]: !chat.opponent,
          })}
        >
          <span className={styles.draft}>Draft: </span>
          {writeBoxText}
        </span>
      );
    }

    if (chat.opponent)
      return (
        <main>
          <section className={styles.chatLine}>
            <div className={styles.avatar}>
              <Avatar url={chat.avatar} chatType={chat.type} />
              {chat.opponent.isOnline && (
                <div className={styles.onlineCircle} />
              )}
            </div>
            <div className={styles.chatInfo}>
              <div className={styles.headInfo}>
                <span className={styles.name}>{chat.opponent.login}</span>
                <span className={styles.lastDateMessage}>
                  {chat.lastDateMessage && parseTime(chat.lastDateMessage)}
                </span>
              </div>
              <div className={styles.messageSection}>{renderMessage()}</div>
            </div>
          </section>
          <hr
            style={{
              backgroundColor: 'var(--hover-grey)',
              borderRadius: '50%',
              height: 1,
              margin: '0 12px',
            }}
          />
        </main>
      );

    return (
      <main>
        <section className={styles.chatLine}>
          <div className={styles.avatar}>
            <Avatar url={chat.avatar} chatType={chat.type} />
          </div>
          <div className={styles.chatInfo}>
            <div className={styles.headInfo}>
              <span className={styles.name}>{chat.name}</span>
              <span className={styles.lastDateMessage}>
                {chat.lastDateMessage && parseTime(chat.lastDateMessage)}
              </span>
            </div>
            <div className={styles.messageSection}>
              {renderMessage()}
              {renderUserCount()}
            </div>
          </div>
        </section>
        <hr
          style={{
            backgroundColor: 'var(--hover-grey)',
            borderRadius: '50%',
            height: 1,
            margin: '0 12px',
          }}
        />
      </main>
    );
  },
);
