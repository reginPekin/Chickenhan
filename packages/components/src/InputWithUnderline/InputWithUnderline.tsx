import React, { useState, useMemo } from 'react';

import cx from 'classnames';

import { BasicInput } from '../BasicInput';

import { PasswordEyeIcon, ClosedPasswordEyeIcon } from '../Icons';

import styles from './InputWithUnderline.module.css';

type PasswordType = 'password' | 'text';

interface InputWithUnderlineProps {
  onSubmit?: () => void;

  ref?: React.Ref<HTMLInputElement>;

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
      type = 'text',
      label = '',
      className = undefined,
      onSubmit = (): void => undefined,
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
      <section className={cx(styles.basicInputSection, className)}>
        <span className={styles.label}>{label}</span>
        <div className={styles.basicInput}>
          <BasicInput
            ref={ref}
            onSubmit={onSubmit}
            onChange={(event): void => console.log(event.target.value)}
            style={{
              backgroundColor: 'var(--white)',
              paddingBottom: '5px',
              fontSize: '15px',
            }}
            type={inputType}
          />
          {MemoizedPasswordIcon}
        </div>
      </section>
    );
  },
);
