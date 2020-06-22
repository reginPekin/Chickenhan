import React from 'react';
import { Message as TypeMessage } from '../types';

import { Avatar } from '../Avatar';

import { parseTime } from '../utils';

import styles from './Message.module.css';

interface MessageProps {
  message: TypeMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const TextInformation: React.FC = () => (
    <div className={styles.textInfo}>
      <div className={styles.nameAndDate}>
        <span>{message.author.name}</span>
        <span
          style={{ display: message.author.online ? 'block' : 'none' }}
          className={styles.onlineCircle}
        />
        <time className={styles.date}>{parseTime(message.date)}</time>
      </div>
      <span>{message.text}</span>
    </div>
  );

  return (
    <section className={styles.message}>
      <div className={styles.messageInfo}>
        <article className={styles.messageArticle}>
          <Avatar url={message.author.avatar} width={40} />
          <TextInformation />
        </article>
      </div>
    </section>
  );
};
