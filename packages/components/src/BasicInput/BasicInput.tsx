import React from 'react';

import styles from './BasicInput.module.css';

interface BasicInputProps {
  onSubmit: (event: React.FormEvent) => void;

  inputRef?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  inputSectionStyle?: React.CSSProperties;
  renderLeftElements?: () => JSX.Element;
  renderRightElements?: () => JSX.Element;
  onChange?: (value: string) => void; // избавиться
}

export const BasicInput: React.FC<BasicInputProps> = ({
  onSubmit,
  placeholder = '',
  inputRef = null, // just ref
  inputSectionStyle = {}, // just style
  renderLeftElements = (): void => undefined,
  renderRightElements = (): void => undefined,
  onChange = (): void => undefined,
}) => {
  return (
    <form
      className={styles.inputSection}
      style={inputSectionStyle}
      onSubmit={(event): void => {
        onSubmit(event);
        event.preventDefault();
      }}
    >
      {renderLeftElements()}
      <input
        className={styles.input}
        placeholder={placeholder}
        ref={inputRef}
        onChange={(event): void => onChange(event?.target?.value)}
      />
      {renderRightElements()}
    </form>
  );
};
