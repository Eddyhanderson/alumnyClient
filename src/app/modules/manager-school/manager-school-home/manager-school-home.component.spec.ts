import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagerSchoolHomeComponent } from './manager-school-home.component';

describe('ManagerSchoolHomeComponent', () => {
  let component: ManagerSchoolHomeComponent;
  let fixture: ComponentFixture<ManagerSchoolHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSchoolHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSchoolHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
