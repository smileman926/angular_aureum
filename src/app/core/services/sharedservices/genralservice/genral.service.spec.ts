import { TestBed } from '@angular/core/testing';

import { GenralService } from './genral.service';

describe('GenralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenralService = TestBed.get(GenralService);
    expect(service).toBeTruthy();
  });
});
