import React, { useRef, useState, useEffect } from 'react';

import styles from './ImageLoader.module.css';

import { Avatar } from '../Avatar';
import { handleImages } from '../utils';

interface ImageLoaderProps {
  onFileLoaded?: (image: string) => void;

  children?: JSX.Element;
  previewImage?: string | ArrayBuffer | null;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  onFileLoaded = (): void => undefined,
  previewImage = null,

  children,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    previewImage,
  );

  useEffect(() => setPreviewUrl(previewImage), [previewImage]);

  function renderLoadedImage(): React.ReactNode {
    if (!previewUrl) return children;

    return <Avatar url={String(previewUrl)} width={96} />;
  }

  return (
    <section>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event): void => {
          if (!event?.target?.files || event.target.files.length === 0) {
            return;
          }
          const blobs = [...(event.target.files as any)].slice(0, 1);

          handleImages(blobs, paths => {
            setPreviewUrl(paths[0]);
            onFileLoaded(paths[0]);
          });
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
