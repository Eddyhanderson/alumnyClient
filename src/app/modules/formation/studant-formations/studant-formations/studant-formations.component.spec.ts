import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudantFormationsComponent } from './studant-formations.component';

describe('StudantFormationsComponent', () => {
  let component: StudantFormationsComponent;
  let fixture: ComponentFixture<StudantFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudantFormationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
