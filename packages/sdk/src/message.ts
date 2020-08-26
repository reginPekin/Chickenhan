import { Context, request } from './utils';

import { Message as MessageInterface, AddMessage } from './types';

export class Message {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async addMessage(
    message: AddMessage,
    chatId: number,
  ): Promise<MessageInterface> {
    return request({
      ctx: this.ctx,
      url: `/messages/${chatId}`,
      options: {
        method: 'POST',
        body: { message },
      },
    });
  }
}
