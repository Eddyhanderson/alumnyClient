import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManamentControlPanelComponent } from './managment-control-panel.component';

describe('ManagmentCertificateListComponent', () => {
  let component: ManamentControlPanelComponent;
  let fixture: ComponentFixture<ManamentControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManamentControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManamentControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
