import { storiesOf } from '@storybook/react';
import React from 'react';

import { ChatLine } from './ChatLine';
import { MOCK_CHAT_1 } from '../../__mocks__';

storiesOf('Discover', module).add('discover card', () => {
  return <ChatLine chat={MOCK_CHAT_1} />;
});
