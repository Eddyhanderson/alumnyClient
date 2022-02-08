import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganComponent } from './create-organ.component';

describe('CreateOrganComponent', () => {
  let component: CreateOrganComponent;
  let fixture: ComponentFixture<CreateOrganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
