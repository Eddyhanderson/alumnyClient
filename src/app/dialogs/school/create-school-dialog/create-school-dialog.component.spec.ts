import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolDialogComponent } from './create-school-dialog.component';

describe('CreateSchoolDialogComponent', () => {
  let component: CreateSchoolDialogComponent;
  let fixture: ComponentFixture<CreateSchoolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchoolDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
