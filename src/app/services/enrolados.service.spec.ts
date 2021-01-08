import { TestBed } from '@angular/core/testing';

import { EnroladosService } from './enrolados.service';

describe('EnroladosService', () => {
  let service: EnroladosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnroladosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
