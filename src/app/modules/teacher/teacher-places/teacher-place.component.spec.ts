import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherPlacesComponent } from './teacher-place.component';

describe('TeacherPlaceComponent', () => {
  let component: TeacherPlacesComponent;
  let fixture: ComponentFixture<TeacherPlacesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
