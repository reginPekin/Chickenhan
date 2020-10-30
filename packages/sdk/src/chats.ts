import { Context, request } from './utils';

import { Chat, AddChat } from './types';

export class Chats {
  private ctx: Context;

  constructor(context: Context) {
    this.ctx = context;
  }

  public async getChatById(chatId: number): Promise<Chat> {
    return request({
      ctx: this.ctx,
      url: `/chats/${chatId}`,
      options: {
        method: 'GET',
      },
    });
  }

  public async getDialog(opponentId: number): Promise<Chat> {
    return request({
      ctx: this.ctx,
      url: `/dialogs/${opponentId}`,
      options: {
        method: 'GET',
      },
    });
  }

  public async getDiscoverChats(
    nextId?: number,
  ): Promise<{
    list: Chat[];
    nextFromId?: number | undefined;
    hasMore: boolean;
  }> {
    return request({
      ctx: this.ctx,
      url: `/discover`,
      options: {
        method: 'GET',
        queryParams: {
          nextId,
        },
      },
    });
  }

  public async createChat(chat: AddChat, opponentId?: number): Promise<Chat> {
    return request({
      ctx: this.ctx,
      url: `/chats/${opponentId || 0}`,
      options: {
        method: 'POST',
        body: chat,
      },
    });
  }

  public async editChat(
    chatId: number,
    updatePart: Partial<Chat>,
  ): Promise<Chat> {
    return request({
      ctx: this.ctx,
      url: `/chats/${chatId}`,
      options: {
        method: 'PATCH',
        body: updatePart,
      },
    });
  }
}
