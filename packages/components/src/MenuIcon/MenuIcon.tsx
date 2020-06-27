import React from 'react';

import {
  MenuElement,
  MenuState,
} from '../../../app/src/components/MenuSidebar/consts';

import styles from './MenuIcon.module.css';

interface MenuIconProps {
  menuElement: MenuElement;
  isActiveTab: boolean;
  setChoosenTab: (tab: MenuState) => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  menuElement,
  isActiveTab,
  setChoosenTab = (): void => undefined,
}) => {
  const Icon = menuElement.Icon;

  function renderDecription(): React.ReactNode {
    if (!menuElement.description) return null;
    return (
      <div className={styles.description}>
        <span className={styles.descriptionArrow} />
        <span className={styles.iconDescription}>
          {menuElement.description}
        </span>
      </div>
    );
  }

  return (
    <div
      className={styles.iconSection}
      onClick={(): void => {
        setChoosenTab(menuElement.name);
      }}
    >
      <div className={styles.iconBlock}>
        <Icon
          fill={isActiveTab ? `var(--main-yellow)` : undefined}
          stroke={isActiveTab ? `var(--main-yellow)` : 'black'}
        />
      </div>
      {renderDecription()}
    </div>
  );
};
