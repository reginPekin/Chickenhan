import { Context, request } from './utils';

import { Chat, UserChats as UserChatsInterface } from './types';

export class UserChats {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async getMyChats(): Promise<Chat[]> {
    return request({
      ctx: this.ctx,
      url: '/user-chats/full',
      options: {
        method: 'GET',
      },
    });
  }

  public async addChatToUser(chatId: number): Promise<UserChatsInterface> {
    return request({
      ctx: this.ctx,
      url: `/user-chats/add/${chatId}`,
      options: {
        method: 'PATCH',
      },
    });
  }

  public async removeChatFromUser(chatId: number): Promise<UserChatsInterface> {
    return request({
      ctx: this.ctx,
      url: `/user-chats/remove/${chatId}`,
      options: {
        method: 'PATCH',
      },
    });
  }
}
