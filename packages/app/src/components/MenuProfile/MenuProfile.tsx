import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './MenuProfile.module.css';

import { Avatar } from '@chickenhan/components/src/Avatar';

import { useStore } from '../../store';
import { TOKEN_KEY } from '../../consts';
import { chickenhan } from '../../store/chickenhan';

export const MenuProfile: React.FC = () => {
  const store = useStore();
  const history = useHistory();

  const [user] = store.user.useState();
  const isProfileOpen = store.local.useSelector(local => local.isProfileOpen);

  function closeProfilePopup(): void {
    if (isProfileOpen) store.local.update({ isProfileOpen: false });
  }

  function resetAll(): void {
    store.chat.reset();
    store.chats.reset();
    store.local.reset();
    store.messages.reset();
    store.user.reset();
    store.writeBox.reset();
  }

  return (
    <section className={styles.profile}>
      <div className={styles.label}>
        <span>Profile</span>
      </div>
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
              color: 'var(--black)',
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
          <div
            className={styles.menuItem}
            onClick={(): void => {
              chickenhan.websocket.setOffline();
              window.localStorage.removeItem(TOKEN_KEY);
              history.push('/login');

              resetAll();

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
