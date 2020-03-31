import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsFaqComponent } from './ds-faq.component';

describe('DsFaqComponent', () => {
  let component: DsFaqComponent;
  let fixture: ComponentFixture<DsFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
