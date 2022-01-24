import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherPlaceStudantsComponent } from './teacher-place-studants.component';

describe('TeacherPlaceStudantsComponent', () => {
  let component: TeacherPlaceStudantsComponent;
  let fixture: ComponentFixture<TeacherPlaceStudantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlaceStudantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlaceStudantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
