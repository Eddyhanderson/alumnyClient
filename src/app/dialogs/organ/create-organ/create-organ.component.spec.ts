import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganDialogComponent } from './create-organ.component';

describe('CreateOrganComponent', () => {
  let component: CreateOrganDialogComponent;
  let fixture: ComponentFixture<CreateOrganDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrganDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
