import React from 'react';

import styles from './Avatar.module.css';

interface AvatarProps {
  url: string;
  chatType?: string;
  width?: number;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({ url, chatType = 'dialog', width = 48, style = {} }) => {
    return (
      <div
        className={styles.avatarSection}
        style={{
          width: width,
          height: width,
          ...style,
        }}
      >
        <img
          src={url}
          height={width}
          width={width}
          style={{
            borderRadius: chatType === 'dialog' ? '50%' : '30%',
          }}
          className={styles.img}
        />
      </div>
    );
  },
);
