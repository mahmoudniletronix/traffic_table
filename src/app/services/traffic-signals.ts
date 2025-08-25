import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Traffic } from '../models/traffic-signal.model';

@Injectable({
  providedIn: 'root',
})
export class TrafficSignals {}
