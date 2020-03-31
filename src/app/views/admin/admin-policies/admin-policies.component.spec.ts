import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoliciesComponent } from './admin-policies.component';

describe('AdminPoliciesComponent', () => {
  let component: AdminPoliciesComponent;
  let fixture: ComponentFixture<AdminPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
