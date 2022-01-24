import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudantProfileQuestionsComponent } from './studant-profile-questions.component';

describe('StudantProfileQuestionsComponent', () => {
  let component: StudantProfileQuestionsComponent;
  let fixture: ComponentFixture<StudantProfileQuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudantProfileQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantProfileQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
