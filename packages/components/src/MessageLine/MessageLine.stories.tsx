import React from 'react';

import { Message } from './Message';

import { MOCK_MESSAGE_LINE_1 } from '../__mocks__';

import { storiesOf } from '@storybook/react';

const MessageLineStory: React.FC = () => (
  <Message message={MOCK_MESSAGE_LINE_1} />
);

storiesOf('Message', module).add('Default', () => <MessageLineStory />);
