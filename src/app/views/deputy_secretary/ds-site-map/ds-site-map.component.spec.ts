import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSiteMapComponent } from './ds-site-map.component';

describe('DsSiteMapComponent', () => {
  let component: DsSiteMapComponent;
  let fixture: ComponentFixture<DsSiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
