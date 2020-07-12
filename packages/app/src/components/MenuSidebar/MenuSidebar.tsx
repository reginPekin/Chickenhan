import React from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';
import { LogoIcon } from '../Icons';

import styles from './MenuSidebar.module.css';

import { menuElements, MenuState } from './consts';

import { useStore } from '../../store';

interface MenuSiderProps {
  choosenTab: MenuState;
  setChoosenTab: (tab: MenuState) => void;
}

export const MenuSidebar: React.FC<MenuSiderProps> = ({
  choosenTab,
  setChoosenTab,
}) => {
  const store = useStore();
  const name = store.user.useSelector(user => user.name);

  const index: number = menuElements.findIndex(tab => tab.name === choosenTab);

  return (
    <nav className={styles.menuSidebar}>
      {/* {name} */}
      <div
        className={styles.logoSection}
        onClick={(): void => {
          setChoosenTab('chats');
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
            isActiveTab={choosenTab === menuElement.name}
            setChoosenTab={(tab): void => setChoosenTab(tab)}
          />
        ))}
      </section>
    </nav>
  );
};
