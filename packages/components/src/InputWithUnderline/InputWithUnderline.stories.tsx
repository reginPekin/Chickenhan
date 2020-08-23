import React from 'react';

import { InputWithUnderline } from './InputWithUnderline';

import { storiesOf } from '@storybook/react';

storiesOf('InputWithUnderline', module).add('Password and text inputs', () => (
  <section>
    <div style={{ margin: '20px' }}>
      <InputWithUnderline type="password" label="Enter your password" />
    </div>
    <div style={{ margin: '20px' }}>
      <InputWithUnderline />
    </div>
  </section>
));
