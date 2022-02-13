import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationModulesComponent } from './formation-modules.component';

describe('FormationModulesComponent', () => {
  let component: FormationModulesComponent;
  let fixture: ComponentFixture<FormationModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
