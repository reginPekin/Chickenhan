import React from 'react';

import { ImageLoader } from './ImageLoader';

import { storiesOf } from '@storybook/react';

interface IconProps {
  width: number;
  height: number;
}

const AvatarLoaderIcon: React.FC<IconProps> = props => (
  <svg viewBox="0 0 94 94" fill="none" {...props}>
    <circle cx="47" cy="47" r="45.5" stroke="#FFC224" strokeWidth="3" />
    <circle cx="46.5" cy="43.5" r="15" stroke="#FFC224" strokeWidth="3" />
    <path
      d="M79 80.5L74.9817 71.518C72.0877 65.049 66.997 59.8134 60.6117 56.739L57 55"
      stroke="#FFC224"
      strokeWidth="3"
    />
    <path
      d="M14.5 79L17.9944 71.356C20.9061 64.9867 25.9543 59.8368 32.2642 56.7987L36 55"
      stroke="#FFC224"
      strokeWidth="3"
    />
  </svg>
);

storiesOf('ImageLoader', module).add('Simple image loader', () => (
  <section style={{ margin: '20px' }}>
    <ImageLoader>
      <AvatarLoaderIcon width={92} height={92} />
    </ImageLoader>
  </section>
));
