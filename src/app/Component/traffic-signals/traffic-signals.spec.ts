import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficSignals } from './traffic-signals';

describe('TrafficSignals', () => {
  let component: TrafficSignals;
  let fixture: ComponentFixture<TrafficSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficSignals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficSignals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
