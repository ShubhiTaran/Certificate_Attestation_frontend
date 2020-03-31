import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFaqComponent } from './global-faq.component';

describe('GlobalFaqComponent', () => {
  let component: GlobalFaqComponent;
  let fixture: ComponentFixture<GlobalFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
