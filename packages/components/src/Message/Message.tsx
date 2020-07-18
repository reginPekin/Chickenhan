import React from 'react';
import { useHover } from '../utils/hooks';

import cx from 'classnames';

import { Message as TypeMessage } from '../types';

import { Avatar } from '../Avatar';

import { parseTime } from '../utils';
import { MoreIcon } from '../Icons';

import styles from './Message.module.css';

interface MessageProps {
  message: TypeMessage;
}

export const Message: React.FC<MessageProps> = React.memo(({ message }) => {
  const [infoRef, isInfoHovered] = useHover();

  function renderAuthor(): JSX.Element {
    return (
      <div className={styles.nameAndDate}>
        <span>{message.author.name}</span>
        <span
          style={{ display: message.author.isOnline ? 'block' : 'none' }}
          className={styles.onlineCircle}
        />
        <time className={styles.date}>{parseTime(message.date)}</time>
      </div>
    );
  }

  function renderPictures(): JSX.Element {
    return (
      <article className={styles.picturesArray}>
        {message.pictures?.map(picture => (
          <div
            className={cx(styles.pictureSection, styles.messageFile)}
            key={picture.id}
          >
            <img className={styles.picture} src={picture.url} />
          </div>
        ))}
      </article>
    );
  }

  return (
    <article
      className={styles.messageArticle}
      style={{
        background: isInfoHovered ? 'var(--light-grey)' : 'none',
      }}
    >
      <Avatar url={message.author.avatar} width={40} />
      <div className={styles.textInfo}>
        {renderAuthor()}
        <span className={styles.messageText}>{message.text}</span>
        {renderPictures()}
        <aside className={styles.moreInfo}>
          <aside ref={infoRef} className={styles.moreIconInner}>
            <MoreIcon />
          </aside>
        </aside>
      </div>
    </article>
  );
});
