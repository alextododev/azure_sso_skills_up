import { TestBed } from '@angular/core/testing';

import { RecoService } from './reco.service';

describe('RecoService', () => {
  let service: RecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
