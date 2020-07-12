import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ContentContainer.module.css';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';
import { Avatar } from '@chickenhan/components/src/Avatar';
import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { handleFile } from '@chickenhan/components/src/utils';

import {
  MOCK_MESSAGES_ARRAY_1,
  MOCK_CHATS_1,
  MOCK_CHATS_DISCOVER,
  MOCK_USER_1,
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

  // console.log(loadedImgUrl);

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

const ProfilePopup: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    MOCK_USER_1.avatar,
  ); // use store

  return (
    <main className={styles.profilePopup}>
      <header className={styles.profilePopupModal}>Edit profile</header>
      <section className={styles.sectionProfilePopup}>
        <div className={styles.modalSection}>
          <Avatar url={avatar as string} width={96} />
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event): void => {
              if (event && event.target && event.target.files) {
                handleFile(event.target.files, file => setAvatar(file));
              }
            }}
            style={{ display: 'none' }}
          />
          <span
            onClick={(): void => inputRef.current?.click()}
            className={styles.clicker}
          >
            Upload image
          </span>
        </div>
        <div className={styles.modalSection}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Name</label>
            <div className={styles.input}>
              <BasicInput placeholder={MOCK_USER_1.login} />
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.profilePopupModal}>
        <div className={styles.buttonWrapper}>
          <button className={styles.button}>Save</button>
        </div>
      </footer>
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
