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

  return (
    <nav className={styles.menuSidebar}>
      <div
        className={styles.logoSection}
        onClick={(): void => {
          setСhosenTab('chats');
          store.local.update({ isProfileOpen: false });
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
            openProfile={(): void =>
              store.local.update({ isProfileOpen: true })
            }
            closeProfile={(): void =>
              store.local.update({ isProfileOpen: false })
            }
          />
        ))}
      </section>
    </nav>
  );
};
