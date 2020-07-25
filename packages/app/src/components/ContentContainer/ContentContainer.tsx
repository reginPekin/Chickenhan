import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './ContentContainer.module.css';

import { ProfilePopup } from '../ProfilePopup';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import {
  MOCK_MESSAGES_ARRAY_1,
  MOCK_CHATS_1,
  MOCK_CHATS_DISCOVER,
} from '@chickenhan/components/src/__mocks__';

import { useStore } from '../../store';

interface ContentContainerProps {
  setImages64: (paths: string[]) => void;
}
interface ChatConteinerProps {
  chatId: string;
  setImages64: (paths: string[]) => void;
}

interface ImagePopupProps {
  loadedImgUrl: string | ArrayBuffer | null;
  isOpen: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  setImages64,
}) => {
  const { chatId } = useParams();

  if (!chatId) return <span>HI man</span>;
  return <ChatContaner chatId={chatId} setImages64={setImages64} />;
};

const ChatContaner: React.FC<ChatConteinerProps> = ({
  chatId,
  setImages64,
}) => {
  const store = useStore();

  const allChats = [...MOCK_CHATS_DISCOVER, ...MOCK_CHATS_1]; // use store

  const filteredChat = allChats.filter(chat => chat.id === chatId)[0];

  if (!filteredChat) return <div>NO CHAT</div>;

  return (
    <main className={styles.contentContainer}>
      <ProfilePopup />
      <DragAndDrop
        onFilesDrop={(paths): void => {
          store.local.update({ isImagePopupOpen: true });
          setImages64(paths);
        }}
        options={{ filesLimit: 10 }}
      >
        <ChatHeader chat={filteredChat} />
        <section className={styles.contentSection}>
          <article className={styles.messagesContainer}>
            {MOCK_MESSAGES_ARRAY_1.map(message => (
              <Message message={message} key={message.messageId} />
            ))}
          </article>
        </section>
        <footer className={styles.footer}>
          <WriteBox />
        </footer>
      </DragAndDrop>
    </main>
  );
};
