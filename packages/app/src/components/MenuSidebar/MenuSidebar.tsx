import React from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';
import { LogoIcon } from '../Icons';

import styles from './MenuSidebar.module.css';

import { menuElements, MenuState } from './consts';

import { useStore } from '../../store';

interface MenuSiderProps {
  chosenTab: MenuState;
  setСhosenTab: (tab: MenuState) => void;
}

export const MenuSidebar: React.FC<MenuSiderProps> = ({
  chosenTab,
  setСhosenTab,
}) => {
  const index: number = menuElements.findIndex(tab => tab.name === chosenTab);
  const store = useStore();

  const name = store.user.useSelector(user => user.name);

  return (
    <nav className={styles.menuSidebar}>
      {/* {name} */}
      <div
        className={styles.logoSection}
        onClick={(): void => {
          setСhosenTab('chats');
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
            setchosenTab={(tab): void => setСhosenTab(tab)}
          />
        ))}
      </section>
    </nav>
  );
};
