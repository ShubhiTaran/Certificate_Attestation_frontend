import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoPoliciesComponent } from './do-policies.component';

describe('DoPoliciesComponent', () => {
  let component: DoPoliciesComponent;
  let fixture: ComponentFixture<DoPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
