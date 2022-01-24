import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherPlaceLessonsComponent } from './teacher-place-lessons.component';

describe('TeacherPlaceLessonsComponent', () => {
  let component: TeacherPlaceLessonsComponent;
  let fixture: ComponentFixture<TeacherPlaceLessonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlaceLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlaceLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
