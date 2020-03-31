import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHelpCenterComponent } from './admin-help-center.component';

describe('AdminHelpCenterComponent', () => {
  let component: AdminHelpCenterComponent;
  let fixture: ComponentFixture<AdminHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
