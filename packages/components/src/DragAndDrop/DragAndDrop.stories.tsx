import { storiesOf } from '@storybook/react';
import React from 'react';

import { DragAndDrop } from './DragAndDrop';

storiesOf('DragAndDrop', module).add('D&D example', () => {
  const [images, setFiles] = React.useState<string[]>([]);

  return (
    <section style={{ width: '100vh', height: '100vh' }}>
      <DragAndDrop onFilesDrop={(paths): void => setFiles(paths)}>
        {images.map((image, key) => (
          <img key={key} src={image} />
        ))}
      </DragAndDrop>
    </section>
  );
});
