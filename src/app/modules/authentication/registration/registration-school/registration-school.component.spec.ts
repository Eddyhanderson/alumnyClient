import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationSchoolComponent } from './registration-school.component';

describe('RegistrationSchoolComponent', () => {
  let component: RegistrationSchoolComponent;
  let fixture: ComponentFixture<RegistrationSchoolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
