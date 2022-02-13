import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSchoolComponent } from './manager-school.component';

describe('ManagerSchoolComponent', () => {
  let component: ManagerSchoolComponent;
  let fixture: ComponentFixture<ManagerSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
