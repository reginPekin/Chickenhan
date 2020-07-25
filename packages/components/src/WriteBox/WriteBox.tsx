import React from 'react';

import styles from './WriteBox.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SendMessageIcon } from '../Icons';

interface WriteBoxProps {
  placeholder?: string;
}

export const WriteBox: React.FC<WriteBoxProps> = ({
  placeholder = 'Write a message...',
}) => {
  return (
    <footer className={styles.footer}>
      <section className={styles.inputSection}>
        <BasicInput placeholder={placeholder} />
      </section>
      <SendMessageIcon className={styles.sendMessageIcon} />
    </footer>
  );
};
