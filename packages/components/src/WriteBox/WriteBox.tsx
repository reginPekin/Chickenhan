import React from 'react';

import styles from './WriteBox.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SendMessageIcon } from '../Icons';

export const WriteBox: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.inputSection}>
        <BasicInput placeholder="Write a message..." />
      </section>
      <button className={styles.sendMessageButton}>
        <SendMessageIcon />
      </button>
    </footer>
  );
};
