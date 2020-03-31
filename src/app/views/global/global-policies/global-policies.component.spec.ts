import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPoliciesComponent } from './global-policies.component';

describe('GlobalPoliciesComponent', () => {
  let component: GlobalPoliciesComponent;
  let fixture: ComponentFixture<GlobalPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
