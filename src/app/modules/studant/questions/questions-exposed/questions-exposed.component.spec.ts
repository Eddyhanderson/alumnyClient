import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsExposedComponent } from './questions-exposed.component';

describe('QuestionsExposedComponent', () => {
  let component: QuestionsExposedComponent;
  let fixture: ComponentFixture<QuestionsExposedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsExposedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsExposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
