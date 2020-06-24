import React, { useRef, useState } from 'react';

import styles from './MenuHeader.module.css';

import { MenuState } from '../../../app/src/components/MenuSidebar/consts';

import { BasicInput } from '../BasicInput';

import { SearchIcon, DeleteIcon, AddChatIcon } from '../Icons';

interface HeaderProps {
  label: string;
  choosenTab: MenuState;
}

export const MenuHeader: React.FC<HeaderProps> = ({ label, choosenTab }) => {
  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  function isChat(): boolean {
    return choosenTab === 'chats' || choosenTab === 'discover';
  }

  function isSearched(): boolean {
    return choosenTab === 'chats' || choosenTab === 'discover';
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
        <AddChatIcon style={{ display: isChat() ? 'flex' : 'none' }} />
      </div>
      {renderSearchInput()}
    </header>
  );
};
