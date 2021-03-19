import { TestBed } from '@angular/core/testing';

import { UrlBaseService } from './url-base.service';

describe('UrlBaseService', () => {
  let service: UrlBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
