import React, { useState, useMemo } from 'react';

import cx from 'classnames';

import { BasicInput } from '../BasicInput';

import { PasswordEyeIcon, ClosedPasswordEyeIcon, WarningIcon } from '../Icons';

import styles from './InputWithUnderline.module.css';

type PasswordType = 'password' | 'text';

interface InputWithUnderlineProps {
  onSubmit?: () => void;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  ref?: React.Ref<HTMLInputElement>;

  error?: string;
  type?: PasswordType;
  label?: string;
  className?: string;
}

export const InputWithUnderline: React.ForwardRefExoticComponent<InputWithUnderlineProps> = React.forwardRef<
  HTMLInputElement,
  InputWithUnderlineProps
>(
  (
    {
      error = '',
      type = 'text',
      label = '',
      className = undefined,

      onSubmit = (): void => undefined,
      onChange = (): void => undefined,
      onFocus = (): void => undefined,
      onBlur = (): void => undefined,
    },
    ref,
  ) => {
    const [isInputSecure, setIsInputSecure] = useState<boolean>(false);
    const [passwordState, setPasswordState] = useState<PasswordType>(
      'password',
    );

    const inputType: PasswordType =
      type === 'password' ? passwordState : 'text';

    function renderPasswordIcon(): React.ReactNode {
      if (type !== 'password') return null;

      if (!isInputSecure) {
        return (
          <ClosedPasswordEyeIcon
            className={styles.passwordIcon}
            onClick={(): void => {
              setIsInputSecure(true);
              setPasswordState('text');
            }}
          />
        );
      }

      return (
        <PasswordEyeIcon
          className={styles.passwordIcon}
          onClick={(): void => {
            setIsInputSecure(false);
            setPasswordState('password');
          }}
        />
      );
    }

    const MemoizedPasswordIcon = useMemo(renderPasswordIcon, [
      type,
      isInputSecure,
    ]);

    return (
      <section
        // className={cx(styles.basicInputSection, className, {
        //   errorAnimation: !!error,
        // })}
        className={cx(styles.basicInputSection, className)}
      >
        <span
          className={styles.label}
          style={{ color: error ? 'var(--red)' : 'var(--black)' }}
        >
          {label}
        </span>
        <div
          className={styles.basicInput}
          style={{ borderColor: error ? 'var(--red)' : 'var(--black)' }}
        >
          <BasicInput
            ref={ref}
            onSubmit={onSubmit}
            onChange={(event): void => onChange(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{
              backgroundColor: 'var(--white)',
              paddingBottom: '5px',
              fontSize: '15px',
            }}
            type={inputType}
          />
          {MemoizedPasswordIcon}
          {error && <WarningIcon width={16} className={styles.warningIcon} />}
        </div>
        <span className={styles.error}>{error}</span>
      </section>
    );
  },
);
