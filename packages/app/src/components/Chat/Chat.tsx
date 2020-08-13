import React, { useRef, useCallback } from 'react';

import { ChatMessages } from '../ChatMessages';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';

import { useStore } from '../../store';

import styles from './Chat.module.css';

interface ChatProps {
  chatId: string;
}

export const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const store = useStore();
  const [currentChat] = store.chat.useState();
  const [user] = store.user.useState();
  const isMessageLoading = store.messages.useSelector(chat =>
    Boolean(chat[chatId]?.isLoading),
  );

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const getMessagesRef = useCallback((): React.RefObject<HTMLDivElement> => {
    return messagesContainerRef;
  }, [messagesContainerRef]);

  return (
    <>
      <ChatHeader chat={currentChat} />
      <section className={styles.messagesSection} ref={messagesContainerRef}>
        <ChatMessages
          chat={currentChat}
          user={user}
          getMessagesRef={getMessagesRef}
        />
      </section>
      <footer className={styles.footer}>
        <WriteBox
          onSubmit={async (value): Promise<any> => {
            await store.messages.get(chatId).send({ text: value });

            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
            }
          }}
        />
      </footer>
    </>
  );
};
