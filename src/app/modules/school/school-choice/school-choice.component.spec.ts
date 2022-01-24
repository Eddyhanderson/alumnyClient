import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchoolChoiceComponent } from './school-choice.component';

describe('SchoolChoiceComponent', () => {
  let component: SchoolChoiceComponent;
  let fixture: ComponentFixture<SchoolChoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
