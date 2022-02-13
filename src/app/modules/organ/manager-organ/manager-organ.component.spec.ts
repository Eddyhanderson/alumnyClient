import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrganComponent } from './manager-organ.component';

describe('OrganComponent', () => {
  let component: ManagerOrganComponent;
  let fixture: ComponentFixture<ManagerOrganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerOrganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerOrganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
