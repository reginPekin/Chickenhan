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

  public async getUser(id: string): Promise<User> {
    return request({
      ctx: this.ctx,
      url: '/users',
      options: {
        method: 'GET',
        queryParams: { id },
      },
    });
  }

  public async edit(id: string, body: Partial<UserInterface>): Promise<User> {
    return request({
      ctx: this.ctx,
      url: '/users',
      options: {
        method: 'PATCH',
        queryParams: { id },
        body: body,
      },
    });
  }

  // public async addChat(id: string, chatId: string) {
  //   return request({
  //     ctx: this.ctx,
  //     url: `/users/${id}/chats`,
  //     options: { method: 'POST', body: { chatId } },
  //   });
  // }

  // public async deleteChat(id: string, chatId: string) {
  //   return request({
  //     ctx: this.ctx,
  //     url: `/users/${id}/chats/${chatId}`,
  //     options: { method: 'DELETE' },
  //   });
  // }
}
