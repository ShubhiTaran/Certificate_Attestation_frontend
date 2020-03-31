import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSearchComponent } from './ds-search.component';

describe('DsSearchComponent', () => {
  let component: DsSearchComponent;
  let fixture: ComponentFixture<DsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
