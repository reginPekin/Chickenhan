import React from 'react';

import { Icon } from '../../types';

import styles from './MenuIcon.module.css';

interface MenuIconProps {
  iconParams: Icon;
  setChoosenTab: (tab: string) => any;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  iconParams,
  setChoosenTab = () => null,
}) => {
  return (
    <div
      className={styles.iconSection}
      onClick={() => {
        setChoosenTab(iconParams.name);
      }}
    >
      <div className={styles.iconBlock}>
        <iconParams.src />
      </div>
      <span className={styles.descriptionArrow} />
      <span className={styles.iconDescription}>{iconParams.description}</span>
    </div>
  );
};
