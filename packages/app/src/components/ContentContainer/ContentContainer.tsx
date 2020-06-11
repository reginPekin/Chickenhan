import React from 'react';
import styles from './ContentContainer.module.css';

import { ChatIcon } from '../Icons';
import { MenuIcon } from '@chickenhan/components/src/MenuIcon';

export const ContentContainer: React.FC = () => {
  return <div className={styles.contentContainer}>
    
    <MenuIcon
        menuElement={{name: "ss", Icon: ChatIcon}} 
        isActiveTab={false}
        setChoosenTab={() => {}}
        />
  </div>;
};
