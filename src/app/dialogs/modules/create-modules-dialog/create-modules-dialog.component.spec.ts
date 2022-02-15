import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModulesDialogComponent } from './create-modules-dialog.component';

describe('CreateModulesDialogComponent', () => {
  let component: CreateModulesDialogComponent;
  let fixture: ComponentFixture<CreateModulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModulesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
