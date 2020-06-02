import React from 'react';
import styles from './MenuContainer.module.css';

import { MenuSidebar } from '../MenuSidebar';
import { MenuContent } from '../MenuContent';

export const MenuContainer: React.FC = () => {
  return (
    <div className={styles.menuContainer}>
      <MenuSidebar />
      <MenuContent />
    </div>
  );
};
