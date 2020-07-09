import React, { useState } from 'react';

import cx from 'classnames';

import styles from './NewChatPopup.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';
import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { DeleteIcon, AvatarLoaderIcon } from '../Icons';

interface PopupProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
}

export const NewChatPopup: React.FC<PopupProps> = ({
  isPopupOpen,
  setIsPopupOpen,
}) => {
  // добавить аватарку по умолчанию
  const [chatAvatar, setChatAvatar] = useState<File[]>([]); // нужен лишь первый элемент chatAvatar[0]
  const [chatType, setChatType] = useState<string>('public');
  const [chatName, setChatName] = useState<string>('');

  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);

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

  function resetNewChatInfo(): void {
    setIsReseted(true);
    setIsRequired(false);

    setChatAvatar([]);
    setChatName('');
  }

  return (
    <main
      className={styles.newChat}
      style={{ display: isPopupOpen ? 'flex' : 'none' }}
    >
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={(): void => {
          setIsPopupOpen(false);
          resetNewChatInfo();
        }}
      />
      <DragAndDrop setFiles={(file): void => setChatAvatar(file)}>
        <section className={styles.popupContent}>
          <h1 className={styles.popupTitle}>New chat</h1>
          <ImageLoader
            files={chatAvatar}
            setFiles={(file): void => setChatAvatar(file)}
            loadedImgStyle={{ height: '120px', maxHeight: '120px' }}
          >
            <AvatarLoaderIcon />
          </ImageLoader>

          <section className={styles.inputElements}>
            <InputWithLabel
              placeholder="Name"
              isReseted={isReseted}
              isRequired={isRequired}
              setValue={(value: string): void => setChatName(value)}
              setIsRequired={(value: boolean): void => {
                setIsRequired(value);
                setIsReseted(false);
              }}
            />
          </section>

          <section className={styles.inputElements}>
            <Select
              title="Chat type"
              options={options}
              isReseted={isReseted}
              setSelectedOption={(value: string): void => setChatType(value)}
            />
          </section>

          <button
            className={cx(styles.basicButton, styles.inputElements)}
            onClick={(): void => undefined}
          >
            Next
          </button>
        </section>
      </DragAndDrop>
    </main>
  );
};
