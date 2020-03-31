import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHelpCenterComponent } from './user-help-center.component';

describe('UserHelpCenterComponent', () => {
  let component: UserHelpCenterComponent;
  let fixture: ComponentFixture<UserHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
