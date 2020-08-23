import React, { useState, useMemo } from 'react';

import cx from 'classnames';

import styles from './LoginPage.module.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// Issue: https://github.com/keppelen/react-facebook-login/issues/284

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { PopupPasswordLogin } from '../PopupPasswordLogin';

import { IconProps, GoogleIcon, FacebookIcon, EmailIcon } from '../Icons';

import { useStore } from '../../store';
import { chickenhan } from '../../store/chickenhan';

export interface LoginBlock {
  Icon: React.FC<IconProps>;
  name: string;
}

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
      <PopupPasswordLogin isSignup={isSignup} />
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
        <div className={styles.block}>
          <LoginButton>
            <LoginSection
              loginBlock={{
                Icon: EmailIcon,
                name: 'username',
              }}
              isSignup={isSignup}
            />
          </LoginButton>
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

const LoginButton: React.FC<ButtonProps> = ({ children }) => {
  const store = useStore();

  return (
    <div
      onClick={(): void => {
        store.local.update({ isPasswordPopupOpen: true });
      }}
    >
      {children}
    </div>
  );
};

const FacebookButton: React.FC<ButtonProps> = ({ children }) => {
  async function responseFacebook(response: any): Promise<void> {
    console.log(response);
    console.log('check');
    // не google
    const responseGoogle = await chickenhan.authorization.signupGoogle(
      response.accesToken,
    );
    console.log('ne google');
    console.log(responseGoogle, 'google response auth');
    //
  }

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps: any): JSX.Element => (
        <div onClick={renderProps.onClick}>{children}</div>
      )}
    />
  );
};

const GoogleButton: React.FC<ButtonProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');

  async function login(response: any): Promise<void> {
    setAccessToken(response.tokenId);
    const responseGoogle = await chickenhan.authorization.signupGoogle(
      response.tokenId,
    );
    console.log(responseGoogle, 'google response auth');

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
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      onSuccess={(response): any => login(response)}
      onFailure={(): void => handleLoginFailure()}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  );
};

const LoginSection: React.FC<LoginBlockProps> = ({ loginBlock, isSignup }) => {
  const Icon = loginBlock.Icon;
  const loginText = useMemo(() => (isSignup ? 'Sign up' : 'Sign in'), [
    isSignup,
  ]);

  return (
    <section className={styles.loginBlock}>
      <Icon className={styles.icon} />
      <span>
        {loginText} with {loginBlock.name}
      </span>
    </section>
  );
};
