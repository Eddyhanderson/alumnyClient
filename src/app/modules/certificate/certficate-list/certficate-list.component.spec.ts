import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertficateListComponent } from './certficate-list.component';

describe('CertficateListComponent', () => {
  let component: CertficateListComponent;
  let fixture: ComponentFixture<CertficateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertficateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertficateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
