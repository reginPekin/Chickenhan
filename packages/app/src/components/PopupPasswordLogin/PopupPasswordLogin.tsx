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
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [socialUsernameError, setSocialUsernameError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const popupRef = useRef<HTMLDivElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signupTypeRef = useRef<any>(null);
  const isSignupRef = useRef<boolean>(isSignup);

  function resetAll(): void {
    store.local.update({ isPasswordPopupOpen: false });
    setSigninStatus('username');
    setIsFocus(false);
    setSocialUsernameError('');
    setUsernameError('');
    setPasswordError('');
  }

  useOnClickOutside(popupRef, resetAll);

  function keydownEventHandler(event: KeyboardEvent): void {
    if (
      !isPopupOpen ||
      isFocus ||
      (isSignupRef.current && signupTypeRef.current === 'username')
    ) {
      return;
    }

    if (event.key === 'Enter') return;

    if (signinStatus === 'password' && passwordRef.current) {
      passwordRef.current.focus();
      return;
    }
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }

  useEffect(() => {
    signupTypeRef.current = signupType;
    isSignupRef.current = isSignup;

    if (isSignup && signupType === 'username') {
      if (userNameRef.current) {
        userNameRef.current.focus();
      }
      return;
    }

    document.addEventListener('keydown', keydownEventHandler);

    return (): void =>
      document.removeEventListener('keydown', keydownEventHandler);
  }, [isPopupOpen, signinStatus, isSignup, signupType]);

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

  function onFocus(): void {
    setIsFocus(true);
  }

  function onBlur(): void {
    setIsFocus(false);
  }

  function onSignupUsernameSubmit(): void {
    if (passwordRef.current?.value && userNameRef.current?.value) {
      onSubmit();
      return;
    }

    if (!passwordRef.current?.value) {
      setPasswordError('Enter password');
    }

    if (!userNameRef.current?.value) {
      setUsernameError('Enter username');
    }
  }

  function onSigninLoginSubmit(): void {
    if (userNameRef.current?.value) {
      setSigninStatus('password');
      setIsFocus(false);

      return;
    }

    setUsernameError('Enter username');
  }

  function onSigninPasswordSubmit(): void {
    if (passwordRef.current?.value) {
      onSubmit();
      setSigninStatus('username');

      return;
    }

    setPasswordError('Enter username');
  }

  function onSignupSocialSubmit(): void {
    if (userNameRef.current?.value) {
      onSubmit();
      return;
    }

    setSocialUsernameError('Enter username');
  }

  function onContinueClick(): void {
    if (signupType === 'Google' || signupType === 'Facebook') {
      onSignupSocialSubmit();
      return;
    }

    if (isSignup) {
      onSignupUsernameSubmit();
      return;
    }

    if (signinStatus === 'username') {
      onSigninLoginSubmit();
      return;
    }

    onSigninPasswordSubmit();
  }

  function renderSigninPopupContent(): React.ReactNode {
    if (signupType === 'Google' || signupType === 'Facebook') {
      return (
        <InputWithUnderline
          className={styles.inputWithUnderline}
          ref={userNameRef}
          onSubmit={onSignupSocialSubmit}
          onChange={(value): void => {
            setLogin(value);
            setSocialUsernameError('');
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          label="Your username"
          error={socialUsernameError}
        />
      );
    }

    if (isSignup) {
      return (
        <div className={styles.signupInputs}>
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={userNameRef}
            onSubmit={(): void => {
              if (!userNameRef.current?.value) {
                setUsernameError('Enter username');
              }
              passwordRef.current?.focus();
            }}
            onChange={(value): void => {
              setLogin(value);
              setUsernameError('');
            }}
            label="Your username"
            error={usernameError}
          />
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={passwordRef}
            onSubmit={onSignupUsernameSubmit}
            onFocus={(): void => {
              if (!userNameRef.current?.value) {
                setUsernameError('Enter username');
              }
            }}
            onChange={(): void => {
              setPasswordError('');
            }}
            type="password"
            label="Your password"
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
          onChange={(value): void => {
            setLogin(value);
            setUsernameError('');
          }}
          onSubmit={onSigninLoginSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
          label="Your username"
          error={usernameError}
        />
      );
    }

    return (
      <InputWithUnderline
        onSubmit={onSigninPasswordSubmit}
        onChange={(value): void => {
          setPassword(value);
          setPasswordError('');
        }}
        onFocus={onFocus}
        onBlur={onBlur}
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
        <DeleteIcon className={styles.deleteIcon} onClick={resetAll} />

        <div className={styles.popupContent}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.description}>{description}</span>
          {renderSigninPopupContent()}
          <div className={styles.button}>
            <PositionAwareButton
              backgroundColor="var(--black)"
              hoveredColor="var(--hover-black)"
              clickedColor="var(--click-black)"
              textColor="var(--white)"
              onClick={onContinueClick}
            >
              Continue
            </PositionAwareButton>
          </div>
        </div>
      </section>
    </main>
  );
};
