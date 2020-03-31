import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHelpCenterComponent } from './global-help-center.component';

describe('GlobalHelpCenterComponent', () => {
  let component: GlobalHelpCenterComponent;
  let fixture: ComponentFixture<GlobalHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
