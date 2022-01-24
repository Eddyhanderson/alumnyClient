import { TestBed } from '@angular/core/testing';

import { TeacherPlaceService } from './teacher-place.service';

describe('TeacherPlaceService', () => {
  let service: TeacherPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
