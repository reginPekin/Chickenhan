import React, { useState } from 'react';

import cx from 'classnames';

import styles from './Login.module.css';

import { loginBlocks, LoginBlock } from './consts';

interface LoginBlockProps {
  loginBlock: LoginBlock;
  isSignup: boolean;
}

export const LoginPage: React.FC = ({}) => {
  const [isSignup, setIsSignip] = useState(true);

  const signupPage = {
    welcomeText: 'Join Chickenhan.',
    transitionText: 'Already have an account?',
    linkText: 'Sign in',
    onClick: (): void => setIsSignip(false),
  };

  const loginPage = {
    welcomeText: 'Welcome back.',
    transitionText: 'No account?',
    linkText: 'Create one',
    onClick: (): void => setIsSignip(true),
  };

  const page = isSignup ? signupPage : loginPage;

  return (
    <main className={styles.main}>
      <section className={styles.loginSection}>
        <h1 className={cx(styles.text, styles.block)}>{page.welcomeText}</h1>
        <div className={cx(styles.signup, styles.block)}>
          {loginBlocks.map((loginBlock, key) => (
            <LoginSection
              key={key}
              loginBlock={loginBlock}
              isSignup={isSignup}
            />
          ))}
        </div>
        <span className={styles.text}>
          {page.transitionText}
          <a onClick={page.onClick} className={styles.link}>
            {page.linkText}
          </a>
        </span>
      </section>
    </main>
  );
};

const LoginSection: React.FC<LoginBlockProps> = ({ loginBlock, isSignup }) => {
  const Icon = loginBlock.Icon;
  const loginText = isSignup ? 'Sign up' : 'Sign in';

  return (
    <section className={styles.loginBlock}>
      <Icon className={styles.icon} />
      <span>
        {loginText} with {loginBlock.name}
      </span>
    </section>
  );
};
