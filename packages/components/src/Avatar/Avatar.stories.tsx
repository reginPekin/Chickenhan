import React from 'react';

import { Avatar } from './Avatar';

import { storiesOf } from '@storybook/react';

const type = 'dialog';

function extractChatAvatar(): string {
  if (type === 'dialog') {
    return 'https://avatars.mds.yandex.net/get-pdb/1741659/eefce756-01d7-4a52-9889-9a8d9efb4a7a/s1200';
  }

  return 'https://i.ytimg.com/vi/fpRJNptYa_o/maxresdefault.jpg';
}

const AvatarStory: React.FC = () => (
  <Avatar
    url="https://avatars.mds.yandex.net/get-pdb/1741659/eefce756-01d7-4a52-9889-9a8d9efb4a7a/s1200"
    chatType="dialog"
  />
);

storiesOf('Avatar', module).add('Default', () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <AvatarStory />
    <Avatar chatType={type} url={extractChatAvatar()} />
  </div>
));
