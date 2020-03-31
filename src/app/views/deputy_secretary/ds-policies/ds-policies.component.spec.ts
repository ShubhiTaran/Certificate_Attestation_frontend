import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPoliciesComponent } from './ds-policies.component';

describe('DsPoliciesComponent', () => {
  let component: DsPoliciesComponent;
  let fixture: ComponentFixture<DsPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
