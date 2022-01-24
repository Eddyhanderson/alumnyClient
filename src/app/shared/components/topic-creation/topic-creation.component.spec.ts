import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreationComponent } from './topic-creation.component';

describe('TopicCreationComponent', () => {
  let component: TopicCreationComponent;
  let fixture: ComponentFixture<TopicCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
