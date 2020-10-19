import { w3cwebsocket as websocket } from 'websocket';

import { camelToSnake, snakeToCamel } from './convert';
import { Context, isJsonString } from './utils';

type EventType = 'message' | 'error' | 'closed';

export class Socket {
  private wss: websocket;
  private timeout: number;
  private connectInterval: any;
  private isOpen: boolean;
  private wwsUrl: string;
  private ctx: Context;

  private listeners: {
    [event: string]: Array<(data: any) => void | Promise<void>>;
  };

  constructor(ctx: Context) {
    this.ctx = ctx;

    this.wwsUrl =
      process.env.NODE_ENV === 'development'
        ? `ws://localhost:8080`
        : 'wss://chickenhan.fail';
    this.timeout = 250;
    this.connectInterval = null;
    this.isOpen = false;

    this.listeners = {};

    this.wss = new websocket(this.wwsUrl);
  }

  public addEventListener<T>(
    type: EventType,
    callback: (data: T) => void | Promise<void>,
  ): () => void {
    if (!this.listeners.hasOwnProperty(type)) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
    return (): void => {
      this.listeners[type].filter(eventCallback => callback !== eventCallback);
    };
  }

  private emit(type: EventType, data: any): void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].forEach(callback => {
      callback(data);
    });
  }

  private async encode(message: Record<string, any>): Promise<void> {
    if (!this.isOpen) {
      throw Error('WS was not opened for message');
    }

    const type = message.type.replace(/([A-Z])/g, '_$1').toLowerCase();
    this.wss.send(
      JSON.stringify({
        ...camelToSnake({ ...message }),
        type,
        token: this.ctx.token,
      }),
    );
  }

  public check(): void {
    if (!this.wss || this.wss.readyState == WebSocket.CLOSED) {
      this.listenToWebsocket(); //check if websocket instance is closed, if so call `connect` function.
    }
  }

  public listenToWebsocket(): void {
    this.wss.onopen = (): void => {
      console.log('connected websocket main component');

      this.isOpen = true;

      this.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(this.connectInterval); // clear Interval on on open of websocket connection
    };

    this.wss.onclose = (event): void => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          this.timeout / 1000,
        )} second.`,
        event.reason,
      );

      this.emit('closed', null);

      this.isOpen = false;

      this.timeout = this.timeout + this.timeout; //increment retry interval
      this.connectInterval = setTimeout(
        this.check,
        Math.min(10000, this.timeout),
      ); //call check function after timeout
    };

    this.wss.onerror = (error): void => {
      console.error(
        'Socket encountered error: ',
        error.message,
        'Closing socket',
      );

      this.emit('error', error);
      this.wss.close();
    };

    this.wss.onmessage = (event): void => {
      if (!event.data) {
        return;
      }

      const stringData = event.data.toString();

      if (!isJsonString(stringData)) {
        return;
      }

      const snakeData = JSON.parse(stringData);

      if (!snakeData.type) {
        return;
      }

      const data = snakeToCamel(snakeData);
      const type = data.type.replace(/(_\w)/g, (element: string) =>
        element[1].toUpperCase(),
      );

      this.emit('message', { ...data, type });
    };
  }

  public setOnline(): void {
    if (!this.isOpen) return;

    const message = { type: 'setOnline' };
    this.encode(message);
  }

  public setOffline(): void {
    if (!this.isOpen) return;

    const message = { type: 'setOffline' };
    this.encode(message);
  }

  public addMessage(text: string, chatId: number): void {
    if (!this.isOpen) return;

    const messageData = {
      text,
      chatId,
    };

    const message = { type: 'addMessage', message: messageData };
    this.encode(message);
  }

  public addDialog(opponentId: number, dialogId: number): void {
    if (!this.isOpen) return;

    const message = {
      opponentId,
      dialogId,
      type: 'addDialog',
    };

    this.encode(message);
  }
}
