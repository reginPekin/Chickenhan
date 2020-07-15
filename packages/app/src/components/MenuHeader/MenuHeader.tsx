import React, { useRef, useState } from 'react';

import styles from './MenuHeader.module.css';

import { MenuState } from '../MenuSidebar/consts';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import {
  SearchIcon,
  DeleteIcon,
  AddChatIcon,
} from '@chickenhan/components/src/Icons';

import { getTenorGifs } from '@chickenhan/sdk/lib';

import { useStore } from '../../store';

interface HeaderProps {
  label: string;
  chosenTab: MenuState;
}

export const MenuHeader: React.FC<HeaderProps> = ({ label, chosenTab }) => {
  const store = useStore();

  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  function isChat(): boolean {
    return chosenTab === 'chats' || chosenTab === 'discover';
  }

  function isSearched(): boolean {
    return chosenTab === 'chats' || chosenTab === 'discover';
  }

  function renderSearchInput(): React.ReactNode {
    if (!isSearched()) return null;

    return (
      <section className={styles.searchSection}>
        <SearchIcon className={styles.searchIcon} />
        <BasicInput
          ref={searchInputRef}
          placeholder="Find a chat..."
          onChange={(event): void => {
            if (event.target.value && !isSearchedValue) {
              setIsSearchedValue(true);
            }
            if (!event.target.value && isSearchedValue) {
              setIsSearchedValue(false);
            }
          }}
          onSubmit={(): void => undefined}
        />
        <DeleteIcon
          className={styles.deleteIcon}
          style={{ display: isSearchedValue ? 'block' : 'none' }}
          onClick={(): void => {
            getTenorGifs();
            if (searchInputRef.current) {
              searchInputRef.current.value = '';
            }
            setIsSearchedValue(false);
          }}
        />
      </section>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.label}>
        <span>{label}</span>
        <AddChatIcon
          className={styles.addChatIcon}
          style={{ display: isChat() ? 'flex' : 'none' }}
          onClick={(): void => {
            store.local.update({ isNewChatPopupOpen: true });
          }}
        />
      </div>
      {renderSearchInput()}
    </header>
  );
};
