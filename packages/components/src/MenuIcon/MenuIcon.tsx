import React from 'react';

import {
  MenuElement,
  MenuState,
} from '../../../app/src/components/MenuSidebar/consts';

import styles from './MenuIcon.module.css';

interface MenuIconProps {
  menuElement: MenuElement;
  isActiveTab: boolean;
  setchosenTab: (tab: MenuState) => void;
  openProfile: () => void;
  closeProfile: () => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  menuElement,
  isActiveTab,
  setchosenTab = (): void => undefined,
  openProfile,
  closeProfile,
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
        setchosenTab(menuElement.name);
        if (menuElement.name === 'profile') openProfile();
        else closeProfile();
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
