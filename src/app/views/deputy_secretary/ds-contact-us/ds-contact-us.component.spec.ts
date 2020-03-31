import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsContactUsComponent } from './ds-contact-us.component';

describe('DsContactUsComponent', () => {
  let component: DsContactUsComponent;
  let fixture: ComponentFixture<DsContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
