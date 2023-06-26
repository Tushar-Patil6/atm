import { TestBed } from '@angular/core/testing';

import { AtmTransactionsService } from './atm-transactions.service';

describe('AtmTransactionsService', () => {
  let service: AtmTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
