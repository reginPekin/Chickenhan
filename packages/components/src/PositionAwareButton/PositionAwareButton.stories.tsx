import { storiesOf } from '@storybook/react';
import React from 'react';

import { PositionAwareButton } from './PositionAwareButton';

storiesOf('PositionAwareButton', module).add('Simple', () => {
  return (
    <div style={{ margin: '100px', width: '100px', height: '40px' }}>
      <PositionAwareButton>Hi</PositionAwareButton>
    </div>
  );
});
