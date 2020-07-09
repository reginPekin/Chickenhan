import React, { useRef, useState, useEffect } from 'react';

import styles from './InputWithLabel.module.css';

import cx from 'classnames';

import { BasicInput } from '../BasicInput';

interface InputWithLabelProps {
  placeholder: string;
  isReseted?: boolean;
  isRequired?: boolean;
  setValue?: (value: string) => void;
  setIsRequired?: (value: boolean) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  placeholder,
  isReseted = false,
  isRequired = false,
  setValue = (): void => undefined,
  setIsRequired = (): void => undefined,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isOnTop = isFocused || inputRef.current?.value;

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [isReseted]);

  function onFocus(): void {
    if (!isFocused) setIsFocused(true);
    if (!isRequired) setIsRequired(true);
  }

  function onBlur(): void {
    if (isFocused) setIsFocused(false);
  }

  return (
    <section className={styles.input}>
      <div className={styles.basicInput}>
        <BasicInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event): void => setValue(event.target.value)}
        />
      </div>

      <span
        onClick={(): void => {
          if (!isFocused) inputRef.current?.focus();
        }}
        className={cx(styles.label, { [styles.focusedLabel]: isOnTop })}
        style={{ color: !isOnTop && isRequired ? 'red' : 'var(--black-40)' }}
      >
        {placeholder}
      </span>
    </section>
  );
};
