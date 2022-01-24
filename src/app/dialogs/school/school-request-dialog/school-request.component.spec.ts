import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchoolRequestComponentDialog } from './school-request.component';

describe('SchoolRequestComponent', () => {
  let component: SchoolRequestComponentDialog;
  let fixture: ComponentFixture<SchoolRequestComponentDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRequestComponentDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRequestComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
