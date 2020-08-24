import React, { useEffect } from 'react';

import { Message } from '@chickenhan/components/src/Message';

import { Chat, User } from '@chickenhan/components/src/types';

import { useStore } from '../../store';

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
  const messagesApi = store.messages.get(chat.id);
  const chatMessages = store.messages.useSelector(
    messages => messages[chat.id],
  );

  const messagesRef = getMessagesRef();

  useEffect(() => {
    (async function fetchMessages(): Promise<any> {
      await messagesApi.fetch();
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, 50);
    })();
  }, [chat.id]);

  if (!chatMessages?.messages || chatMessages.messages.length === 0) {
    return <div>Напиши первое сообщение</div>;
  }
  return (
    <>
      {chatMessages.messages.map(message => (
        <Message message={message} key={message.messageId} />
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
