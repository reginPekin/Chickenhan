import React, { useState } from 'react';

import styles from './ProfilePopup.module.css';

import { MOCK_USER_1 } from '@chickenhan/components/src/__mocks__';

import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { handleFile } from '@chickenhan/components/src/utils';

export const ProfilePopup: React.FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    MOCK_USER_1.avatar,
  ); // use store

  return (
    <main className={styles.profilePopup}>
      <header className={styles.profilePopupModal}>Edit profile</header>
      <section className={styles.sectionProfilePopup}>
        <div className={styles.modalSection}>
          <ImageLoader
            previewImage={avatar}
            onFileLoaded={(files): void =>
              handleFile(files, file => setAvatar(file))
            }
          />
        </div>
        <div className={styles.modalSection}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Name</label>
            <div className={styles.input}>
              <BasicInput placeholder={MOCK_USER_1.login} />
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.profilePopupModal}>
        <div className={styles.buttonWrapper}>
          <button className={styles.button}>Save</button>
        </div>
      </footer>
    </main>
  );
};
