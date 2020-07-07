import React, { useState } from 'react';

import cx from 'classnames';

import styles from './Login.module.css';

import { loginBlocks, LoginBlock } from './consts';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// Issue: https://github.com/keppelen/react-facebook-login/issues/284

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../ignoredConsts';

import { GoogleIcon, FacebookIcon } from '../Icons';

interface LoginBlockProps {
  loginBlock: LoginBlock;
  isSignup: boolean;
}

interface ButtonProps {
  children: JSX.Element;
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
        <GoogleButton>
          <LoginSection
            loginBlock={{
              Icon: GoogleIcon,
              name: 'Google',
            }}
            isSignup={isSignup}
          />
        </GoogleButton>
        <FacebookButton>
          <LoginSection
            loginBlock={{
              Icon: FacebookIcon,
              name: 'Facebook',
            }}
            isSignup={isSignup}
          />
        </FacebookButton>
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

export const FacebookButton: React.FC<ButtonProps> = ({ children }) => {
  function responseFacebook(response: any): void {
    console.log(response);
  }

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      autoLoad
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps: any): JSX.Element => (
        <div onClick={renderProps.onClick}>{children}</div>
      )}
    />
  );
};

export const GoogleButton: React.FC<ButtonProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');

  function login(response: any): void {
    setAccessToken(response.tokenId);
    console.log(response, 'response');
  }

  function handleLoginFailure(): void {
    console.log('Failed to log in');
  }

  return (
    <GoogleLogin
      render={(renderProps: any): JSX.Element => (
        <div onClick={renderProps.onClick}>{children}</div>
      )}
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={(response): void => login(response)}
      onFailure={(): void => handleLoginFailure()}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
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
