import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherPlaceProfileComponent } from './teacher-place-profile.component';

describe('TeacherPlaceProfileComponent', () => {
  let component: TeacherPlaceProfileComponent;
  let fixture: ComponentFixture<TeacherPlaceProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlaceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlaceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
