import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import styles from './App.module.css';

import { ContentContainer } from '../ContentContainer';
import { MenuContainer } from '../MenuContainer';

export const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <MenuContainer />
        <ContentContainer />
      </div>
    </Router>
  );
};
