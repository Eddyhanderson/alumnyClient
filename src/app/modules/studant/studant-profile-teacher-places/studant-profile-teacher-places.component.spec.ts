import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudantProfileTeacherPlacesComponent } from './studant-profile-teacher-places.component';

describe('StudantProfileTeacherPlacesComponent', () => {
  let component: StudantProfileTeacherPlacesComponent;
  let fixture: ComponentFixture<StudantProfileTeacherPlacesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudantProfileTeacherPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudantProfileTeacherPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
