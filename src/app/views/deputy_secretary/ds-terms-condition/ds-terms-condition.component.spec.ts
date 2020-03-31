import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTermsConditionComponent } from './ds-terms-condition.component';

describe('DsTermsConditionComponent', () => {
  let component: DsTermsConditionComponent;
  let fixture: ComponentFixture<DsTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
