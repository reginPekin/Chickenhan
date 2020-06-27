import React, { useState } from 'react';
import styles from './MenuContainer.module.css';

import { MenuSidebar } from '../MenuSidebar';
import { MenuContent } from '../MenuContent';
import { MenuState } from '../MenuSidebar/consts';

export const MenuContainer: React.FC = () => {
  const [choosenTab, setChoosenTab] = useState<MenuState>('chats');

  return (
    <div className={styles.menuContainer}>
      <MenuSidebar
        choosenTab={choosenTab}
        setChoosenTab={(tab): void => setChoosenTab(tab)}
      />
      <MenuContent choosenTab={choosenTab} />
    </div>
  );
};
