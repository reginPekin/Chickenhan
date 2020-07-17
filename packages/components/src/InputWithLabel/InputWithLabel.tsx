import React, { useState } from 'react';

import styles from './InputWithLabel.module.css';

import cx from 'classnames';

import { BasicInput } from '../BasicInput';

interface InputWithLabelProps {
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;

  focusRef?: () => void;
}

export const InputWithLabel: React.ForwardRefExoticComponent<InputWithLabelProps> = React.forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(({ placeholder, focusRef = (): void => undefined }, ref) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const isOnTop = isFocused || value;

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
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event): void => setValue(event.target.value)}
        />
      </div>

      <span
        onClick={(): void => {
          if (!isFocused) focusRef();
        }}
        className={cx(styles.label, { [styles.focusedLabel]: isOnTop })}
        style={{ color: !isOnTop && isRequired ? 'red' : 'var(--black-40)' }}
      >
        {placeholder}
      </span>
    </section>
  );
});
