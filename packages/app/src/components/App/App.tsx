import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import styles from './App.module.css';

import { LoginPage } from '../LoginPage';
import { ChatContainer } from '../ChatContainer';
import { Menu } from '../Menu';
import { PopupNewChat } from '../PopupNewChat';
import { PopupImage } from '../PopupImage';
import { PopupBio } from '../PopupBio';

import { useStore } from '../../store';
import { TOKEN_KEY } from '../../consts';

import { chickenhan } from '../../store/chickenhan';

interface PopupsProps {
  images64: string[];
  setImages64: (imgs: string[]) => void;
}

export const BioContext = createContext({
  bioId: 0,
  changeBioId: (id: number): void => undefined,
});

export const App: React.FC = () => {
  useEffect(() => {
    document.addEventListener('dragover', event => event.preventDefault());
    document.addEventListener('drop', event => event.preventDefault());
    return (): void => {
      document.removeEventListener('dragover', event => event.preventDefault());
      document.removeEventListener('drop', event => event.preventDefault());
    };
  });

  const [bioId, setBioId] = useState<number>(0);

  function changeBioId(id: number): void {
    setBioId(id);
  }

  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/chat', '/chat/:chatId']}>
          <BioContext.Provider value={{ bioId, changeBioId }}>
            <Home />
          </BioContext.Provider>
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

  const history = useHistory();

  async function fetchAll(): Promise<void> {
    const token_key = window.localStorage.getItem(TOKEN_KEY);

    if (!token_key) {
      history.push('/login');
    }

    // check for user db compliance
    const fetchUserResult = await store.user.fetchUser();
    if (fetchUserResult === 'error') {
      history.push('/login');
      return;
    }

    store.chats.fetchUserChats();
  }

  useEffect(() => {
    fetchAll();

    chickenhan.websocket.listenToWebsocket();

    window.addEventListener('beforeunload', () => {
      chickenhan.websocket.setOffline();
    });
  }, []);

  const [images64, setImages64] = useState<string[]>([]);

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
      <PopupBio />
    </>
  );
};
