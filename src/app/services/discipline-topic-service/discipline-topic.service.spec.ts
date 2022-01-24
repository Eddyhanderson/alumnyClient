import { TestBed } from '@angular/core/testing';

import { DisciplineTopicService } from './discipline-topic.service';

describe('DisciplineTopicService', () => {
  let service: DisciplineTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisciplineTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
