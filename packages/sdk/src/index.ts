import { Authorization } from './auth';
import { User } from './user';
import { Chats } from './chats';
import { Message } from './message';
import { UserChats } from './userChats';

interface ChickenhanProps {
  token?: string;
  apiUrl?: string;
}

const API_URL = 'https://chickenhan.fail/api';
// const API_URL = 'http://localhost:8080/api';

export class Chickenhan {
  private token: string;
  private apiUrl: string;

  public authorization: Authorization;
  public user: User;
  public chats: Chats;
  public messages: Message;
  public userChats: UserChats;

  // настройки токена и url
  constructor({ token, apiUrl }: ChickenhanProps) {
    this.token = token || '';
    this.apiUrl = apiUrl || API_URL;

    const ctx = {
      apiUrl: this.apiUrl,
      token: this.token,
    };

    this.authorization = new Authorization(ctx);
    this.user = new User(ctx);
    this.chats = new Chats(ctx);
    this.messages = new Message(ctx);
    this.userChats = new UserChats(ctx);
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
