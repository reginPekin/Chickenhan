import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileMenu.module.css';

import { Avatar } from '@chickenhan/components/src/Avatar';

import { useStore } from '../../store';

export const ProfileMenu: React.FC = () => {
  const store = useStore();

  const [user] = store.user.useState();
  const isProfileOpen = store.local.useSelector(local => local.isProfileOpen);

  function closeProfilePopup(): void {
    if (isProfileOpen) store.local.update({ isProfileOpen: false });
  }

  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar url={user.avatar} width={96} />
        <span className={styles.name}>{user.login}</span>
      </div>
      <nav>
        <section className={styles.navSection}>
          <div className={styles.menuLabel}>User</div>
          <div
            className={styles.menuItem}
            onClick={(): void => {
              if (!isProfileOpen) store.local.update({ isProfileOpen: true });
            }}
          >
            Edit profile
          </div>
        </section>

        <section className={styles.navSection}>
          <div className={styles.menuLabel}>The main</div>
          <Link
            to={`/chat/00000000000`}
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <div
              className={styles.menuItem}
              onClick={(): void => {
                closeProfilePopup();
              }}
            >
              Write to developer
            </div>
          </Link>
          {/* <div className={styles.menuItem}>Mode</div> */}
          <div
            className={styles.menuItem}
            onClick={(): void => {
              closeProfilePopup();
            }}
          >
            Sign out
          </div>
        </section>
      </nav>
    </section>
  );
};