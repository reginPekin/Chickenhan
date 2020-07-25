import React, { useRef, useState } from 'react';

import cx from 'classnames';

import styles from './ProfilePopup.module.css';

import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { BasicInput } from '@chickenhan/components/src/BasicInput';
import { PositionAwareButton } from '@chickenhan/components/src/PositionAwareButton';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { useStore } from '../../store';

export const ProfilePopup: React.FC = () => {
  const store = useStore();

  const inpuRef = useRef<HTMLInputElement>(null);

  const isProfileOpen = store.local.useSelector(local => local.isProfileOpen);

  const [user] = store.user.useState();

  const [newName, setNewName] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  if (!isProfileOpen) return null;

  return (
    <main className={styles.profilePopup}>
      <DragAndDrop
        onFilesDrop={(paths): void => store.user.update({ avatar: paths[0] })}
        options={{ filesLimit: 1 }}
      >
        <header className={styles.profilePopupModal}>Edit profile</header>
        <section className={styles.sectionProfilePopup}>
          <div className={styles.modalSection}>
            <ImageLoader
              previewImage={user.avatar}
              onFileLoaded={(avatar): void => store.user.update({ avatar })}
            />
          </div>
          <div className={styles.modalSection}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Name</label>

              {loginError && <span className={styles.error}>{loginError}</span>}

              <div className={styles.input}>
                <BasicInput
                  placeholder={user.login}
                  ref={inpuRef}
                  onChange={(event): void => {
                    setNewName(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <footer className={cx(styles.profilePopupModal, styles.footer)}>
          <div className={styles.buttonWrapper}>
            <PositionAwareButton
              onClick={(): void => {
                // ещё проверять на уникальность нового логина
                if (newName && newName !== user.login) {
                  store.user.update({ login: newName });
                  setLoginError('');
                } else {
                  setLoginError('Empty space');
                }
              }}
            >
              Save
            </PositionAwareButton>
          </div>
        </footer>
      </DragAndDrop>
    </main>
  );
};
