import React, { useState } from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';
import { LogoIcon } from '../Icons';

import styles from './MenuSidebar.module.css';

import { menuElements } from './consts';

export const MenuSidebar: React.FC = () => {
  const [choosenTab, setChoosenTab] = useState<string>('chats');

  const index: number = menuElements.findIndex(tab => tab.name === choosenTab);

  return (
    <main className={styles.menuSidebar}>
      <div
        className={styles.logoSection}
        onClick={(): void => setChoosenTab('chats')}
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
    </main>
  );
};
