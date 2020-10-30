import React, { useEffect, useContext, useRef } from 'react';
import { BioContext } from '../App';

import { Message } from '@chickenhan/components/src/Message';
import { Chat, User } from '@chickenhan/sdk/lib/types';
import { usePagination } from '@chickenhan/components/src/utils/hooks';

import { useStore } from '../../store';

import styles from './ChatMessages.module.css';

interface ChatMessagesProps {
  chat: Chat;
  user: User;
  getMessagesRef: () => React.RefObject<HTMLDivElement>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  chat,
  user,
  getMessagesRef,
}) => {
  const store = useStore();
  const messagesApi = store.messages.get(chat.chatId);
  const chatMessages = store.messages.useSelector(
    messages => messages[chat.chatId],
  );

  const messages = chatMessages?.messages || [];
  const lastMessage = messages[messages.length - 1];

  const { changeBioId } = useContext(BioContext);

  const messagesRef = getMessagesRef();
  const checkRef = useRef<HTMLDivElement>(null);

  function openBioPopup(id: number): void {
    changeBioId(id);
    store.local.update({ isBioPopupOpen: true });
  }

  async function fetchMessages(): Promise<void> {
    await messagesApi.fetch();
  }

  usePagination(
    async () => {
      if (messagesRef.current) {
        const scrollBottom =
          messagesRef.current.scrollHeight - messagesRef.current.scrollTop;

        await messagesApi.fetch();
        messagesRef.current.scrollTop =
          messagesRef.current.scrollHeight - scrollBottom;
      }
    },
    checkRef,
    chatMessages?.nextFromId,
  );

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [lastMessage]);

  useEffect(() => {
    fetchMessages();
  }, [chat.chatId]);

  if (!chatMessages?.messages || chatMessages.messages.length === 0) {
    return (
      <div className={styles.emptyMessagesSection}>Write first message</div>
    );
  }

  return (
    <section className={styles.messageSection}>
      <div ref={checkRef} className={styles.paginationIndicator} />
      {chatMessages.messages.map(message => (
        <Message
          message={message}
          key={message.messageId}
          openBioPopup={(id: number): void => openBioPopup(id)}
        />
      ))}
      {(chatMessages.pendingMessages || []).map(message => (
        <Message
          message={{ ...message, author: user }}
          key={message.messageId}
          pending
        />
      ))}
    </section>
  );
};
