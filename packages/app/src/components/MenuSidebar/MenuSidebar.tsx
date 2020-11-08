import React from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';
import { LogoIcon } from '../Icons';

import styles from './MenuSidebar.module.css';

import { menuElements } from './consts';

import { useStore } from '../../store';

interface MenuSidebarProps {
  isMatches: boolean;
}

export const MenuSidebar: React.FC<MenuSidebarProps> = ({ isMatches }) => {
  const store = useStore();
  const currentMenuState = store.local.useSelector(
    state => state.currentMenuState,
  );

  const index: number = menuElements.findIndex(
    tab => tab.name === currentMenuState,
  ); //@fix

  return (
    <nav className={styles.menuSidebar}>
      <div
        className={styles.logoSection}
        onClick={(): void => {
          store.local.update({ currentMenuState: 'chats' });
          store.local.update({ isProfileOpen: false });
        }}
      >
        <LogoIcon />
      </div>
      <section className={styles.menuElements}>
        <div
          className={styles.leftSlider}
          style={{ transform: `translateY(${index * 64}px)` }}
        />
        {menuElements.map((menuElement, key) => (
          <MenuIcon
            key={key}
            menuElement={menuElement}
            isActiveTab={currentMenuState === menuElement.name}
            setCurrentMenuState={(tab): void =>
              store.local.update({ currentMenuState: tab })
            }
            openProfile={(): void =>
              store.local.update({ isProfileOpen: true })
            }
            closeProfile={(): void =>
              store.local.update({ isProfileOpen: false })
            }
            onClick={(): void => {
              if (!isMatches) return;

              store.local.update({ isChatOpen: false });
            }}
          />
        ))}
      </section>
    </nav>
  );
};
