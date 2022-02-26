import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPreviewComponent } from './formation-preview.component';

describe('FormationPreviewComponent', () => {
  let component: FormationPreviewComponent;
  let fixture: ComponentFixture<FormationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
