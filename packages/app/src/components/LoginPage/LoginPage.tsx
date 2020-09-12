import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import cx from 'classnames';

import styles from './LoginPage.module.css';

import { SignupType } from '@chickenhan/sdk/lib/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// Issue: https://github.com/keppelen/react-facebook-login/issues/284

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { PopupPasswordLogin } from '../PopupPasswordLogin';

import { IconProps, GoogleIcon, FacebookIcon, EmailIcon } from '../Icons';

import { useStore } from '../../store';
import { chickenhan } from '../../store/chickenhan';
import { TOKEN_KEY } from '../../consts';

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

  openPopup?: () => void;
  setToken?: (token: string) => void;
  setSignupType?: (type: SignupType) => void;
}

export const LoginPage: React.FC = ({}) => {
  useEffect(() => {
    window.localStorage.removeItem(TOKEN_KEY);
  }, []);

  const store = useStore();
  const history = useHistory();

  const [isSignup, setIsSignip] = useState<boolean>(true);
  const [signupType, setSignupType] = useState<SignupType>('username');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // for username
  const [socialToken, setSocialToken] = useState<string>(''); // for Facebook and Google

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

  function openPopup(): void {
    store.local.update({ isPasswordPopupOpen: true });
  }

  function closePopup(): void {
    store.local.update({ isPasswordPopupOpen: false });
  }

  async function signupUsername(): Promise<void> {
    await chickenhan.authorization.ping();
    const responseSignupUser = await chickenhan.authorization.signUpUserByUsername(
      username,
      password,
    );

    if (responseSignupUser.hasOwnProperty('error')) {
      return;
    }

    const user = {
      id: responseSignupUser.id,
      login: responseSignupUser.login,
      isOnline: true,
      // isOnline: responseSignupUser.online,
      avatar: responseSignupUser.avatar,
    };

    store.user.auth(responseSignupUser.token, user);
    history.push('/');
  }

  async function signinUsername(): Promise<void> {
    const responseAuthUsername = await chickenhan.authorization.authUserByUsername(
      username,
      password,
    );

    if (responseAuthUsername.hasOwnProperty('error')) {
      return;
    }

    const user = {
      id: responseAuthUsername.id,
      login: responseAuthUsername.login,
      isOnline: true,
      // isOnline: responseAuthUsername.online,
      avatar: responseAuthUsername.avatar,
    };

    store.user.auth(responseAuthUsername.token, user);
    history.push('/');
  }

  async function signupFacebook(): Promise<void> {
    await chickenhan.authorization.signUpUserByFacebook(socialToken, username);
  }

  async function signupGoogle(): Promise<void> {
    await chickenhan.authorization.signUpUserByFacebook(socialToken, username);
  }

  const page = isSignup ? signupPage : loginPage;

  function chooseSignupSubmit(): Promise<any> {
    switch (signupType) {
      case 'username':
        return signupUsername();

      case 'Facebook':
        return signupFacebook();

      case 'Google':
        return signupGoogle();
    }
  }

  return (
    <main className={styles.main}>
      <PopupPasswordLogin
        isSignup={isSignup}
        signupType={signupType}
        setLogin={(value: string): void => setUsername(value)}
        setPassword={(value: string): void => setPassword(value)}
        onSubmit={(): any => {
          isSignup ? chooseSignupSubmit() : signinUsername();
          closePopup();
        }}
      />
      <section className={styles.loginSection}>
        <h1 className={cx(styles.text, styles.block)}>{page.welcomeText}</h1>
        <GoogleButton openPopup={(): void => openPopup()}>
          <LoginSection
            loginBlock={{
              Icon: GoogleIcon,
              name: 'Google',
            }}
            isSignup={isSignup}
          />
        </GoogleButton>
        <FacebookButton
          openPopup={(): void => openPopup()}
          setToken={(token: string): void => setSocialToken(token)}
          setSignupType={(type: SignupType): void => setSignupType(type)}
        >
          <LoginSection
            loginBlock={{
              Icon: FacebookIcon,
              name: 'Facebook',
            }}
            isSignup={isSignup}
          />
        </FacebookButton>
        <div
          className={styles.block}
          onClick={(): void => {
            openPopup();

            // if (isSignup) signupUsername();
            // else signinUsername();
          }}
        >
          <LoginSection
            loginBlock={{
              Icon: EmailIcon,
              name: 'username',
            }}
            isSignup={isSignup}
          />
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

const FacebookButton: React.FC<ButtonProps> = ({
  children,

  openPopup = (): void => undefined,
  setToken = (): void => undefined,
  setSignupType = (): void => undefined,
}) => {
  const store = useStore();
  const history = useHistory();

  async function responseFacebook(response: any): Promise<any> {
    const facebookToken: string = response.id || '';

    if (facebookToken) {
      const responseAuthFacebook = await chickenhan.authorization.authUserByFacebook(
        facebookToken,
      );

      if (responseAuthFacebook.hasOwnProperty('error')) {
        setSignupType('Facebook');
        setToken(facebookToken);
        openPopup();
      } else {
        const user = {
          id: responseAuthFacebook.id,
          login: responseAuthFacebook.login,
          isOnline: responseAuthFacebook.online,
          avatar: responseAuthFacebook.avatar,
        };
        store.user.auth(responseAuthFacebook.token, user);
        history.push('/');
      }
    }
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

const GoogleButton: React.FC<ButtonProps> = ({
  children,

  openPopup = (): void => undefined,
  setToken = (): void => undefined,
  setSignupType = (): void => undefined,
}) => {
  async function responseGoogle(response: any): Promise<void> {
    const googleToken: string = response.tokenId || '';

    if (googleToken) {
      // const responseAuthGoogle = await chickenhan.authorization.authUserByGoogle(
      //   googleToken,
      // );
      // if (responseAuthGoogle.hasOwnProperty('error')) {
      //   setSignupType('Google');
      //   setToken(googleToken);
      //   openPopup();
      // }
    }
  }

  function handleLoginFailure(error: any): void {
    console.log(error, 'Google auth error');
  }

  return (
    <GoogleLogin
      render={(renderProps: any): JSX.Element => (
        <div onClick={renderProps.onClick}>{children}</div>
      )}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      onSuccess={(response): any => responseGoogle(response)}
      onFailure={(error: any): void => handleLoginFailure(error)}
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
