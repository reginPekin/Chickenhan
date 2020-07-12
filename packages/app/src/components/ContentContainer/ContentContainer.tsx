import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ContentContainer.module.css';

import { ProfilePopup } from '../ProfilePopup';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { handleFile } from '@chickenhan/components/src/utils';

import {
  MOCK_MESSAGES_ARRAY_1,
  MOCK_CHATS_1,
  MOCK_CHATS_DISCOVER,
} from '@chickenhan/components/src/__mocks__';

interface ChatConteinerProps {
  chatId: string;
}

interface ImagePopupProps {
  loadedImgUrl: string | ArrayBuffer | null;
  isOpen: boolean;
}

export const ContentContainer: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <span>HI man</span>;
  return <ChatContaner chatId={chatId} />;
};

const ChatContaner: React.FC<ChatConteinerProps> = ({ chatId }) => {
  const allChats = [...MOCK_CHATS_DISCOVER, ...MOCK_CHATS_1]; // use store

  const [loadedImg, setLoadedImg] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loadedImgUrl, setLoadedImgUrl] = useState<string | ArrayBuffer | null>(
    '',
  );

  handleFile(loadedImg, fileUrl => setLoadedImgUrl(fileUrl));

  const filteredChat = allChats.filter(chat => chat.id === chatId)[0];

  return (
    <main className={styles.contentContainer}>
      <ProfilePopup />
      <ImagePopup loadedImgUrl={loadedImgUrl} isOpen={isOpen} />
      <ChatHeader chat={filteredChat} />
      <DragAndDrop
        setFiles={(file): void => setLoadedImg(file)}
        dropEvent={(): void => setIsOpen(true)}
      >
        <section className={styles.contentSection}>
          {MOCK_MESSAGES_ARRAY_1.map(message => (
            <Message message={message} key={message.messageId} />
          ))}
        </section>
      </DragAndDrop>
      <WriteBox />
    </main>
  );
};

const ImagePopup: React.FC<ImagePopupProps> = ({ loadedImgUrl, isOpen }) => {
  return (
    <main
      className={styles.popup}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <section className={styles.popupContent}>
        <img
          style={{ height: '100%' }}
          src={loadedImgUrl as string}
          className={styles.img}
        />
      </section>
    </main>
  );
};
