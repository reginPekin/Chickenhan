import React, { useState } from 'react';

import cx from 'classnames';

import styles from './NewChatPopup.module.css';

import { InputWithLabel } from '@chickenhan/components/src/InputWithLabel';
import { Select } from '@chickenhan/components/src/Select';

import { DeleteIcon } from '../Icons';

interface PopupProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
}

export const NewChatPopup: React.FC<PopupProps> = ({
  isPopupOpen,
  setIsPopupOpen,
}) => {
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [chatType, setChatType] = useState<string>('public');

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
    <main
      className={styles.newChat}
      // style={{ display: isPopupOpen ? 'flex' : 'none' }}
    >
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={(): void => setIsPopupOpen(false)}
      />
      <section className={styles.popupContent}>
        <h1>New chat</h1>
        <InputWithLabel
          placeholder="Name"
          isRequired={isRequired}
          setIsRequired={(value: boolean): void => setIsRequired(value)}
        />
        <section className={styles.inputElements}>
          <Select
            title="Chat type"
            options={options}
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
    </main>
  );
};
