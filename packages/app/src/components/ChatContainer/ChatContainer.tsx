import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import cx from 'classnames';

import styles from './ChatContainer.module.css';

import { PopupProfile } from '../PopupProfile';
import { Chat } from '../Chat';

import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { useStore } from '../../store';

interface ChatContainerProps {
  setImages64: (paths: string[]) => void;
}
interface ChatLayoutProps {
  chatId: number;
  setImages64: (paths: string[]) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  setImages64,
}) => {
  const { chatId } = useParams();

  if (!chatId) {
    return (
      <main className={cx(styles.contentContainer, styles.undefinedChat)}>
        <PopupProfile />
        <span>Chose any chat c:</span>
      </main>
    );
  }

  return <ChatLayout setImages64={setImages64} chatId={parseInt(chatId)} />;
};

const ChatLayout: React.FC<ChatLayoutProps> = ({ setImages64, chatId }) => {
  const store = useStore();

  useEffect(() => {
    store.chat.fetchCurrentChat(chatId);
  }, [chatId]);

  return (
    <main className={styles.contentContainer}>
      <PopupProfile />
      <DragAndDrop
        onFilesDrop={(paths): void => {
          store.local.update({ isImagePopupOpen: true });
          setImages64(paths);
        }}
        options={{ filesLimit: 10 }}
      >
        <Chat chatId={chatId} />
      </DragAndDrop>
    </main>
  );
};
