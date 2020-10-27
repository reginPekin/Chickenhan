import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import cx from 'classnames';

import styles from './LoginPage.module.css';

import { BackUser, SignupType } from '@chickenhan/sdk/lib/types';

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
  routeToMessenger?: (userInfo: BackUser & { token: string }) => void;
}

export const LoginPage: React.FC = ({}) => {
  useEffect(() => {
    window.localStorage.removeItem(TOKEN_KEY);
  }, []);

  const store = useStore();
  const history = useHistory();

  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [signupType, setSignupType] = useState<SignupType>('username');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // for username
  const [socialToken, setSocialToken] = useState<string>(''); // for Facebook and Google

  const signupPage = {
    welcomeText: 'Join Chickenhan.',
    transitionText: 'Already have an account?',
    linkText: 'Sign in',
    onClick: (): void => setIsSignup(false),
  };

  const loginPage = {
    welcomeText: 'Welcome back.',
    transitionText: 'No account?',
    linkText: 'Create one',
    onClick: (): void => setIsSignup(true),
  };

  function openPopup(): void {
    store.local.update({ isPasswordPopupOpen: true });
  }

  function closePopup(): void {
    store.local.update({ isPasswordPopupOpen: false });
  }

  function routeToMessenger(userInfo: BackUser & { token: string }): void {
    const user = {
      id: userInfo.id,
      login: userInfo.login,
      isOnline: userInfo.online,
      avatar: userInfo.avatar,
    };

    store.user.auth(userInfo.token, user);
    history.push('/');
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

    routeToMessenger(responseSignupUser);
  }

  async function signinUsername(): Promise<void> {
    const responseAuthUsername = await chickenhan.authorization.authUserByUsername(
      username,
      password,
    );

    if (responseAuthUsername.hasOwnProperty('error')) {
      return;
    }
    routeToMessenger(responseAuthUsername);
  }

  async function signupFacebook(): Promise<void> {
    const responseSignUpFacebook = await chickenhan.authorization.signUpUserByFacebook(
      socialToken,
      username,
    );

    if (responseSignUpFacebook.hasOwnProperty('error')) {
      return;
    }
    routeToMessenger(responseSignUpFacebook);
  }

  async function signupGoogle(): Promise<void> {
    const responseSignUpGoogle = await chickenhan.authorization.signUpUserByGoogle(
      socialToken,
      username,
    );

    if (responseSignUpGoogle.hasOwnProperty('error')) {
      return;
    }
    routeToMessenger(responseSignUpGoogle);
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

  function chooseSigninSubmit(): Promise<any> {
    switch (signupType) {
      case 'username':
        return signinUsername();

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
          isSignup ? chooseSignupSubmit() : chooseSigninSubmit();
          closePopup();
        }}
      />
      <section className={styles.loginSection}>
        <h1 className={cx(styles.text, styles.block)}>{page.welcomeText}</h1>
        <GoogleButton
          openPopup={openPopup}
          setToken={setSocialToken}
          setSignupType={setSignupType}
          routeToMessenger={routeToMessenger}
        >
          <LoginSection
            loginBlock={{
              Icon: GoogleIcon,
              name: 'Google',
            }}
            isSignup={isSignup}
          />
        </GoogleButton>
        <FacebookButton
          openPopup={openPopup}
          setToken={setSocialToken}
          setSignupType={setSignupType}
          routeToMessenger={routeToMessenger}
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
  routeToMessenger = (): void => undefined,
}) => {
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
        routeToMessenger(responseAuthFacebook);
      }
    }
  }

  return (
    <FacebookLogin
      appId={
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_FACEBOOK_APP_ID
          : process.env.REACT_APP_FACEBOOK_DEVELOPMENT_APP_ID
      }
      autoLoad={false}
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
  routeToMessenger = (): void => undefined,
}) => {
  async function responseGoogle(response: any): Promise<void> {
    const googleToken: string = response.googleId || '';

    if (googleToken) {
      const responseAuthGoogle = await chickenhan.authorization.authUserByGoogle(
        googleToken,
      );

      if (responseAuthGoogle.hasOwnProperty('error')) {
        setSignupType('Google');
        setToken(googleToken);
        openPopup();
      } else {
        routeToMessenger(responseAuthGoogle);
      }
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
      clientId={
        (process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_GOOGLE_CLIENT_ID
          : process.env.REACT_APP_GOOGLE_DEVELOPMENT_CLIENT_ID) || ''
      }
      onSuccess={(response): any => responseGoogle(response)}
      onFailure={(error: any): void => handleLoginFailure(error)}
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
