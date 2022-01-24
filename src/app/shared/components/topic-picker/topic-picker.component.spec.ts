import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPickerComponent } from './topic-picker.component';

describe('TopicPickerComponent', () => {
  let component: TopicPickerComponent;
  let fixture: ComponentFixture<TopicPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
