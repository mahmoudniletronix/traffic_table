import { TestBed } from '@angular/core/testing';

import { TrafficSignals } from './traffic-signals';

describe('TrafficSignals', () => {
  let service: TrafficSignals;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafficSignals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
