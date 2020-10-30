import { storiesOf } from '@storybook/react';
import React from 'react';

import { PositionAwareButton } from './PositionAwareButton';

storiesOf('PositionAwareButton', module).add('Simple', () => {
  return (
    <section>
      <div style={{ margin: '100px', width: '100px', height: '40px' }}>
        <PositionAwareButton>Simple button</PositionAwareButton>
      </div>
      <div style={{ margin: '100px', width: '100px', height: '40px' }}>
        <PositionAwareButton
          backgroundColor="var(--black)"
          hoveredColor="var(--hover-black)"
          clickedColor="var(--click-black)"
          textColor="var(--white)"
        >
          Black button
        </PositionAwareButton>
      </div>
    </section>
  );
});
