import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationDialogComponent } from './create-formation-dialog.component';

describe('CreateFormationDialogComponent', () => {
  let component: CreateFormationDialogComponent;
  let fixture: ComponentFixture<CreateFormationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
