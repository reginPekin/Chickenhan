import React from 'react';

import { SearchInput } from '../SearchInput';

import styles from './Header.module.css';

interface HeaderProps {
  label: string;
}

export const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <header className={styles.header}>
      <div className={styles.label}>{label}</div>
      <SearchInput />
    </header>
  );
};
