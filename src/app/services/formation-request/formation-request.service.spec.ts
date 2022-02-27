import { TestBed } from '@angular/core/testing';

import { FormationRequestService } from './formation-request.service';

describe('FormationRequestService', () => {
  let service: FormationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
