import React, { useEffect, useRef, useState } from 'react';

import styles from './WriteBox.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SendMessageIcon } from '../Icons';

interface WriteBoxProps {
  placeholder?: string;
  value?: string;
  chatId?: string;

  onSubmit?: (text: string) => void;
  onChange?: (text: string) => void;
  onBlur?: (text: string) => void;
}

export const WriteBox: React.FC<WriteBoxProps> = ({
  placeholder = 'Write a message...',
  value = '',

  onSubmit = (): void => undefined,
  onChange = (): void => undefined,
  onBlur = (): void => undefined,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // function focusOnInput(event: KeyboardEvent): void {
  //   console.log(isFocus, 'isFocus');
  //   const codeAtA = 'A'.charCodeAt(0); // 65
  //   const codeAtZ = 'Z'.charCodeAt(0); // 90
  //   const codeAt0 = '0'.charCodeAt(0); // 48
  //   const codeAt9 = '9'.charCodeAt(0); // 57

  //   const isLetterOrNumber =
  //     (codeAtZ >= event.which && event.which >= codeAtA) ||
  //     (codeAt0 >= event.which && event.which >= codeAt9);

  //   if (!isFocus && isLetterOrNumber && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }

  document.addEventListener('keyup', (event: KeyboardEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
      event.preventDefault();
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function onTextSubmit(): void {
    if (!inputRef.current?.value) return;

    onSubmit(inputRef.current.value);
    inputRef.current.value = '';
  }

  function onTextChange(): void {
    if (!inputRef.current?.value) return;

    onChange(inputRef.current.value);
  }

  function onTextBlur(): void {
    if (!inputRef.current?.value) {
      onBlur('');
      return;
    }

    onBlur(inputRef.current.value);
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.inputSection}>
        <BasicInput
          ref={inputRef}
          placeholder={placeholder}
          defaultValue={value}
          onSubmit={(): void => onTextSubmit()}
          onChange={(): void => onTextChange()}
          onBlur={(): void => onTextBlur()}
        />
      </section>
      <SendMessageIcon
        onClick={(): void => onTextSubmit()}
        className={styles.sendMessageIcon}
      />
    </footer>
  );
};
