import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherPlaceAboutComponent } from './teacher-place-about.component';

describe('TeacherPlaceAboutComponent', () => {
  let component: TeacherPlaceAboutComponent;
  let fixture: ComponentFixture<TeacherPlaceAboutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlaceAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlaceAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
