import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganListComponent } from './organ-list.component';

describe('OrganComponent', () => {
  let component: OrganListComponent;
  let fixture: ComponentFixture<OrganListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
