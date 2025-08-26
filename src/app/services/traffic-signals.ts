import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Traffic } from '../models/traffic-signal.model';

@Injectable({
  providedIn: 'root',
})
export class TrafficSignals {
  private hubConnection!: signalR.HubConnection;

  private messageSource = new BehaviorSubject<any>(null);
  message$ = this.messageSource.asObservable();

  private unitActionSource = new BehaviorSubject<any>(null);
  unitAction$ = this.unitActionSource.asObservable();

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://197.168.209.50/TLC/signalr')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.on('receiveMessage', (user, message) => {
      this.messageSource.next({ user, message });
    });

    this.hubConnection.on('unitAction', (data) => {
      this.unitActionSource.next(data);
    });

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  sendMessage(user: string, message: string) {
    if (this.hubConnection) {
      this.hubConnection.invoke('sendMessage', user, message);
    }
  }
}
