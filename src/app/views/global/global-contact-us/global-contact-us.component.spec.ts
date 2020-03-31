import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalContactUsComponent } from './global-contact-us.component';

describe('GlobalContactUsComponent', () => {
  let component: GlobalContactUsComponent;
  let fixture: ComponentFixture<GlobalContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
