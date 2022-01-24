import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonManagmentComponent } from './lesson-managment.component';

describe('LessonManagmentComponent', () => {
  let component: LessonManagmentComponent;
  let fixture: ComponentFixture<LessonManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
