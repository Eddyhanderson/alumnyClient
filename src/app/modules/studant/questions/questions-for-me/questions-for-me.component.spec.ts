import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsForMeComponent } from './questions-for-me.component';

describe('QuestionsForMeComponent', () => {
  let component: QuestionsForMeComponent;
  let fixture: ComponentFixture<QuestionsForMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsForMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsForMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
