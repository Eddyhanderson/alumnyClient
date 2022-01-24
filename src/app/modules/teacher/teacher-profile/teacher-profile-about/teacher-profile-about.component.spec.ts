import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherProfileAboutComponent } from './teacher-profile-about.component';

describe('TeacherProfileAboutComponent', () => {
  let component: TeacherProfileAboutComponent;
  let fixture: ComponentFixture<TeacherProfileAboutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProfileAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
