import React from 'react';

import styles from './App.module.css';

import { ContentContainer } from '../ContentContainer';
import { MenuContainer } from '../MenuContainer';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <MenuContainer />
      <ContentContainer />
    </div>
  );
};
