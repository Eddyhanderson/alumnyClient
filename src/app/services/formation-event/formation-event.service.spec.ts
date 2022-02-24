import { TestBed } from '@angular/core/testing';

import { FormationEventService } from './formation-event.service';

describe('FormationEventService', () => {
  let service: FormationEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
