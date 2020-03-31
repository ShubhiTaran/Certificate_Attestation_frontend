import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoSearchComponent } from './do-search.component';

describe('DoSearchComponent', () => {
  let component: DoSearchComponent;
  let fixture: ComponentFixture<DoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
