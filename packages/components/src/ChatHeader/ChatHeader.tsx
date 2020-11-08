import React, { useState, useMemo } from 'react';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './ChatHeader.module.css';

import { ChatState } from '../types';

import { MoreIcon, ArrowIcon } from '../Icons';

interface ChatHeader {
  chat: ChatState;
  isOptionsOpen?: boolean;

  setIsChatOpen?: () => void;
  leaveChat?: () => Promise<void>;
}

export const ChatHeader: React.FC<ChatHeader> = React.memo(
  ({
    chat,
    isOptionsOpen = false,

    setIsChatOpen = (): void => undefined,
    leaveChat = (): void => undefined,
  }) => {
    const [isMoreIconHover, setIsMoreIconHover] = useState<boolean>(false);

    const chatName = chat.name || '';

    function extractChatAvatar(): string {
      if (chat.type === 'dialog' && chat.opponent) {
        return chat.opponent.avatar;
      }

      return chat.avatar;
    }

    function extractUserCount(): string {
      if (chat.type === 'dialog' && chat.opponent) {
        return 'личные сообщения';
      }
      return `${chat.userCount} ${
        chat.userCount && chat.userCount > 1 ? `members` : `member`
      }`;
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
        <button onClick={setIsChatOpen} className={styles.arrowButton}>
          <ArrowIcon className={styles.arrowIcon} />
        </button>
        <section className={styles.chatInfoSection}>
          <Avatar
            chatType={chat.type}
            url={extractChatAvatar()}
            width={40}
            style={{ marginRight: '16px' }}
          />
          <div className={styles.infoSection}>
            <span className={styles.name}>{extractChatName()}</span>
            <span className={styles.userCount}>{extractUserCount()}</span>
          </div>
          <span
            style={{ display: isOptionsOpen ? 'block' : 'none' }}
            className={styles.moreIcon}
            onMouseEnter={(): void => setIsMoreIconHover(true)}
            onMouseLeave={(): void => {
              setTimeout(() => {
                setIsMoreIconHover(false);
              }, 230);
            }}
          >
            <MoreIcon />
            {MemoizedOptions}
          </span>
        </section>
      </header>
    );
  },
);
