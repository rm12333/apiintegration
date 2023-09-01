import { TestBed } from '@angular/core/testing';

import { GlobalyService } from './globaly.service';

describe('GlobalyService', () => {
  let service: GlobalyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
