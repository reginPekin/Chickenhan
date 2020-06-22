import React from 'react';
import styles from './ContentContainer.module.css';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';

import {
  MOCK_MESSAGE_LINE_1,
  MOCK_CHAT_1,
} from '@chickenhan/components/src/__mocks__';

export const ContentContainer: React.FC = () => {
  return (
    <main className={styles.contentContainer}>
      <ChatHeader chat={MOCK_CHAT_1} />
      <section className={styles.contentSection}>
        <Message message={MOCK_MESSAGE_LINE_1} />
      </section>
      <WriteBox />
    </main>
  );
};
