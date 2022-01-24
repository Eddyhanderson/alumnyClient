import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LessonWacthAboutComponent } from './lesson-about.component';

describe('VideoLessonAboutComponent', () => {
  let component: LessonWacthAboutComponent;
  let fixture: ComponentFixture<LessonWacthAboutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonWacthAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonWacthAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
