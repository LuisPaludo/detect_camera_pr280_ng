import { TestBed } from '@angular/core/testing';

import { RoadStateService } from './road-state.service';

describe('RoadStateService', () => {
  let service: RoadStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
