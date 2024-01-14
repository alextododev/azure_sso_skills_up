import { TestBed } from '@angular/core/testing';

import { RecoRefreshService } from './reco-refresh.service';

describe('RecoRefreshService', () => {
  let service: RecoRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
