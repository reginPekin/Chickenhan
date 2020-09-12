import React, { useState, useRef, useMemo, useEffect } from 'react';

import styles from './PopupPasswordLogin.module.css';

import { DeleteIcon } from '../Icons';

import { SignupType } from '@chickenhan/sdk/lib/types';

import { InputWithUnderline } from '@chickenhan/components/src/InputWithUnderline';
import { PositionAwareButton } from '@chickenhan/components/src/PositionAwareButton';

import { useOnClickOutside } from '@chickenhan/components/src/utils/hooks';

import { useStore } from '../../store';

type SigninStatus = 'username' | 'password';

interface PopupPasswordLoginProps {
  isSignup?: boolean;
  signupType?: SignupType;

  setLogin?: (value: string) => void;
  setPassword?: (value: string) => void;
  onSubmit?: () => void;
}

export const PopupPasswordLogin: React.FC<PopupPasswordLoginProps> = ({
  signupType = 'username',
  isSignup = false,

  onSubmit = (): void => undefined,
  setLogin = (): void => undefined,
  setPassword = (): void => undefined,
}) => {
  const store = useStore();
  const isPopupOpen = store.local.useSelector(
    local => local.isPasswordPopupOpen,
  );

  // rename slide
  const [signinStatus, setSigninStatus] = useState<SigninStatus>('username');
  const [socialUsernameError, setSocialUsernameError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // const [popupLogin, setPopupLogin] = useState<string>('');
  // const [popupPassword, setPopupPassword] = useState<string>('');

  const popupRef = useRef<HTMLDivElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signinRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(popupRef, () =>
    store.local.update({ isPasswordPopupOpen: false }),
  );

  const title = useMemo(
    () => (isSignup ? `Sign up with ${signupType} ` : 'Sign in with username'),
    [isSignup, signupType],
  );

  const signinDescription = useMemo(
    () =>
      signinStatus === 'username'
        ? 'Enter your username to sign in to the account.'
        : 'Enter your password to sign in to the account.',
    [signinStatus],
  );

  const signupDescription = useMemo(
    () =>
      signupType === 'username'
        ? 'Enter your username and password to create an account.'
        : 'Enter your username to create an account.',
    [signupType],
  );

  const description = useMemo(
    () => (isSignup ? signupDescription : signinDescription),
    [isSignup, signinDescription, signupDescription],
  );

  function renderSigninPopupContent(): React.ReactNode {
    if (isSignup) {
      if (signupType === 'Google' || signupType === 'Facebook') {
        return (
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={userNameRef}
            onSubmit={onSubmit}
            onChange={setLogin}
            label="Your username"
            error={socialUsernameError}
          />
        );
      }

      return (
        <div className={styles.signupInputs}>
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={userNameRef}
            onSubmit={(): void => {
              passwordRef.current?.focus();
            }}
            // onChange={(value): void => setPopupLogin(value)}
            onChange={setLogin}
            label="Your username"
            error={usernameError}
          />
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={passwordRef}
            type="password"
            label="Your password"
            // onChange={(value): void => setPopupPassword(value)}
            onChange={setPassword}
            onSubmit={(): void => {
              // не проходит setState
              // setLogin(popupLogin);
              // setPassword(popupPassword);
              // пока менять внутри сабмитов
              onSubmit();
            }}
            error={passwordError}
          />
        </div>
      );
    }

    if (signinStatus === 'username') {
      /*
       * Used key inside InputWithUnderline component to separate inputs
       * because React handles these inputs as one DOM element
       */

      return (
        <InputWithUnderline
          className={styles.inputWithUnderline}
          key="username"
          ref={userNameRef}
          onChange={setLogin}
          onSubmit={(): void => {
            setSigninStatus('password');
          }}
          label="Your username"
          error={usernameError}
        />
      );
    }

    passwordRef.current?.focus();
    return (
      <InputWithUnderline
        onSubmit={onSubmit}
        onChange={setPassword}
        className={styles.inputWithUnderline}
        key="password"
        ref={passwordRef}
        type="password"
        label="Your password"
        error={passwordError}
      />
    );
  }

  if (!isPopupOpen) return null;

  return (
    <main className={styles.passwordPopup}>
      <section className={styles.popupSection} ref={popupRef}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={(): void => {
            store.local.update({ isPasswordPopupOpen: false });
          }}
        />

        <div className={styles.popupContent}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.description}>{description}</span>
          {renderSigninPopupContent()}
          <div className={styles.button} onClick={(): void => onSubmit()}>
            <PositionAwareButton
              backgroundColor="var(--black)"
              hoveredColor="var(--hover-black)"
              clickedColor="var(--click-black)"
              textColor="var(--white)"
            >
              Continue
            </PositionAwareButton>
          </div>
        </div>
      </section>
    </main>
  );
};
