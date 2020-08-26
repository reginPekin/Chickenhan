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
      url: `/chats`,
      options: {
        method: 'GET',
        queryParams: { chatId },
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

  public async editChat(id: string, updatePart: Partial<Chat>): Promise<Chat> {
    return request({
      ctx: this.ctx,
      url: `/chats`,
      options: {
        method: 'PATCH',
        body: updatePart,
        queryParams: { chat_id: id },
      },
    });
  }

  // public async editAvatar(id: string, avatar: FormData): Promise<any> {
  //   return request({
  //     ctx: this.ctx,
  //     url: `/chats/${id}/avatar`,
  //     options: {
  //       method: 'PATCH',
  //       body: avatar,
  //     },
  //   });
  // }

  // public async remove(id: string): Promise<any> {
  //   return request({
  //     ctx: this.ctx,
  //     url: `/chats/${id}`,
  //     options: {
  //       method: 'DELETE',
  //     },
  //   });
  // }
}
