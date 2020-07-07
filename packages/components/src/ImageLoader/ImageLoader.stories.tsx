import React from 'react';

import { ImageLoader } from './ImageLoader';

import { storiesOf } from '@storybook/react';

storiesOf('ImageLoader', module).add('Simple image loader', () => (
  <ImageLoader />
));
