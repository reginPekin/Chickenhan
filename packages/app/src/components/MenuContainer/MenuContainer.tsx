import React, { useState } from 'react';
import styles from './MenuContainer.module.css';

import { MenuSidebar } from '../MenuSidebar';
import { MenuContent } from '../MenuContent';
import { MenuState } from '../MenuSidebar/consts';

export const MenuContainer: React.FC = () => {
  const [chosenTab, setchosenTab] = useState<MenuState>('chats');

  return (
    <div className={styles.menuContainer}>
      <MenuSidebar
        chosenTab={chosenTab}
        setСhosenTab={(tab): void => setchosenTab(tab)}
      />
      <MenuContent chosenTab={chosenTab} />
    </div>
  );
};
