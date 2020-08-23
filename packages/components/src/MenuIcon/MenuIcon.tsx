import React from 'react';

import styles from './MenuIcon.module.css';

interface IconProps {
  fill?: string | undefined;
  stroke?: string | undefined;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

type MenuState = 'discover' | 'chats' | 'profile';

interface MenuElement {
  description?: string;
  name: MenuState;
  Icon: React.FC<IconProps>;
}

interface MenuIconProps {
  menuElement: MenuElement;
  isActiveTab: boolean;
  setCurrentMenuState: (tab: MenuState) => void;
  openProfile: () => void;
  closeProfile: () => void;
}

export const MenuIcon: React.FC<MenuIconProps> = React.memo(
  ({
    menuElement,
    isActiveTab,
    setCurrentMenuState = (): void => undefined,
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
          setCurrentMenuState(menuElement.name);
          if (menuElement.name === 'profile') openProfile();
          else closeProfile();
        }}
      >
        <div className={styles.iconBlock}>
          <Icon
            fill={isActiveTab ? `var(--main-yellow)` : undefined}
            stroke={isActiveTab ? `var(--main-yellow)` : 'var(--black)'}
          />
        </div>
        {renderDecription()}
      </div>
    );
  },
);
