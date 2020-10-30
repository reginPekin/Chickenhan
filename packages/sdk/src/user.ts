import { Context, request } from './utils';

import { User as UserInterface, PictureType } from './types';

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

  public async editAvatar(
    avatar: string,
  ): Promise<{ pictureId: BigInt; type: PictureType }> {
    const formDataAvatar = new FormData();
    formDataAvatar.append('picture', avatar);

    return request({
      ctx: this.ctx,
      url: '/users/avatar',
      options: {
        method: 'PATCH',
        body: formDataAvatar,
        headers: {
          enctype: 'multipart/form-data',
        },
      },
    });
  }
}
