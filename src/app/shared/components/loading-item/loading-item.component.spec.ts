import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingItemComponent } from './loading-item.component';

describe('LoadingItemComponent', () => {
  let component: LoadingItemComponent;
  let fixture: ComponentFixture<LoadingItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
