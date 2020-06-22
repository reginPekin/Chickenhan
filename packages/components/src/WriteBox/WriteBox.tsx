import React from 'react';

import styles from './WriteBox.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SendMessageIcon } from '../Icons';

export const WriteBox: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <BasicInput
        placeholder="Write a message..."
        onSubmit={(): void => undefined}
        inputSectionStyle={{ margin: 0, width: '100%' }}
      />
      <button className={styles.sendMessageButton}>
        <SendMessageIcon />
      </button>
    </footer>
  );
};
