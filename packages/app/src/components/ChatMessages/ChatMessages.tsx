import React, { useEffect, useContext } from 'react';
import { BioContext } from '../App';

import { Message } from '@chickenhan/components/src/Message';

import { Chat, User } from '@chickenhan/sdk/lib/types';

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

  const { changeBioId } = useContext(BioContext);

  const messagesRef = getMessagesRef();

  function openBioPopup(id: number): void {
    changeBioId(id);
    store.local.update({ isBioPopupOpen: true });
  }

  useEffect(() => {
    (async function fetchMessages(): Promise<any> {
      await messagesApi.fetch();
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, 50);
    })();
  }, [chat.chatId]);

  if (!chatMessages?.messages || chatMessages.messages.length === 0) {
    return (
      <div className={styles.emptyMessagesSection}>Write first message</div>
    );
  }
  return (
    <>
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
    </>
  );
};
