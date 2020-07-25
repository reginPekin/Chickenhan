import React, { useState, ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import styles from './App.module.css';

import { LoginPage } from '../LoginPage';
import { ContentContainer } from '../ContentContainer';
import { MenuContainer } from '../MenuContainer';
import { NewChatPopup } from '../NewChatPopup';
import { ImagePopup } from '../ImagePopup';

import { useStore } from '../../store';

export const App: React.FC = () => {
  return (
    <Router>
      <ModalSwith />
    </Router>
  );
};

function ModalSwith(): ReactElement {
  const location = useLocation();

  React.useEffect(() => {
    document.addEventListener('dragover', event => event.preventDefault());
    document.addEventListener('drop', event => event.preventDefault());
    return (): void => {
      document.addEventListener('dragover', event => event.preventDefault());
      document.addEventListener('drop', event => event.preventDefault());
    };
  });

  return (
    <Switch location={location}>
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
  );
}

const Home: React.FC = () => {
  const store = useStore();

  const [images64, setImages64] = useState<string[]>([]);

  const isImagePopupOpen =
    store.local.useSelector(local => local.isImagePopupOpen) || false;

  return (
    <main className={styles.app}>
      <NewChatPopup />
      <ImagePopup
        images64={images64}
        isOpen={isImagePopupOpen}
        closePopup={(): void => {
          store.local.update({ isImagePopupOpen: false });
          setImages64([]);
        }}
      />
      <div className={styles.main}>
        <MenuContainer />
        <ContentContainer
          setImages64={(paths: string[]): void => setImages64(paths)}
        />
      </div>
    </main>
  );
};
