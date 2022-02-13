import { TestBed } from '@angular/core/testing';

import { SchoolIdentityService as SchoolIdentityService } from './school-identity.service';

describe('SchoolIdentityServiceService', () => {
  let service: SchoolIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
