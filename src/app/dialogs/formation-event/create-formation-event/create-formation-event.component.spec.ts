import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationEventComponent } from './create-formation-event.component';

describe('CreateFormationEventComponent', () => {
  let component: CreateFormationEventComponent;
  let fixture: ComponentFixture<CreateFormationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormationEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
