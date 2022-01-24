import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudantProfileClassematesComponent } from './studant-profile-classemates.component';

describe('StudantProfileClassematesComponent', () => {
  let component: StudantProfileClassematesComponent;
  let fixture: ComponentFixture<StudantProfileClassematesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudantProfileClassematesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantProfileClassematesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
