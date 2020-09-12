import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BioContext } from '../App';

import { useStore } from '../../store';
import { chickenhan } from '../../store/chickenhan';

import { DeleteIcon } from '../Icons';

import { useOnClickOutside } from '@chickenhan/components/src/utils/hooks';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './PopupBio.module.css';
import { User } from '@chickenhan/components/src/types';

export const PopupBio: React.FC = () => {
  const store = useStore();
  const isPopupOpen = store.local.useSelector(local => local.isBioPopupOpen);

  const history = useHistory();

  const bioId = useContext(BioContext).bioId;

  const [bio, setBio] = useState<any>(null);

  React.useEffect(() => {
    (async function anyNameFunction(): Promise<void> {
      const uploadedBio = await chickenhan.user.getUser(bioId);
      setBio(uploadedBio);
    })();
  }, [bioId]);

  const popupRef = useRef<HTMLDivElement>(null);

  function closePopup(): void {
    store.local.update({ isBioPopupOpen: false });
  }

  useOnClickOutside(popupRef, () => closePopup());

  if (!isPopupOpen) return null;

  return (
    <main className={styles.popup}>
      <section ref={popupRef} className={styles.popupContent}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={(): void => closePopup()}
        />

        <Avatar url={bio?.avatar} width={96} />
        <span className={styles.login}>{bio?.login}</span>
        <button
          onClick={(): void => {
            history.push(`${bio?.id}`);
            closePopup();
          }}
          className={styles.button}
        >
          Write the message
        </button>
      </section>
    </main>
  );
};
