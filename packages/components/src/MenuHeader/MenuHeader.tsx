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
  const [searchValue, setSearchValue] = useState<string>('');

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
      <BasicInput
        placeholder="Find a chat..."
        onSubmit={(): null => null} // пока ничего нет
        onChange={(value): void => setSearchValue(value)}
        inputRef={searchInputRef}
        inputSectionStyle={{ marginTop: 0 }}
        renderLeftElements={(): JSX.Element => <SearchIcon />}
        renderRightElements={(): JSX.Element => (
          <button
            onClick={(): void => {
              if (searchInputRef.current) searchInputRef.current.value = '';
              setSearchValue('');
            }}
            style={{ visibility: searchValue ? 'visible' : 'hidden' }}
            className={styles.iconButton}
          >
            <DeleteIcon />
          </button>
        )}
      />
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.label}>
        <span>{label}</span>
        <button
          style={{ display: isChat() ? 'flex' : 'none' }}
          className={styles.iconButton}
        >
          <AddChatIcon />
        </button>
      </div>
      {renderSearchInput()}
    </header>
  );
};
