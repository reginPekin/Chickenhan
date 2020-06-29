import React, { useState } from 'react';
import styles from './MenuContainer.module.css';

import { MenuSidebar } from '../MenuSidebar';
import { MenuContent } from '../MenuContent';
import { MenuState } from '../MenuSidebar/consts';

interface MenuContainerProps {
  setIsPopupOpen: (value: boolean) => void;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  setIsPopupOpen,
}) => {
  const [choosenTab, setChoosenTab] = useState<MenuState>('chats');

  return (
    <div className={styles.menuContainer}>
      <MenuSidebar
        choosenTab={choosenTab}
        setChoosenTab={(tab): void => setChoosenTab(tab)}
      />
      <MenuContent setIsPopupOpen={setIsPopupOpen} choosenTab={choosenTab} />
    </div>
  );
};
