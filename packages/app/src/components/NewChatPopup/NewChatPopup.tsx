import React, { useState, useEffect } from 'react';

import cx from 'classnames';

import styles from './NewChatPopup.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';
import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { handleFile } from '@chickenhan/components/src/utils';

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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [chatAvatar, setChatAvatar] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [chatType, setChatType] = useState<string>('public');
  const [chatName, setChatName] = useState<string>('');

  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);

  useEffect(() => {
    handleFile(uploadedFiles, fileUrl => setChatAvatar(fileUrl));
  }, [uploadedFiles]);

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

    setChatAvatar(null);
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
      <DragAndDrop setFiles={(file): void => setUploadedFiles(file)}>
        <section className={styles.popupContent}>
          <h1 className={styles.popupTitle}>New chat</h1>
          <ImageLoader
            files={uploadedFiles}
            onFileLoaded={(file): void => setUploadedFiles(file)}
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
