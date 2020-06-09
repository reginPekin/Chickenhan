import React from 'react';

import styles from './Avatar.module.css';
import { MenuState } from '../../../app/src/components/MenuSidebar/consts';

interface AvatarProps {
  url: string;
  chatType: string;
}

export const Avatar: React.FC<AvatarProps> = ({ url, chatType }) => {
  return (
    <div className={styles.avatarSection}>
      <img
        src={url}
        height={48}
        width={48}
        style={{
          borderRadius: chatType === 'dialog' ? '50%' : '30%',
        }}
      />
    </div>
  );
};
