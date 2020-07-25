import React, { useRef } from 'react';

import styles from './ImagePopup.module.css';

import { WriteBox } from '@chickenhan/components/src/WriteBox';

import { DeleteIcon } from '../Icons';

import { useOnClickOutside } from '@chickenhan/components/src/utils/hooks';

interface ImagePopupProps {
  isOpen: boolean;
  images64: string[];
  closePopup: () => void;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({
  isOpen,
  images64,
  closePopup,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(popupRef, () => closePopup());

  if (!isOpen) return null;

  return (
    <main className={styles.popup}>
      <section className={styles.popupContent} ref={popupRef}>
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
              {images64.map((image, key) => (
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src={image}
                  key={key}
                  className={styles.img}
                />
              ))}
            </div>
          </article>
        </div>
        <footer className={styles.footer}>
          <WriteBox placeholder="Add a comment..." />
        </footer>
      </section>
    </main>
  );
};
