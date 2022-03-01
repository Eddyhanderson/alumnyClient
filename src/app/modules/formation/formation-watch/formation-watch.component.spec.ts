import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationWatchComponent } from './formation-watch.component';

describe('FormationWatchComponent', () => {
  let component: FormationWatchComponent;
  let fixture: ComponentFixture<FormationWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
