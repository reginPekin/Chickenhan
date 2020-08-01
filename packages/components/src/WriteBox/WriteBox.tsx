import React, { useRef } from 'react';

import styles from './WriteBox.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SendMessageIcon } from '../Icons';

interface WriteBoxProps {
  placeholder?: string;

  onSubmit?: (text: string) => void;
}

export const WriteBox: React.FC<WriteBoxProps> = ({
  placeholder = 'Write a message...',

  onSubmit = (): void => undefined,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onTextSubmit(): void {
    if (!inputRef.current?.value) return;

    onSubmit(inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.inputSection}>
        <BasicInput
          ref={inputRef}
          placeholder={placeholder}
          onSubmit={(): void => onTextSubmit()}
        />
      </section>
      <SendMessageIcon
        onClick={(): void => onTextSubmit()}
        className={styles.sendMessageIcon}
      />
    </footer>
  );
};
