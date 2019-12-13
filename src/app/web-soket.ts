import {Injectable} from '@angular/core';

@Injectable()
export class WebSocketService {

  // tslint:disable-next-line:variable-name
  private _message: string;
  // tslint:disable-next-line:variable-name
  private _webSocketContext = new WebSocket('ws://localhost:3002/');

  constructor() {
  }
  get webSocketContext(): WebSocket {
    return this._webSocketContext;
  }

  set webSocketContext(value: WebSocket) {
    this._webSocketContext = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

}
