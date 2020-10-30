import React, { useRef, useState } from 'react';

import styles from './MenuInputSearch.module.css';

import { BasicInput } from '@chickenhan/components/src/BasicInput';

import { SearchIcon, DeleteIcon } from '@chickenhan/components/src/Icons';

export const MenuInputSearch: React.FC = () => {
  const [isSearchedValue, setIsSearchedValue] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className={styles.searchSection}>
      <SearchIcon className={styles.searchIcon} />
      <BasicInput
        ref={searchInputRef}
        placeholder="Find a chat..."
        onChange={(event): void => {
          //@@@@ check
          setIsSearchedValue(Boolean(event.target.value));
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
};
