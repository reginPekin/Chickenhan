import React, { useRef, useCallback, useState } from 'react';

import { ChatMessages } from '../ChatMessages';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';

import { useStore } from '../../store';

import styles from './Chat.module.css';
import { chickenhan } from '../../store/chickenhan';

interface ChatProps {
  chatId: number;

  isChatOpen: boolean;
}

export const Chat: React.FC<ChatProps> = ({ chatId, isChatOpen }) => {
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
        leaveChat={(): Promise<void> => {
          chickenhan.websocket.leaveChat(chatId);
          return store.chats.leaveChat(chatId);
        }}
        setIsChatOpen={(): void => store.local.update({ isChatOpen: false })}
        isOptionsOpen={checkTheChat() && currentChat.type !== 'dialog'}
      />
      <article className={styles.messagesSection} ref={messagesContainerRef}>
        <ChatMessages
          chat={currentChat}
          user={user}
          getMessagesRef={getMessagesRef}
        />
      </article>
      <footer className={styles.footer}>{renderFooter()}</footer>
    </>
  );
};
