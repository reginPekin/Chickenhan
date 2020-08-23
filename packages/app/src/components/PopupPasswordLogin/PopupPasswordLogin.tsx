import React, { useState, useRef } from 'react';

import styles from './PopupPasswordLogin.module.css';

import { DeleteIcon } from '../Icons';

import { InputWithUnderline } from '@chickenhan/components/src/InputWithUnderline';
import { PositionAwareButton } from '@chickenhan/components/src/PositionAwareButton';

import { useStore } from '../../store';

type SigninStatus = 'username' | 'password';

interface PopupPasswordLoginProps {
  isSignup?: boolean;
}

export const PopupPasswordLogin: React.FC<PopupPasswordLoginProps> = ({
  isSignup = false,
}) => {
  const store = useStore();
  const isPopupOpen = store.local.useSelector(
    local => local.isPasswordPopupOpen,
  );

  // rename slide
  const [signinStatus, setSigninStatus] = useState<SigninStatus>('username');

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signinRef = useRef<HTMLInputElement>(null);

  const title = isSignup ? 'Sign up with username' : 'Sign in with username';

  const signinDescription =
    signinStatus === 'username'
      ? 'Enter your username to sign in to the account.'
      : 'Enter your password to sign in to the account.';

  const description = isSignup
    ? 'Enter your username and password to create an account.'
    : signinDescription;

  function renderSigninPopupContent(): React.ReactNode {
    if (isSignup) {
      return (
        <div className={styles.signupInputs}>
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={userNameRef}
            onSubmit={(): void => {
              passwordRef.current?.focus();
            }}
            label="Your username"
          />
          <InputWithUnderline
            className={styles.inputWithUnderline}
            ref={passwordRef}
            type="password"
            label="Your password"
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
          ref={signinRef}
          onSubmit={(): void => {
            setSigninStatus('password');
          }}
          label="Your username"
        />
      );
    }

    return (
      <InputWithUnderline
        className={styles.inputWithUnderline}
        key="password"
        ref={signinRef}
        type="password"
        label="Your password"
      />
    );
  }

  if (!isPopupOpen) return null;

  return (
    <main className={styles.passwordPopup}>
      <section className={styles.popupSection}>
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
          <div className={styles.button}>
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
