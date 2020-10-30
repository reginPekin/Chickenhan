import { storiesOf } from '@storybook/react';
import React from 'react';

import { BasicInput } from './BasicInput';

storiesOf('BasicInput', module).add('Simple', () => {
  return (
    <section>
      <div style={{ margin: '100px', width: '100px', height: '40px' }}>
        <BasicInput />
      </div>
    </section>
  );
});
