import React from 'react';

import { Message } from './Message';

import {
  MOCK_MESSAGE_LINE_1,
  MOCK_MESSAGE_LINE_2,
  MOCK_MESSAGE_LINE_3,
} from '../__mocks__';

import { storiesOf } from '@storybook/react';

storiesOf('Message', module).add('Just text', () => (
  <Message message={MOCK_MESSAGE_LINE_1} />
));
storiesOf('Message', module).add('Just picture', () => (
  <Message message={MOCK_MESSAGE_LINE_2} />
));
storiesOf('Message', module).add('Text & picture', () => (
  <Message message={MOCK_MESSAGE_LINE_3} />
));
