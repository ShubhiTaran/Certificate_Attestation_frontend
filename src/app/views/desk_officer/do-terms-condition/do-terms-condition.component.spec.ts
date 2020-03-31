import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTermsConditionComponent } from './do-terms-condition.component';

describe('DoTermsConditionComponent', () => {
  let component: DoTermsConditionComponent;
  let fixture: ComponentFixture<DoTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
