import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './App.module.css';

import { LoginPage } from '../LoginPage';
import { ChatContainer } from '../ChatContainer';
import { Menu } from '../Menu';
import { PopupNewChat } from '../PopupNewChat';
import { PopupImage } from '../PopupImage';

import { useStore } from '../../store';

interface PopupsProps {
  images64: string[];
  setImages64: (imgs: string[]) => void;
}

export const App: React.FC = () => {
  useEffect(() => {
    document.addEventListener('dragover', event => event.preventDefault());
    document.addEventListener('drop', event => event.preventDefault());
    return (): void => {
      document.removeEventListener('dragover', event => event.preventDefault());
      document.removeEventListener('drop', event => event.preventDefault());
    };
  });

  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/chat', '/chat/:chatId']}>
          <Home />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route>
          <div>No match</div>
        </Route>
      </Switch>
    </Router>
  );
};

const Home: React.FC = () => {
  const store = useStore();

  const [images64, setImages64] = useState<string[]>([]);

  useEffect(() => {
    store.user.fetchUser();
  }, []);

  return (
    <main className={styles.app}>
      <Popups images64={images64} setImages64={setImages64} />

      <div className={styles.main}>
        <Menu />
        <ChatContainer
          setImages64={(paths: string[]): void => setImages64(paths)}
        />
      </div>
    </main>
  );
};

const Popups: React.FC<PopupsProps> = ({ images64, setImages64 }) => {
  const store = useStore();
  const isImagePopupOpen = store.local.useSelector(
    local => local.isImagePopupOpen,
  );

  return (
    <>
      <PopupNewChat />
      <PopupImage
        images64={images64}
        isOpen={isImagePopupOpen}
        closePopup={(): void => {
          store.local.update({ isImagePopupOpen: false });
          setImages64([]);
        }}
      />
    </>
  );
};
