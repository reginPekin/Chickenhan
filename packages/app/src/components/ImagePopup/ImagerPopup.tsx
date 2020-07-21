import React from 'react';

import styles from './ImagePopup.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { DeleteIcon } from '../Icons';

interface ImagePopupProps {
  isOpen: boolean;
  loadedImgUrl: string | ArrayBuffer | null;
  closePopup: () => void;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({
  isOpen,
  loadedImgUrl,
  closePopup,
}) => {
  if (!isOpen) return null;

  return (
    <main className={styles.popup}>
      <section className={styles.popupContent}>
        <DeleteIcon
          className={styles.deleteIcon}
          fill="#000000"
          onClick={(): void => {
            closePopup();
          }}
        />
        <header className={styles.header}>
          <span className={styles.headerTitle}>Прикрепить фото</span>
        </header>
        <div className={styles.body}>
          <article className={styles.imageSection}>
            <div className={styles.loadedImg}>
              <img
                style={{ width: '100%', height: 'auto' }}
                src={loadedImgUrl as string}
                className={styles.img}
              />
            </div>
          </article>
        </div>
        <footer className={styles.footer}>
          <div className={styles.messageInput}>
            <BasicInput placeholder="Add a comment..." />
          </div>
        </footer>
      </section>
    </main>
  );
};
