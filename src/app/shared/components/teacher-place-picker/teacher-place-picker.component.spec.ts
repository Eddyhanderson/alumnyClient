import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPlacePickerComponent } from './teacher-place-picker.component';

describe('TeacherPlacePickerComponent', () => {
  let component: TeacherPlacePickerComponent;
  let fixture: ComponentFixture<TeacherPlacePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPlacePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlacePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
