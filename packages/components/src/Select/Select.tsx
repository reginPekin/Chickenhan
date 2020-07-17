import React, { useState, useRef, useEffect } from 'react';

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

export const Select: React.FC<SelectProps> = React.memo(
  ({ title, options, setSelectedOption = (): void => undefined }) => {
    const defaultValue = options.filter(option => option.selected);

    const selectRef = useRef<HTMLDivElement | null>(null);

    const [chosenOption, setChosenOption] = useState<Option>(defaultValue[0]);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useOnClickOutside(selectRef, () => setIsOpened(false));

    useEffect(() => {
      setChosenOption(defaultValue[0]);
      setSelectedOption(defaultValue[0].value);
    }, []);

    return (
      <section className={styles.select} ref={selectRef}>
        <div
          className={styles.selectSection}
          onClick={(): void => setIsOpened(!isOpened)}
        >
          <span className={styles.selecTitle}>{title}</span>
          <span>{chosenOption.label}</span>
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
                setChosenOption(option);
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
  },
);
