import { Context, request } from './utils';

import { User as UserInterface } from './types';

export class User {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async getMe(): Promise<User> {
    return request({
      ctx: this.ctx,
      url: '/users/me',
      options: {
        method: 'GET',
      },
    });
  }

  public async getUser(id: number): Promise<User> {
    return request({
      ctx: this.ctx,
      url: `/users/${id}`,
      options: {
        method: 'GET',
      },
    });
  }

  public async editMe(body: Partial<UserInterface>): Promise<User> {
    return request({
      ctx: this.ctx,
      url: '/users/me',
      options: {
        method: 'PATCH',
        body: body,
      },
    });
  }
}
