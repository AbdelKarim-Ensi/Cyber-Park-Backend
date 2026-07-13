import { TestBed } from '@angular/core/testing';

import { SalaryAdvance } from './salary-advance';

describe('SalaryAdvance', () => {
  let service: SalaryAdvance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryAdvance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
