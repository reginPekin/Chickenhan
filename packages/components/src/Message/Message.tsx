import React from 'react';

import cx from 'classnames';

import { Message as TypeMessage } from '../types';

import { Avatar } from '../Avatar';

import { parseTime } from '../utils';

import styles from './Message.module.css';

interface MessageProps {
  message: TypeMessage;
  pending?: boolean;
}

export const Message: React.FC<MessageProps> = React.memo(
  ({ message, pending }) => {
    function renderAuthor(): JSX.Element {
      return (
        <div className={styles.nameAndDate}>
          <span>{message.author.login}</span>
          <div>
            <span
              style={{ display: message.author.isOnline ? 'block' : 'none' }}
              className={styles.onlineCircle}
            />
          </div>
          <time className={styles.date}>{parseTime(message.date)}</time>
          {/* статус отправки сообщения (если в режиме ожидания) */}
          {/* <div>{pending ? 'Peeending' : ''}</div> */}
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
        <Avatar url={message.author.avatar} width={40} />
        <div className={styles.textInfo}>
          {renderAuthor()}
          <span className={styles.messageText}>{message.text}</span>
          {renderPictures()}
        </div>
      </article>
    );
  },
);
