import React, { useRef, useCallback, useState } from 'react';

import { ChatMessages } from '../ChatMessages';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';

import { useStore } from '../../store';

import styles from './Chat.module.css';

interface ChatProps {
  chatId: number;
}

export const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const store = useStore();
  const chats = store.chats.useSelector(storeChats => storeChats.chats);
  const writeBoxStore = store.writeBox.get(chatId);
  const [currentChat] = store.chat.useState();
  const [user] = store.user.useState();

  function checkTheChat(): boolean {
    const found = chats.find(chat => chat.chatId === chatId);

    return Boolean(found);
  }

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const getMessagesRef = useCallback((): React.RefObject<HTMLDivElement> => {
    return messagesContainerRef;
  }, [messagesContainerRef]);

  function renderFooter(): React.ReactNode {
    if (!checkTheChat() && currentChat.type !== 'dialog')
      return (
        <button
          className={styles.button}
          onClick={(): Promise<void> => store.chats.joinChat(chatId)}
        >
          Join the chat
        </button>
      );
    return (
      <WriteBox
        key={chatId}
        value={writeBoxStore.getMessage()}
        onSubmit={async (value): Promise<any> => {
          await store.messages.get(chatId).send({ text: value });
          writeBoxStore.clearMessage();

          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
              messagesContainerRef.current.scrollHeight;
          }
        }}
        onBlur={(value): void => {
          writeBoxStore.saveMessage(value);
        }}
      />
    );
  }

  if (currentChat.error) {
    return <div>{currentChat.error}</div>;
  }

  return (
    <>
      <ChatHeader
        chat={currentChat}
        leaveChat={(): Promise<void> => store.chats.leaveChat(chatId)}
        isOptionsOpen={checkTheChat() && currentChat.type !== 'dialog'}
      />
      <section className={styles.messagesSection} ref={messagesContainerRef}>
        <ChatMessages
          chat={currentChat}
          user={user}
          getMessagesRef={getMessagesRef}
        />
      </section>
      <footer className={styles.footer}>{renderFooter()}</footer>
    </>
  );
};
