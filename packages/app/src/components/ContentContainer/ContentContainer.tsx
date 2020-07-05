import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './ContentContainer.module.css';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';

import {
  MOCK_MESSAGES_ARRAY_1,
  MOCK_CHATS_1,
} from '@chickenhan/components/src/__mocks__';

interface ChatConteinerProps {
  chatId: string;
}

export const ContentContainer: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <span>HI man</span>;
  return <ChatContaner chatId={chatId} />;
};

const ChatContaner: React.FC<ChatConteinerProps> = ({ chatId }) => {
  const filteredChat = MOCK_CHATS_1.filter(chat => chat.id === chatId)[0];

  if (!filteredChat) return <div>NO CHAT</div>;

  return (
    <main className={styles.contentContainer}>
      <ChatHeader chat={filteredChat} />
      <section className={styles.contentSection}>
        {MOCK_MESSAGES_ARRAY_1.map(message => (
          <Message message={message} key={message.messageId} />
        ))}
      </section>
      <WriteBox />
    </main>
  );
};
