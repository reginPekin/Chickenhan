import React, { useState, useEffect, useRef } from 'react';

import cx from 'classnames';

import styles from './NewChatPopup.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';
import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { handleFile } from '@chickenhan/components/src/utils';

import { DeleteIcon, AvatarLoaderIcon } from '../Icons';

import { useStore } from '../../store';

export const NewChatPopup: React.FC = () => {
  const inputWithLabelRef = useRef<HTMLInputElement | null>(null);

  const store = useStore();

  const isPopupOpen = store.local.useSelector(
    local => local.isNewChatPopupOpen,
  );
  // добавить аватарку по умолчанию
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [chatAvatar, setChatAvatar] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [chatType, setChatType] = useState<string>('public');

  // замененяет currentInputWithLabelRef
  // const [chatName, setChatName] = useState<string>('');

  useEffect(() => {
    handleFile(uploadedFiles, fileUrl => setChatAvatar(fileUrl));
  }, [uploadedFiles]);

  if (!isPopupOpen) {
    return null;
  }

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

  return (
    <main className={styles.newChat}>
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={(): void => {
          store.local.update({ isNewChatPopupOpen: false });
          setUploadedFiles([]);
        }}
      />

      <DragAndDrop
        setFiles={(file): void => setUploadedFiles(file)}
        filesAmount={1}
      >
        <section className={styles.popupContent}>
          <h1 className={styles.popupTitle}>New chat</h1>
          <ImageLoader
            files={uploadedFiles}
            onFileLoaded={(file): void => setUploadedFiles(file)}
          >
            <AvatarLoaderIcon className={styles.avatarLoaderIcon} />
          </ImageLoader>

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
            onClick={(): void => console.log(inputWithLabelRef.current?.value)}
          >
            Next
          </button>
        </section>
      </DragAndDrop>
    </main>
  );
};
