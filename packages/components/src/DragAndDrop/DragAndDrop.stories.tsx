import { storiesOf } from '@storybook/react';
import React from 'react';

import { DragAndDrop } from './DragAndDrop';

storiesOf('DragAndDrop', module).add('D&D example', () => {
  const [files, setFiles] = React.useState<File[]>([]);

  console.log(files, ' loaded files');

  return (
    <section style={{ width: '100vh', height: '100vh' }}>
      <DragAndDrop setFiles={(file): void => setFiles(file)} />
    </section>
  );
});
