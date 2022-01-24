import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudantProfileComponent } from './studant-profile.component';

describe('StudantProfileComponent', () => {
  let component: StudantProfileComponent;
  let fixture: ComponentFixture<StudantProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
