import { Authorization } from './auth';
import { User } from './user';
import { Chats } from './chats';
import { Message } from './message';
import { UserChats } from './userChats';
import { EventSource } from './eventSource';

interface ChickenhanProps {
  token?: string;
  apiUrl?: string;
}

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : 'https://chickenhan.fail/api';

export class Chickenhan {
  private token: string;
  public apiUrl: string;

  public authorization: Authorization;
  public user: User;
  public chats: Chats;
  public messages: Message;
  public userChats: UserChats;
  public eventSource: EventSource;

  private ctx: {
    apiUrl: string;
    token: string;
  };

  // настройки токена и url
  constructor({ token }: ChickenhanProps) {
    this.token = token || '';
    this.apiUrl = API_URL;

    this.ctx = {
      apiUrl: this.apiUrl,
      token: this.token,
    };

    this.authorization = new Authorization(this.ctx);
    this.user = new User(this.ctx);
    this.chats = new Chats(this.ctx);
    this.messages = new Message(this.ctx);
    this.userChats = new UserChats(this.ctx);
    this.eventSource = new EventSource(this.ctx);
  }

  public setToken(token: string): void {
    this.ctx.token = token;
  }
}
