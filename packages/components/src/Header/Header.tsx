import React from 'react';

// import { SearchIcon } from '../../../app/src/components/Icons';

import styles from './Header.module.css';
import { MenuState } from '../../../app/src/components/MenuSidebar/consts';

import { SearchIcon, DeleteIcon } from '../Icons';

interface HeaderProps {
  label: string;
  choosenTab: MenuState;
}

export const Header: React.FC<HeaderProps> = ({ label, choosenTab }) => {
  // const searchInputRef = useRef<HTMLInputElement | null>(null);

  // console.log(searchInputRef.current?.value, 'value');

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
          // ref={searchInputRef}
        />
        <button style={{ display: 'none' }}>
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
