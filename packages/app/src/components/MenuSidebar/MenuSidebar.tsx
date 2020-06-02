import React, { useState } from 'react';

import { MenuIcon } from '@chickenhan/components/src/MenuIcon';

import styles from './MenuSidebar.module.css';

import { menuElements } from './consts';

export const MenuSidebar: React.FC = () => {
  const [choosenTab, setChoosenTab] = useState('chats'); // если добавляю тип string, то ts выдаёт ошибку

  const choosenTabParams: any = menuElements.find(
    tab => tab.name === choosenTab,
  );

  return (
    <div className={styles.menuSidebar}>
      <div
        className={styles.rightSlider}
        style={{
          top: `${choosenTabParams.index * 64}px`,
        }}
      />
      {menuElements.map((element, key) => (
        <MenuIcon
          key={key}
          iconParams={element}
          setChoosenTab={(tab: string) => setChoosenTab(tab)}
        />
      ))}
    </div>
  );
};
