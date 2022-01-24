import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLessonViewComponent } from './article-lesson-view.component';

describe('ArticleLessonViewComponent', () => {
  let component: ArticleLessonViewComponent;
  let fixture: ComponentFixture<ArticleLessonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLessonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
