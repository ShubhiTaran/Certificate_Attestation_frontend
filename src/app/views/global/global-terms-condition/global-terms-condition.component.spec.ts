import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTermsConditionComponent } from './global-terms-condition.component';

describe('GlobalTermsConditionComponent', () => {
  let component: GlobalTermsConditionComponent;
  let fixture: ComponentFixture<GlobalTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
