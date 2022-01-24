import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LessonWatchComponent } from './lesson-watch.component';

describe('LessonWatchComponent', () => {
  let component: LessonWatchComponent;
  let fixture: ComponentFixture<LessonWatchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
