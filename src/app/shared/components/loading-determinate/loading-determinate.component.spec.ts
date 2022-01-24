import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingDeterminateComponent } from './loading-determinate.component';

describe('LoadingDeterminateComponent', () => {
  let component: LoadingDeterminateComponent;
  let fixture: ComponentFixture<LoadingDeterminateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDeterminateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDeterminateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
