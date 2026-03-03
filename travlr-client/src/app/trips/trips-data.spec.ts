import { TestBed } from '@angular/core/testing';

import { TripsData } from './trips-data';

describe('TripsData', () => {
  let service: TripsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
