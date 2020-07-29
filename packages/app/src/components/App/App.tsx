import React, { useState, useEffect } from 'react';
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

import { getUserChats, getUserInfo } from '@chickenhan/components/sdk';

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
  const [, setUserInfo] = store.user.useState();
  const userChats = store.chats.useSelector(state => state.chats);
  const isImagePopupOpen =
    store.local.useSelector(local => local.isImagePopupOpen) || false;

  const [images64, setImages64] = useState<string[]>([]);

  useEffect(() => {
    (async function (): Promise<void> {
      //как одновременно запустить прогрузку чатов и userInfo?
      const chats = await getUserChats();
      store.chats.addChats(chats);

      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    })();
  }, []);

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
        <MenuContainer userChats={userChats || []} />
        <ContentContainer
          setImages64={(paths: string[]): void => setImages64(paths)}
        />
      </div>
    </main>
  );
};
