import React from 'react';

import cx from 'classnames';

import { Message as TypeMessage } from '../types';

import { Avatar } from '../Avatar';

import { parseTime } from '../utils';

import styles from './Message.module.css';

interface MessageProps {
  message: TypeMessage;
  openBioPopup?: (id: number) => void;
  pending?: boolean;
}

export const Message: React.FC<MessageProps> = React.memo(
  ({ message, openBioPopup = (): void => undefined }) => {
    function renderAuthor(): JSX.Element {
      return (
        <div className={styles.nameAndDate}>
          <span
            className={styles.pointer}
            onClick={(): void => openBioPopup(message.author.id)}
          >
            {message.author.login}
          </span>
          <div>
            <span
              style={{ display: message.author.isOnline ? 'block' : 'none' }}
              className={styles.onlineCircle}
            />
          </div>
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
      <article className={styles.messageArticle}>
        <div
          className={styles.pointer}
          onClick={(): void => openBioPopup(message.author.id)}
        >
          <Avatar url={message.author.avatar} width={40} />
        </div>
        <div className={styles.textInfo}>
          {renderAuthor()}
          <span className={styles.messageText}>{message.text}</span>
          {renderPictures()}
        </div>
      </article>
    );
  },
);
