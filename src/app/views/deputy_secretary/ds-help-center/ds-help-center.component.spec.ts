import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsHelpCenterComponent } from './ds-help-center.component';

describe('DsHelpCenterComponent', () => {
  let component: DsHelpCenterComponent;
  let fixture: ComponentFixture<DsHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
