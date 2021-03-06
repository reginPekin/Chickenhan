import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BioContext } from '../App';

import { useStore } from '../../store';
import { chickenhan } from '../../store/chickenhan';

import { DeleteIcon } from '../Icons';

import { useOnClickOutside } from '@chickenhan/components/src/utils/hooks';

import { Avatar } from '@chickenhan/components/src/Avatar';

import styles from './PopupBio.module.css';

export const PopupBio: React.FC = () => {
  const store = useStore();
  const userId = store.user.useSelector(user => user.id);
  const isPopupOpen = store.local.useSelector(local => local.isBioPopupOpen);

  const history = useHistory();

  const { bioId } = useContext(BioContext);

  const [bio, setBio] = useState<any>(null);

  async function getBio(): Promise<void> {
    if (!bioId) return;

    const uploadedBio = await chickenhan.user.getUser(bioId);
    setBio(uploadedBio);
  }

  React.useEffect(() => {
    getBio();
  }, [bioId]);

  const popupRef = useRef<HTMLDivElement>(null);

  function closePopup(): void {
    store.local.update({ isBioPopupOpen: false });
  }

  useOnClickOutside(popupRef, closePopup);

  function renderMessageButton(): React.ReactNode {
    if (bioId === userId) return;

    return (
      <button
        onClick={async (): Promise<void> => {
          if (!bio.id) return;

          const dialog = await chickenhan.chats.getDialog(bio.id);

          chickenhan.websocket.addDialog(bio.id, dialog.chatId);

          history.push(`${dialog.chatId}`);
          closePopup();
        }}
        className={styles.button}
      >
        Write the message
      </button>
    );
  }

  if (!isPopupOpen) return null;

  return (
    <main className={styles.popup}>
      <section ref={popupRef} className={styles.popupContent}>
        <DeleteIcon className={styles.deleteIcon} onClick={closePopup} />

        <Avatar url={bio?.avatar} width={96} />
        <span className={styles.login}>{bio?.login}</span>
        {renderMessageButton()}
      </section>
    </main>
  );
};
