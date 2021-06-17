import { TestBed } from '@angular/core/testing';

import { ClinicServiceService } from './clinic-service.service';

describe('ClinicServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicServiceService = TestBed.get(ClinicServiceService);
    expect(service).toBeTruthy();
  });
});
