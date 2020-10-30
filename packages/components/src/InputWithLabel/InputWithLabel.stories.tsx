import React, { useEffect, useRef } from 'react';

import { InputWithLabel } from './InputWithLabel';

import { storiesOf } from '@storybook/react';

storiesOf('InputWithLabel', module).add('Simple label', () => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => ref.current?.focus(), []);

  return (
    <div style={{ margin: '20px' }}>
      <InputWithLabel placeholder="Name" ref={ref} />
    </div>
  );
});
