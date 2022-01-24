import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudantRegistrationComponent } from './studant-registration.component';

describe('StudantRegistrationComponent', () => {
  let component: StudantRegistrationComponent;
  let fixture: ComponentFixture<StudantRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudantRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
