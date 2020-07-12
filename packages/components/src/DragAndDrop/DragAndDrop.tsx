import React, { useReducer, useEffect } from 'react';

import styles from './DragAndDrop.module.css';

import cx from 'classnames';

interface DragAndDropProps {
  children?: JSX.Element;
  setFiles: (file: File[]) => void;

  dropEvent?: () => void;
}

interface ReducerState {
  dropDepth: number;
  inDropZone: boolean;
  fileList: File[];
}

interface ReducerAction {
  type: string;
  dropDepth?: number;
  inDropZone?: boolean;
  files?: File[];
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  children = undefined,
  setFiles = (): void => undefined,
  dropEvent = (): void => undefined,
}) => {
  const reducerInitialState = { dropDepth: 0, inDropZone: false, fileList: [] };

  const reducer = (
    state: ReducerState,
    action: ReducerAction,
  ): ReducerState => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth || 0 };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone || false };
      case 'ADD_FILE_TO_LIST':
        return {
          ...state,
          fileList: state.fileList.concat(action.files as any),
        };
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(reducer, reducerInitialState);
  console.log(data.fileList);

  function handleDragEnter(event: React.DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  }

  function handleDragLeave(event: React.DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }

  function handleDragOver(event: React.DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  }

  function handleDrop(event: React.DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    let files = [...(event.dataTransfer.files as any)];

    if (files && files.length > 0) {
      dropEvent();
      const existingFiles = data.fileList.map(file => file.name);
      files = files.filter(file => !existingFiles.includes(file.name));

      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      event.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  }

  // If necessary, transfer droped files to the component above
  useEffect(() => {
    setFiles(data.fileList);
  }, [data.fileList]);

  return (
    <section
      className={cx(styles.dragDropZone, {
        // вторая проверка нужна, потому что при выходе из DropZone data.inDropZone не обнуляется, не знаю почему
        [styles.insideDragDrea]: data.inDropZone && data.dropDepth > 0,
      })}
      onDrop={(event): void => handleDrop(event)}
      onDragOver={(event): void => handleDragOver(event)}
      onDragEnter={(event): void => handleDragEnter(event)}
      onDragLeave={(event): void => handleDragLeave(event)}
    >
      {children}
    </section>
  );
};
