import { Context, request } from './utils';
import { User } from '../src/types';

export class Authorization {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async authUserByFacebook(
    facebookToken: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/facebook',
      options: {
        method: 'POST',
        body: {
          token: facebookToken,
        },
      },
    });
  }

  public async authUserByGoogle(
    googleToken: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/google',
      options: {
        method: 'POST',
        body: {
          token: googleToken,
        },
      },
    });
  }

  public async authUserByUsername(
    username: string,
    password: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/mail',
      options: {
        method: 'POST',
        body: {
          login: username,
          password,
        },
      },
    });
  }

  public async signUpUserByFacebook(
    facebookToken: string,
    username: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/facebook',
      options: {
        method: 'POST',
        body: {
          token: facebookToken,
          login: username,
        },
      },
    });
  }

  public async signUpUserByGoogle(
    googleToken: string,
    username: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/google',
      options: {
        method: 'POST',
        body: {
          token: googleToken,
          login: username,
        },
      },
    });
  }

  public async signUpUserByUsername(
    username: string,
    password: string,
  ): Promise<User & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/mail',
      options: {
        method: 'POST',
        body: {
          login: username,
          password,
        },
      },
    });
  }
}
