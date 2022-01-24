import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPlacesComponent } from './teacher-places.component';

describe('TeacherPlacesComponent', () => {
  let component: TeacherPlacesComponent;
  let fixture: ComponentFixture<TeacherPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
