import { Context, request } from './utils';

import { Message as MessageInterface } from './types';

export class Message {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async getMessageList(
    chatId: number,
    nextId?: number,
  ): Promise<{
    list: MessageInterface[];
    nextFromId?: number | undefined;
    hasMore: boolean;
  }> {
    return request({
      ctx: this.ctx,
      url: `/messages/pagination/${chatId}`,
      options: {
        method: 'GET',
        queryParams: { nextId },
      },
    });
  }
}
