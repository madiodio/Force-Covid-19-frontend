import { TestBed } from '@angular/core/testing';

import { LineAllocationService } from './line-allocation.service';

describe('LineAllocationService', () => {
  let service: LineAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
