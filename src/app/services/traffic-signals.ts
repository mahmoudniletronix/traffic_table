import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

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

    // Listen for messages from the server
    this.hubConnection.on('receiveMessage', (name: string, message: string) => {
      this.messageSource.next({ name, message });
    });

    // Listen for unit actions if needed
    this.hubConnection.on('unitAction', (data: any) => {
      this.unitActionSource.next(data);
    });

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  // Send a message to the server
  sendMessage(name: string, message: string) {
    if (this.hubConnection) {
      this.hubConnection.invoke('sendMessage', name, message);
    }
  }
}
