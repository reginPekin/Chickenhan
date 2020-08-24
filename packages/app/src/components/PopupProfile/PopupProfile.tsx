import React, { useRef, useState } from 'react';

import cx from 'classnames';

import styles from './PopupProfile.module.css';

import { AvatarLoader } from '@chickenhan/components/src/AvatarLoader';
import { BasicInput } from '@chickenhan/components/src/BasicInput';
import { PositionAwareButton } from '@chickenhan/components/src/PositionAwareButton';
import { DragAndDrop } from '@chickenhan/components/src/DragAndDrop';

import { useStore } from '../../store';

export const PopupProfile: React.FC = () => {
  const store = useStore();

  const inpuRef = useRef<HTMLInputElement>(null);

  const isProfileOpen = store.local.useSelector(local => local.isProfileOpen);

  const [user] = store.user.useState();

  const [newName, setNewName] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  function changeUsername(): void {
    if (newName && newName !== user.login) {
      store.user.update({ login: newName });
      setLoginError('');
    } else {
      setLoginError('Enter new username');
    }
  }

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
            <AvatarLoader
              previewImage={user.avatar}
              onFileLoaded={(avatar: string): void =>
                store.user.update({ avatar })
              }
            />
          </div>
          <div className={styles.modalSection}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Name</label>

              {loginError && <span className={styles.error}>{loginError}</span>}

              <div
                className={styles.input}
                style={{
                  backgroundColor: loginError
                    ? 'var(--light-red)'
                    : 'var(--light-grey)',
                }}
              >
                <BasicInput
                  style={{
                    backgroundColor: loginError
                      ? 'var(--light-red)'
                      : 'var(--light-grey)',
                  }}
                  placeholder={user.login}
                  ref={inpuRef}
                  onSubmit={(): void => changeUsername()}
                  onChange={(event): void => {
                    setNewName(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <footer className={cx(styles.profilePopupModal, styles.footer)}>
          <PositionAwareButton onClick={(): void => changeUsername()}>
            Save changes
          </PositionAwareButton>
        </footer>
      </DragAndDrop>
    </main>
  );
};
