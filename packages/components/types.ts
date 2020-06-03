export interface User {
  id: string;
  login: string;
  isOnline: string; // на бэкэ online
  avatar?: string;
}

export interface Chat {
  avatar: string;
  name: string;
  userCount?: number;
}
