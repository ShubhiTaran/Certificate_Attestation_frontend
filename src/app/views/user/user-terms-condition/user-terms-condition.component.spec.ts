import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTermsConditionComponent } from './user-terms-condition.component';

describe('UserTermsConditionComponent', () => {
  let component: UserTermsConditionComponent;
  let fixture: ComponentFixture<UserTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
