import React, { useRef, useState, useEffect } from 'react';

import styles from './ImageLoader.module.css';

import { handleFile } from '../utils';

interface ImageLoaderProps {
  files?: File[];
  setFiles?: (file: File[]) => void;

  children?: JSX.Element;
  loadedImgStyle?: React.CSSProperties;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  files = [],
  setFiles = (): void => undefined,

  children,
  loadedImgStyle = {},
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null,
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      handleFile(files, file => setPreviewUrl(file));
      return;
    }
    setPreviewUrl(null);
  }, [files]);

  // не получается здесь тип задать
  function renderLoadedImage(): any {
    if (!previewUrl) return children;

    return (
      <div style={loadedImgStyle}>
        <img
          height="100%"
          src={previewUrl as string}
          className={styles.loadedImg}
        />
      </div>
    );
  }

  return (
    <section>
      <div />
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event): void => {
          if (event && event.target && event.target.files) {
            setFiles(Array.prototype.slice.call(event.target.files));
            handleFile(event.target.files, file => setPreviewUrl(file));
          }
        }}
        className={styles.input}
      />
      <div
        onClick={(): void => inputRef.current?.click()}
        className={styles.clicker}
      >
        {renderLoadedImage()}
      </div>
    </section>
  );
};
