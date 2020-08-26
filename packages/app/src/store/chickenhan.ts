import { Chickenhan } from '@chickenhan/sdk/lib';

import { TOKEN_KEY } from '../consts';

const token = window.localStorage.getItem(TOKEN_KEY) || '';

export const chickenhan = new Chickenhan({ token });
