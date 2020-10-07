import { Context, request } from './utils';
import { BackUser } from '../src/types';

export class Authorization {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async authUserByFacebook(
    facebookToken: string,
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/facebook',
      options: {
        method: 'POST',
        body: {
          facebookToken,
        },
      },
    });
  }

  public async authUserByGoogle(
    googleToken: string,
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/google',
      options: {
        method: 'POST',
        body: {
          googleToken,
        },
      },
    });
  }

  public async authUserByUsername(
    username: string,
    password: string,
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/login',
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
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/facebook',
      options: {
        method: 'POST',
        body: {
          facebookToken,
          login: username,
        },
      },
    });
  }

  public async signUpUserByGoogle(
    googleToken: string,
    username: string,
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/google',
      options: {
        method: 'POST',
        body: {
          googleToken,
          login: username,
        },
      },
    });
  }

  public async signUpUserByUsername(
    username: string,
    password: string,
  ): Promise<BackUser & { token: string }> {
    return request({
      ctx: this.ctx,
      url: '/auth/new/login',
      options: {
        method: 'POST',
        body: {
          login: username,
          password,
        },
      },
    });
  }

  public async ping(): Promise<string> {
    return request({
      ctx: this.ctx,
      url: '/ping',
      options: {
        method: 'GET',
      },
    });
  }
}
