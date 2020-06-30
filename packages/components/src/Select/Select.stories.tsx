import React from 'react';

import { Select } from './Select';

import { storiesOf } from '@storybook/react';

const options_1 = [
  {
    label: 'Storybook',
    value: 'story',
    description: 'Check it in the storybook',
    selected: true,
  },
  {
    label: 'Facebook',
    value: 'facebook',
    description: 'Check it in the facebook',
  },
  {
    label: 'Twitter',
    value: 'twitter',
    description: 'Check it in the twitter',
  },
];

storiesOf('Select', module).add('Simple select', () => (
  <Select title="Chech it" options={options_1} />
));
