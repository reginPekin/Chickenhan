import React, { useRef, useState } from 'react';

// import { SearchIcon } from '../../../app/src/components/Icons';

import styles from './Header.module.css';
import { MenuState } from '../../../app/src/components/MenuSidebar/consts';

import { SearchIcon, DeleteIcon } from '../Icons';

interface HeaderProps {
  label: string;
  choosenTab: MenuState;
}

export const Header: React.FC<HeaderProps> = ({ label, choosenTab }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  function isSearched(): boolean {
    switch (choosenTab) {
      case 'chats':
        return true;
      case 'discover':
        return true;
      case 'newChat':
        return false;
      case 'profile':
        return false;
      default:
        return false;
    }
  }

  function renderSearchInput(): React.ReactNode {
    if (!isSearched()) return null;
    return (
      <section className={styles.searchSection}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          placeholder="Find chat"
          ref={searchInputRef}
          onChange={(event): void => setSearchValue(event?.target?.value)}
        />
        <button
          onClick={(): void => {
            if (searchInputRef.current) searchInputRef.current.value = '';
            setSearchValue('');
          }}
          style={{ visibility: searchValue ? 'visible' : 'hidden' }}
          className={styles.deleteButton}
        >
          <DeleteIcon />
        </button>
      </section>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.label}>{label}</div>
      {renderSearchInput()}
    </header>
  );
};
