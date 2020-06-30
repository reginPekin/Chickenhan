import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import styles from './App.module.css';

import { ContentContainer } from '../ContentContainer';
import { MenuContainer } from '../MenuContainer';

import { NewChatPopup } from '../NewChatPopup';

export const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <Router>
      <NewChatPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={(value): void => setIsPopupOpen(value)}
      />
      <div className={styles.app}>
        <MenuContainer
          setIsPopupOpen={(value): void => setIsPopupOpen(value)}
        />
        <ContentContainer />
      </div>
    </Router>
  );
};
