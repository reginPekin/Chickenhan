import React, { useRef, useState, useEffect } from 'react';

import styles from './ImageLoader.module.css';

export const ImageLoader: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target || !event.target.files) {
      return;
    }

    const files: File[] = Array.prototype.slice.call(event.target.files);

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = async (): Promise<void> => {
        const b64image = reader.result;

        const img = new Image();
        img.src = `${b64image}`;

        const form = new FormData();
        form.append('photo', file);

        setPreviewUrl(reader.result);
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    }
  };

  return (
    <section>
      <div />
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFile}
        className={styles.input}
      />
      <img src={previewUrl as string} />
      <span
        onClick={(): void => inputRef.current?.click()}
        className={styles.clicker}
      >
        I am clicker
      </span>
    </section>
  );
};
