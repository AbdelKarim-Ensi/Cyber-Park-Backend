import { TestBed } from '@angular/core/testing';

import { Subscriber } from './subscriber';

describe('Subscriber', () => {
  let service: Subscriber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Subscriber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
