import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControlPainelComponent } from './control-painel.component';

describe('ControlPainelComponent', () => {
  let component: ControlPainelComponent;
  let fixture: ComponentFixture<ControlPainelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPainelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
