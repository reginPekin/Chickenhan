import React, { useState, useRef } from 'react';

import cx from 'classnames';

import styles from './PopupNewChat.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';
import { AvatarLoader } from '@chickenhan/components/src/AvatarLoader';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { DeleteIcon, AvatarLoaderIcon } from '../Icons';

import { useStore } from '../../store';

import { createChat } from '@chickenhan/components/sdk/indexOld';
import { ChatType } from '@chickenhan/components/src/types';

export const PopupNewChat: React.FC = () => {
  const inputWithLabelRef = useRef<HTMLInputElement | null>(null);

  const store = useStore();

  const isPopupOpen = store.local.useSelector(
    local => local.isNewChatPopupOpen,
  );

  const [isNewChatLoading, setIsNewChatLoading] = useState<boolean>(false);

  const [chatAvatar, setChatAvatar] = useState<string>('');
  const [chatType, setChatType] = useState<ChatType | string>('public'); // настроить Select

  const options = [
    {
      label: 'Public',
      value: 'public',
      description: 'Visible in group search',
      selected: true,
    },
    {
      label: 'Secret',
      value: 'private',
      description: 'Only people with invite link can see it',
    },
  ];

  if (!isPopupOpen) {
    return null;
  }

  return (
    <main className={styles.newChat}>
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={(): void => {
          store.local.update({ isNewChatPopupOpen: false });
          setChatAvatar('');
        }}
      />

      <DragAndDrop
        onFilesDrop={(paths): void => {
          setChatAvatar(paths[0]);
        }}
        options={{ filesLimit: 1 }}
      >
        <section className={styles.popupContent}>
          <h1 className={styles.popupTitle}>New chat</h1>
          <AvatarLoader
            previewImage={chatAvatar}
            onFileLoaded={(image): void => setChatAvatar(image)}
          >
            <AvatarLoaderIcon className={styles.avatarLoaderIcon} />
          </AvatarLoader>

          <section className={styles.inputElements}>
            <InputWithLabel
              placeholder="Name"
              ref={inputWithLabelRef}
              focusRef={(): void => inputWithLabelRef.current?.focus()}
            />
          </section>

          <section className={styles.inputElements}>
            <Select
              title="Chat type"
              options={options}
              setSelectedOption={(value: string): void => setChatType(value)}
            />
          </section>

          <button
            className={cx(styles.basicButton, styles.inputElements)}
            onClick={async (): Promise<void> => {
              if (
                !(inputWithLabelRef.current && inputWithLabelRef.current.value)
              )
                return;
              setIsNewChatLoading(true);
              const result = await createChat().then(res => res);
              if (result !== 'ok') return;

              store.chats.addChat({
                id: `${Math.floor(Math.random() * Math.floor(10000))}`,
                type: chatType,
                avatar:
                  chatAvatar ||
                  'https://chto-takoe-lyubov.net/wp-content/uploads/2020/01/morkov-zagadki.jpg',
                name: inputWithLabelRef.current.value,
                userCount: 1,
              });
              store.local.update({ isNewChatPopupOpen: false });
              setIsNewChatLoading(false);
            }}
          >
            {!isNewChatLoading ? 'Next' : 'Your chat is creating, wait'}
          </button>
        </section>
      </DragAndDrop>
    </main>
  );
};
