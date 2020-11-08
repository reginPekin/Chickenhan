import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import cx from 'classnames';

import styles from './ChatContainer.module.css';

import { PopupProfile } from '../PopupProfile';
import { Chat } from '../Chat';

import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { useStore } from '../../store';

interface ChatContainerProps {
  setImages64: (paths: string[]) => void;

  isClose: boolean;
  isMatches: boolean;
}
interface ChatLayoutProps {
  chatId: number;
  setImages64: (paths: string[]) => void;

  isClose: boolean;
  isMatches: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  setImages64,
  isClose,
  isMatches,
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

  return (
    <ChatLayout
      setImages64={setImages64}
      chatId={parseInt(chatId)}
      isClose={isClose}
      isMatches={isMatches}
    />
  );
};

const ChatLayout: React.FC<ChatLayoutProps> = ({
  setImages64,
  chatId,
  isClose,
  isMatches,
}) => {
  const store = useStore();

  useEffect(() => {
    store.chat.fetchCurrentChat(chatId);
  }, [chatId]);

  return (
    <main
      className={styles.contentContainer}
      style={{ display: isClose ? 'none' : 'flex' }}
    >
      <PopupProfile />
      <DragAndDrop
        onFilesDrop={(paths): void => {
          store.local.update({ isImagePopupOpen: true });
          setImages64(paths);
        }}
        options={{ filesLimit: 10 }}
      >
        <Chat chatId={chatId} isChatOpen={!isClose && isMatches} />
      </DragAndDrop>
    </main>
  );
};
