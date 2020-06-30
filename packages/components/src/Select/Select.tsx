import React, { useState, useRef } from 'react';

import styles from './Select.module.css';

import { useOnClickOutside } from '../utils/hooks';

interface Option {
  label: string;
  value: string;
  description?: string;
  selected?: boolean;
}

interface SelectProps {
  options: Option[];
  title: string;

  setSelectedOption?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  title,
  options,
  setSelectedOption = (): void => undefined,
}) => {
  const defaultValue = options.filter(option => option.selected);

  const selectRef = useRef(null);

  const [choosenOption, setChoosenOption] = useState<Option>(defaultValue[0]);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useOnClickOutside(selectRef, () => setIsOpened(false));

  return (
    <section className={styles.select} ref={selectRef}>
      <div
        className={styles.selectSection}
        onClick={(): void => setIsOpened(!isOpened)}
      >
        <span className={styles.selecTitle}>{title}</span>
        <span>{choosenOption.label}</span>
      </div>
      <section
        className={styles.dropDownSelect}
        style={{ display: isOpened ? 'flex' : 'none' }}
      >
        {options.map((option, key) => (
          <div
            key={key}
            className={styles.option}
            onClick={(): void => {
              setIsOpened(false);
              setChoosenOption(option);
              setSelectedOption(option.value);
            }}
          >
            <span className={styles.label}>{option.label}</span>
            <span className={styles.description}>{option.description}</span>
          </div>
        ))}
      </section>
    </section>
  );
};
