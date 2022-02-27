import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationRequestDialogComponent } from './create-formation-request-dialog.component';

describe('CreateFormationRequestDialogComponent', () => {
  let component: CreateFormationRequestDialogComponent;
  let fixture: ComponentFixture<CreateFormationRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormationRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormationRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
