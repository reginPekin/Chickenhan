import React from 'react';

// import { MenuElement } from '../../../app/src/components/MenuSidebar/consts';
export interface MenuElement {
  description?: string;
  name: string;
  Icon: React.FC<any>;
}

import styles from './MenuIcon.module.css';

interface MenuIconProps {
  menuElement: MenuElement;
  isActiveTab: boolean;
  setChoosenTab: (tab: string) => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  menuElement,
  isActiveTab,
  setChoosenTab = (): void => undefined,
}) => {
  const Icon = menuElement.Icon;

  return (
    <div
      className={styles.iconSection}
      onClick={(): void => {
        setChoosenTab(menuElement.name);
      }}
    >
      <div className={styles.iconBlock}>
        <Icon
          fill={isActiveTab ? '#ffbb00' : undefined}
          stroke={isActiveTab ? '#ffbb00' : 'black'}
        />
      </div>
      <span className={styles.descriptionArrow} />
      <span className={styles.iconDescription}>{menuElement.description}</span>
    </div>
  );
};
