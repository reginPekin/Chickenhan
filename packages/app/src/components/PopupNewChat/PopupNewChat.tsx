import React, { useState, useRef, useEffect } from 'react';

import cx from 'classnames';

import styles from './PopupNewChat.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';
import { AvatarLoader } from '@chickenhan/components/src/AvatarLoader';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { DeleteIcon, AvatarLoaderIcon } from '../Icons';

import { useStore } from '../../store';

import { ChatType } from '@chickenhan/sdk/lib/types';

export const PopupNewChat: React.FC = () => {
  const inputWithLabelRef = useRef<HTMLInputElement | null>(null);

  const store = useStore();

  const isPopupOpen = store.local.useSelector(
    local => local.isNewChatPopupOpen,
  );

  const [isNewChatLoading, setIsNewChatLoading] = useState<boolean>(false);

  const [chatAvatar, setChatAvatar] = useState<string>('');
  const [chatType, setChatType] = useState<ChatType>('public'); // настроить Select

  const options: Array<{
    label: string;
    value: ChatType;
    description: string;
    selected?: boolean;
  }> = [
    {
      label: 'Public',
      value: 'public',
      description: 'Visible in group search',
      selected: true,
    },
    // {
    //   label: 'Secret',
    //   value: 'private',
    //   description: 'Only people with invite link can see it',
    // },
  ];

  useEffect(() => {
    if (!isPopupOpen) return;

    inputWithLabelRef.current?.focus();
  }, [isPopupOpen]);

  async function createNewChat(): Promise<void> {
    if (!(inputWithLabelRef.current && inputWithLabelRef.current.value)) {
      return;
    }
    setIsNewChatLoading(true);

    const newChat = {
      type: chatType,
      avatar: chatAvatar,
      name: inputWithLabelRef.current.value,
    };

    store.chats.createChat(newChat);
    store.local.update({ isNewChatPopupOpen: false });
    setIsNewChatLoading(false);
  }

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
              onSubmit={(): void => {
                createNewChat();
              }}
              placeholder="Name"
              ref={inputWithLabelRef}
              focusRef={(): void => inputWithLabelRef.current?.focus()}
            />
          </section>

          <section className={styles.inputElements}>
            <Select
              title="Chat type"
              options={options}
              setSelectedOption={(option): void => setChatType(option.value)}
            />
          </section>

          <button
            className={cx(styles.basicButton, styles.inputElements)}
            onClick={(): void => {
              createNewChat();
            }}
          >
            {!isNewChatLoading ? 'Next' : 'Your chat is creating, wait'}
          </button>
        </section>
      </DragAndDrop>
    </main>
  );
};
