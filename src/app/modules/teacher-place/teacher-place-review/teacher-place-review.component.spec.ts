import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPlaceReviewComponent } from './teacher-place-review.component';

describe('TeacherPlaceReviewComponent', () => {
  let component: TeacherPlaceReviewComponent;
  let fixture: ComponentFixture<TeacherPlaceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPlaceReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlaceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
