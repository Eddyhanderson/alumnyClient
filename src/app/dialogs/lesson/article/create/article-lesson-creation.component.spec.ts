import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLessonCreationComponent } from './article-lesson-creation.component';

describe('ArticleLessonCreationComponent', () => {
  let component: ArticleLessonCreationComponent;
  let fixture: ComponentFixture<ArticleLessonCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLessonCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLessonCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
