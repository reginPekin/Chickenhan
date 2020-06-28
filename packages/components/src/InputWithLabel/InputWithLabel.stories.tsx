import React from 'react';

import { InputWithLabel } from './InputWithLabel';

import { storiesOf } from '@storybook/react';

storiesOf('InputWithLabel', module).add('Simple label', () => (
  <InputWithLabel placeholder="Name" />
));
