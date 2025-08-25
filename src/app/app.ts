import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficSignalsComponent } from './Component/traffic-signals/traffic-signals';

@Component({
  selector: 'app-root',
  imports: [TrafficSignalsComponent, TrafficSignalsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('traffic-signals-table');
}
