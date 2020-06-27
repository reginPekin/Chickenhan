import { storiesOf } from '@storybook/react';
import React from 'react';

import { ChatLine } from './ChatLine';
import { MOCK_CHAT_1 } from '../__mocks__';

storiesOf('ChatLine', module).add('Long name', () => {
  return <ChatLine chat={MOCK_CHAT_1} />;
});
