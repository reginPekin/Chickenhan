import React from 'react';

import styles from './BasicInput.module.css';

interface BasicInputProps {
  onSubmit?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  style?: React.CSSProperties;
  type?: string;
  defaultValue?: string;
}

export const BasicInput: React.ForwardRefExoticComponent<BasicInputProps> = React.forwardRef<
  HTMLInputElement,
  BasicInputProps
>(
  (
    {
      onSubmit = (): void => undefined,
      onChange = (): void => undefined,
      onFocus = (): void => undefined,
      onBlur = (): void => undefined,
      placeholder = '',
      style = {},
      type = 'text',
      defaultValue = '',
    },
    ref,
  ) => {
    function eventHandler(event: React.KeyboardEvent<HTMLInputElement>): void {
      if (event.key === 'Enter') {
        onSubmit();
      }
    }

    return (
      <input
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={eventHandler}
        className={styles.input}
        placeholder={placeholder}
        ref={ref}
        style={style}
      />
    );
  },
);
