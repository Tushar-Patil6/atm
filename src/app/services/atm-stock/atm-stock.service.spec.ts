import { TestBed } from '@angular/core/testing';

import { AtmStockService } from './atm-stock.service';

describe('AtmStockService', () => {
  let service: AtmStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
