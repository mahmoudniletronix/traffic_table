import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrafficSignals {
  private connection: signalR.HubConnection;

  private messageSource = new Subject<{ user: string; message: string }>();
  private unitActionSource = new Subject<{
    roomID: string;
    actionID: string;
    operatorData: string;
  }>();

  message$ = this.messageSource.asObservable();
  unitAction$ = this.unitActionSource.asObservable();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost/TLC/messagehub')
      .build();

    this.connection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch((err) => console.error('Connection error: ', err));

    this.connection.on('ReceiveMessage', (user, msg) => {
      this.messageSource.next({ user, message: msg });
    });

    this.connection.on('ReceiveUnitAction', (roomID, actionID, operatorData) => {
      this.unitActionSource.next({ roomID, actionID, operatorData });
    });
  }

  sendMessage(user: string, message: string) {
    this.connection.invoke('SendMessage', user, message);
  }
}
