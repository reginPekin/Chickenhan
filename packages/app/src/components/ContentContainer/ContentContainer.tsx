import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import cx from 'classnames';

import styles from './ContentContainer.module.css';

import { PopupProfile } from '../PopupProfile';

import { ChatHeader } from '@chickenhan/components/src/ChatHeader';
import { WriteBox } from '@chickenhan/components/src/WriteBox';
import { Message } from '@chickenhan/components/src/Message';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { sendMessage } from '@chickenhan/components/sdk';

import { useStore } from '../../store';

interface ContentContainerProps {
  setImages64: (paths: string[]) => void;
}
interface ChatContainerProps {
  setImages64: (paths: string[]) => void;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  setImages64,
}) => {
  const { chatId } = useParams();

  const store = useStore();
  const isChatLoading = store.chat.useSelector(state => state.isLoading);
  const isMessageLoading = store.message.useSelector(state => state.isLoading);

  // console.log(isMessageLoading, 'main loading');

  useEffect(() => {
    store.user.fetchUser();
  }, []);

  useEffect(() => {
    if (!chatId) return;

    store.chat.fetchCurrentChat(chatId);
    store.message.fetchCurrentMessage(chatId);
  }, [chatId]);

  if (!chatId) {
    return (
      <main className={cx(styles.contentContainer, styles.undefinedChat)}>
        <span>Chose any chat c:</span>
      </main>
    );
  }

  if (isChatLoading)
    return (
      <main className={cx(styles.contentContainer, styles.undefinedChat)}>
        <span>Loading</span>
      </main>
    );

  return <ChatContaner setImages64={setImages64} />;
};

const ChatContaner: React.FC<ChatContainerProps> = ({ setImages64 }) => {
  const store = useStore();
  const [user] = store.user.useState();
  const [currentChat] = store.chat.useState();
  const isMessageLoading = store.message.useSelector(state => state.isLoading);
  const currentMessages = store.message.useSelector(state => state.messages);

  console.log(isMessageLoading, 'loading');

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
      <PopupProfile />
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
              await store.message.addMessage({
                author: user,
                text: value,
                date: 1592735749305,
                messageId: `${Math.floor(Math.random() * Math.floor(10000))}`,
              });

              if (messageSectionRef.current)
                messageSectionRef.current.scrollTop =
                  messageSectionRef.current.scrollHeight;

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
