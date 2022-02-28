import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationRequestListComponent } from './formation-request-list.component';

describe('FormationRequestListComponent', () => {
  let component: FormationRequestListComponent;
  let fixture: ComponentFixture<FormationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
