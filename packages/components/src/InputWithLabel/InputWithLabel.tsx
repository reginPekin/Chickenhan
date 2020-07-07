import React, { useRef, useState } from 'react';

import styles from './InputWithLabel.module.css';

import cx from 'classnames';

import { BasicInput } from '../BasicInput';

interface InputWithLabelProps {
  placeholder: string;
  isRequired?: boolean;
  setIsRequired?: (value: boolean) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  placeholder,
  isRequired = false,
  setIsRequired = (): void => undefined,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isOnTop = isFocused || inputRef.current?.value;

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
        <BasicInput ref={inputRef} onFocus={onFocus} onBlur={onBlur} />
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
