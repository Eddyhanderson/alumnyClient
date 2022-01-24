import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLessonViewComponent } from './video-lesson-view.component';

describe('VideoLessonViewComponent', () => {
  let component: VideoLessonViewComponent;
  let fixture: ComponentFixture<VideoLessonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLessonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
