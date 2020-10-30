import React from 'react';

import { WriteBox } from './WriteBox';

import { storiesOf } from '@storybook/react';

storiesOf('WriteBox', module).add('Write box', () => (
  <WriteBox value="default value" />
));
