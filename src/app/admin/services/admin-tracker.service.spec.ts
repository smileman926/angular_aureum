import { TestBed } from '@angular/core/testing';

import { AdminTrackerService } from './admin-tracker.service';

describe('AdminTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminTrackerService = TestBed.get(AdminTrackerService);
    expect(service).toBeTruthy();
  });
});
