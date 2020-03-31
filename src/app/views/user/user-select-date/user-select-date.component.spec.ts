import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectDateComponent } from './user-select-date.component';

describe('UserSelectDateComponent', () => {
  let component: UserSelectDateComponent;
  let fixture: ComponentFixture<UserSelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
