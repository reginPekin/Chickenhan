import React, { useReducer } from 'react';

import styles from './DragAndDrop.module.css';

import cx from 'classnames';
import { handleImages } from '../utils';

interface DragAndDropProps {
  children?: React.ReactNode | React.ReactNode[];
  onFilesDrop: (files: string[]) => void; // base64[]

  options?: Partial<DraggableOptions>;
}

type FileTransfer = 'path' | 'file';

interface DraggableOptions {
  filesLimit: number;
  fileTransfer: FileTransfer;
  // fileTypes: 'image/jpeg'
}

const defaultOptions: DraggableOptions = {
  filesLimit: 3,
  fileTransfer: 'path',
};

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  children = undefined,
  onFilesDrop = (): void => undefined,

  options = defaultOptions,
}) => {
  const params: DraggableOptions = Object.assign(defaultOptions, options);

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
          fileList: action.files as any,
        };
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(reducer, reducerInitialState);

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

    // restrict droped files amount
    const files = [...(event.dataTransfer.files as any)].slice(
      0,
      params.filesLimit,
    );

    if (!files || files.length === 0) {
      return;
    }

    if (params.fileTransfer === 'path') handleImages(files, onFilesDrop);
    else onFilesDrop(files);

    event.dataTransfer.clearData();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }

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
