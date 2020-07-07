import { storiesOf } from '@storybook/react';
import React from 'react';

import { DragAndDrop } from './DragAndDrop';

storiesOf('DragAndDrop', module).add('D&D example', () => {
  return (
    <section style={{ width: '100vh', height: '100vh' }}>
      <DragAndDrop />
    </section>
  );
});
