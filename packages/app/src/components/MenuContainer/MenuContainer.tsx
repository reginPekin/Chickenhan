import React, { useState } from 'react';
import styles from './MenuContainer.module.css';

import { MenuSidebar } from '../MenuSidebar';
import { MenuContent } from '../MenuContent';
import { MenuState } from '../MenuSidebar/consts';
import { Chat } from '@chickenhan/components/src/types';

interface MenuContainerProps {
  userChats: Chat[];
}

export const MenuContainer: React.FC<MenuContainerProps> = ({ userChats }) => {
  const [chosenTab, setchosenTab] = useState<MenuState>('chats');

  return (
    <div className={styles.menuContainer}>
      <MenuSidebar
        chosenTab={chosenTab}
        setСhosenTab={(tab): void => setchosenTab(tab)}
      />
      <MenuContent chosenTab={chosenTab} userChats={userChats} />
    </div>
  );
};
