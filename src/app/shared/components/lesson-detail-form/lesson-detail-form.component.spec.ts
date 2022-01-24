import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailFormComponent } from './lesson-detail-form.component';

describe('LessonDetailFormComponent', () => {
  let component: LessonDetailFormComponent;
  let fixture: ComponentFixture<LessonDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
