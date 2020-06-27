import React from 'react';

import { ChatHeader } from './ChatHeader';

import { MOCK_CHAT_1, MOCK_CHAT_2 } from '../__mocks__';

import { storiesOf } from '@storybook/react';

storiesOf('ChatHeader', module).add('LongTitle', () => <ChatHeader chat={MOCK_CHAT_1} />);
storiesOf('ChatHeader', module).add('ShortTitle', () => (
  <ChatHeader chat={MOCK_CHAT_2} />
));
