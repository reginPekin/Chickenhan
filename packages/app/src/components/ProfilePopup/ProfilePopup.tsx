import React, { useRef, useState } from 'react';

import cx from 'classnames';

import styles from './ProfilePopup.module.css';

import { ImageLoader } from '@chickenhan/components/src/ImageLoader';
import { BasicInput } from '@chickenhan/components/src/BasicInput';
import { PositionAwareButton } from '@chickenhan/components/src/PositionAwareButton';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { handleFile } from '@chickenhan/components/src/utils';

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
        setFiles={(file): void => {
          handleFile(file, fileUrl =>
            store.user.update({ avatar: fileUrl as string }),
          );
        }}
      >
        <header className={styles.profilePopupModal}>Edit profile</header>
        <section className={styles.sectionProfilePopup}>
          <div className={styles.modalSection}>
            <ImageLoader
              previewImage={user.avatar}
              onFileLoaded={(files): void =>
                handleFile(files, file => {
                  store.user.update({ avatar: file as string });
                })
              }
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
