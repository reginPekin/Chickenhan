import { Authorization } from './auth';
import { User } from './user';

interface ChickenhanProps {
  token?: string;
  apiUrl?: string;
}

const API_URL = 'http://localhost:3200/api';

export class Chickenhan {
  private token: string;
  private apiUrl: string;

  public authorization: Authorization;
  public user: User;

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
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
