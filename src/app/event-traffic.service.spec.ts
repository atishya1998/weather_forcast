import { TestBed } from '@angular/core/testing';

import { EventTrafficService } from './event-traffic.service';

describe('EventTrafficService', () => {
  let service: EventTrafficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTrafficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
