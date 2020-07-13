import React from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';
import { LogoIcon } from '../Icons';

import styles from './MenuSidebar.module.css';

import { menuElements, MenuState } from './consts';

interface MenuSiderProps {
  chosenTab: MenuState;
  setchosenTab: (tab: MenuState) => void;
}

export const MenuSidebar: React.FC<MenuSiderProps> = ({
  chosenTab,
  setchosenTab,
}) => {
  const index: number = menuElements.findIndex(tab => tab.name === chosenTab);

  return (
    <nav className={styles.menuSidebar}>
      <div
        className={styles.logoSection}
        onClick={(): void => {
          setchosenTab('chats');
        }}
      >
        <LogoIcon />
      </div>
      <section>
        <div
          className={styles.leftSlider}
          style={{ transform: `translateY(${index * 64}px)` }}
        />
        {menuElements.map((menuElement, key) => (
          <MenuIcon
            key={key}
            menuElement={menuElement}
            isActiveTab={chosenTab === menuElement.name}
            setchosenTab={(tab): void => setchosenTab(tab)}
          />
        ))}
      </section>
    </nav>
  );
};
