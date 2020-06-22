/* eslint-disable react/display-name */
import React from 'react';

import cx from 'classnames';

import { Message as TypeMessage } from '../types';

import { Avatar } from '../Avatar';

import { parseTime } from '../utils';

import styles from './Message.module.css';

interface MessageProps {
  message: TypeMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  function renderAuthor() {
    <div className={styles.nameAndDate}>
      <span>{message.author.name}</span>
      <span
        style={{ display: message.author.online ? 'block' : 'none' }}
        className={styles.onlineCircle}
      />
      <time className={styles.date}>{parseTime(message.date)}</time>
    </div>
  }

  function renderPictures() {
    return(
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
    )
  }

  return (
    <article className={styles.messageArticle}>
      <Avatar url={message.author.avatar} width={40} />
      <div className={styles.textInfo}>
        {renderAuthor}
        <span className={styles.messageText}>{message.text}</span>
        {renderPictures()}
      </div>
    </article>
  );
};
