import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import cx from 'classnames';

import styles from './ContentContainer.module.css';

import { ProfilePopup } from '../ProfilePopup';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { sendMessage, getChat, getMessage } from '@chickenhan/components/sdk';

import { useStore } from '../../store';
import { Chat, Message as MessageType } from '@chickenhan/components/src/types';

interface ContentContainerProps {
  setImages64: (paths: string[]) => void;
}
interface ChatConteinerProps {
  currentChat: Chat;
  currentMessages: MessageType[] | undefined;
  isMessageLoading: boolean;
  setImages64: (paths: string[]) => void;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  setImages64,
}) => {
  const store = useStore();

  const [currentChat, setCurrentChat] = store.chat.useState();
  const currentMessages = store.message.useSelector(
    message => message.messages,
  );

  const [isChatLoading, setIsChatLoading] = useState<boolean>(true);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(true);

  const { chatId } = useParams();

  React.useEffect(() => {
    if (!chatId) return;

    const getCurrentChat = async (): Promise<void> => {
      setIsChatLoading(true);
      await getChat(chatId)
        .then(chat => setCurrentChat(chat))
        .catch(error => console.log(error));
      setIsChatLoading(false);
    };

    const getChatMessages = async (): Promise<void> => {
      setIsChatLoading(true);
      await getMessage(chatId).then(messages => store.message.update(messages));
      setIsMessageLoading(false);
    };

    getCurrentChat();
    getChatMessages();

    return (): void => {
      setIsChatLoading(false);
      setIsMessageLoading(false);

      store.message.update({ messages: [] });
    };
  }, [chatId]);

  if (isChatLoading)
    return (
      <main className={cx(styles.contentContainer, styles.undefinedChat)}>
        <span>Loading</span>
      </main>
    );

  if (!currentChat || currentChat.id === '0') {
    return (
      <main className={cx(styles.contentContainer, styles.undefinedChat)}>
        <span>{isChatLoading ? 'Loading' : 'Chose any chat c:'}</span>
      </main>
    );
  }
  return (
    <ChatContaner
      currentChat={currentChat}
      currentMessages={currentMessages}
      isMessageLoading={isMessageLoading}
      setImages64={setImages64}
    />
  );
};

const ChatContaner: React.FC<ChatConteinerProps> = ({
  currentChat,
  currentMessages,
  isMessageLoading,
  setImages64,
}) => {
  const store = useStore();

  const messageSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageSectionRef.current)
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
  }, [isMessageLoading]);

  function renderMessage(): React.ReactNode {
    if (isMessageLoading) {
      return (
        <article className={styles.loadingMessages}>
          <span>Messages are loading</span>
        </article>
      );
    }

    if (!currentMessages) return;

    return (
      <article className={styles.messagesContainer}>
        {currentMessages.map(message => (
          <Message message={message} key={message.messageId} />
        ))}
      </article>
    );
  }

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
        <ChatHeader chat={currentChat} />
        <section ref={messageSectionRef} className={styles.contentSection}>
          {renderMessage()}
        </section>
        <footer className={styles.footer}>
          <WriteBox
            onSubmit={async (value): Promise<any> => {
              store.message.addMessage({
                author: {
                  userId: '2132123',
                  name: 'reginbegin',
                  avatar:
                    'https://sun9-50.userapi.com/c639718/v639718761/5100a/_h6G0-ct2Is.jpg',
                  isOnline: true,
                },
                text: value,
                date: 1592735749305,
                messageId: `${Math.floor(Math.random() * Math.floor(10000))}`,
              });

              const result = await sendMessage().then(res => res);

              if (result !== 'ok') return;

              // менять состояние сообщения (иконка, которая будет показывать статус отправки)
              console.log('всё оке');
            }}
          />
        </footer>
      </DragAndDrop>
    </main>
  );
};
