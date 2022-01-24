import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationStudantComponent } from './registration-studant.component';

describe('RegistrationStudantComponent', () => {
  let component: RegistrationStudantComponent;
  let fixture: ComponentFixture<RegistrationStudantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStudantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStudantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
