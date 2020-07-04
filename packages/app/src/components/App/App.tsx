import React, { useState, ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useParams,
} from 'react-router-dom';

import styles from './App.module.css';

import { Login } from '../Login';
import { ContentContainer } from '../ContentContainer';
import { MenuContainer } from '../MenuContainer';
import { NewChatPopup } from '../NewChatPopup';

export const App: React.FC = () => {
  return (
    <Router>
      <ModalSwith />
    </Router>
  );
};

function ModalSwith(): ReactElement {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path={['/', '/chat', '/chat/:chatId']}>
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route>
        <div>No match</div>
      </Route>
    </Switch>
  );
}

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <main className={styles.app}>
      <NewChatPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={(value): void => setIsPopupOpen(value)}
      />
      <div className={styles.main}>
        <MenuContainer
          setIsPopupOpen={(value): void => setIsPopupOpen(value)}
        />
        <ContentContainer />
      </div>
    </main>
  );
};
