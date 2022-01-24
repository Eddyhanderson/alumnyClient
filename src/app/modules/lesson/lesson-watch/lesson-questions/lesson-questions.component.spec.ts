import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LessonWatchQuestionsComponent } from './lesson-questions.component';

describe('VideoLessonQuestionsComponent', () => {
  let component: LessonWatchQuestionsComponent;
  let fixture: ComponentFixture<LessonWatchQuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonWatchQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonWatchQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
