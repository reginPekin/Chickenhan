import React from 'react';
import { useParams, Route, Switch } from 'react-router-dom';

import styles from './ContentContainer.module.css';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';

import {
  MOCK_MESSAGES_ARRAY_1,
  MOCK_CHATS_1,
} from '@chickenhan/components/src/__mocks__';

export const ContentContainer: React.FC = () => {
  const ChatContaner: React.FC = () => {
    const { chatId } = useParams();

    const filteredChat = MOCK_CHATS_1.filter(chat => chat.id === chatId)[0];

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

  return (
    <Switch>
      <Route path="/">
        <span>HI</span>
      </Route>
      <Route path="/:chatId">
        <ChatContaner />
      </Route>
    </Switch>
  );
};
